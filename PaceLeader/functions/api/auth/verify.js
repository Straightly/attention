// Role-based authorization API for PaceLeader
// Verifies Google OAuth tokens and checks user roles

// Hardcoded fallback lists (matching data/*.json files)
const DEFAULT_ADMINS = ['jianame@gmail.com'];
const DEFAULT_PACERS = ['jianame@gmail.com'];
const DEFAULT_RUNNERS = ['jianame@gmail.com'];

function normalizeList(raw, role) {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    if (typeof entry === 'string') {
      const email = entry;
      const displayName = email.split('@')[0] || email;
      const id = role + ':' + email;
      return { id, email, displayName };
    }
    const email = entry.email;
    const displayName = entry.displayName && entry.displayName.length > 0
      ? entry.displayName
      : (email && email.split('@')[0]) || email;
    const id = entry.id && entry.id.length > 0 ? entry.id : (role + ':' + email);
    return { id, email, displayName };
  });
}

// Get user lists from KV with auto-initialization and fallback
async function getUserLists(KV) {
  if (!KV) {
    console.warn('KV not available, using hardcoded defaults');
    return {
      admins: normalizeList(DEFAULT_ADMINS, 'admins'),
      pacers: normalizeList(DEFAULT_PACERS, 'pacers'),
      runners: normalizeList(DEFAULT_RUNNERS, 'runners')
    };
  }

  try {
    let admins = await KV.get('admins', 'json');

    if (!admins) {
      await KV.put('admins', JSON.stringify(DEFAULT_ADMINS));
      await KV.put('pacers', JSON.stringify(DEFAULT_PACERS));
      await KV.put('runners', JSON.stringify(DEFAULT_RUNNERS));

      return {
        admins: normalizeList(DEFAULT_ADMINS, 'admins'),
        pacers: normalizeList(DEFAULT_PACERS, 'pacers'),
        runners: normalizeList(DEFAULT_RUNNERS, 'runners')
      };
    }

    const pacers = await KV.get('pacers', 'json');
    const runners = await KV.get('runners', 'json');

    return {
      admins: normalizeList(admins, 'admins'),
      pacers: normalizeList(pacers || [], 'pacers'),
      runners: normalizeList(runners || [], 'runners')
    };
  } catch (error) {
    console.error('KV read failed, using fallback:', error);
    return {
      admins: normalizeList(DEFAULT_ADMINS, 'admins'),
      pacers: normalizeList(DEFAULT_PACERS, 'pacers'),
      runners: normalizeList(DEFAULT_RUNNERS, 'runners')
    };
  }
}

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();
    const { credential } = body;

    if (!credential) {
      return new Response(JSON.stringify({ error: 'No credential provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify token with Google
    const tokenInfoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!tokenInfoResponse.ok) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tokenInfo = await tokenInfoResponse.json();
    const email = tokenInfo.email;

    // Get user lists from KV (with auto-init and fallback)
    const { admins, pacers, runners } = await getUserLists(context.env.PACELEADER_KV);

    const roles = [];
    if (admins.some(u => u.email === email)) roles.push('admin');
    if (pacers.some(u => u.email === email)) roles.push('pacer');
    if (runners.some(u => u.email === email)) roles.push('runner');

    // UX-only role extension: admins are also pacers, pacers are also runners.
    // This does NOT modify the underlying KV lists, only what the frontend sees.
    if (roles.includes('admin') && !roles.includes('pacer')) {
      roles.push('pacer');
    }
    if (roles.includes('pacer') && !roles.includes('runner')) {
      roles.push('runner');
    }

    // Build response
    if (roles.length === 0) {
      return new Response(JSON.stringify({
        authorized: false,
        roles: [],
        message: 'To be admitted, please consult SU WeChat group to sign up.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      authorized: true,
      roles: roles,
      email: email,
      name: tokenInfo.name
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Verify error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
