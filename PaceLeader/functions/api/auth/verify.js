// Role-based authorization API for PaceLeader
// Verifies Google OAuth tokens and checks user roles

// Default user lists (used for auto-initialization and fallback)
const DEFAULT_ADMINS = ['zhian.job@gmail.com'];
const DEFAULT_PACERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];
const DEFAULT_RUNNERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];

// Get user lists from KV with auto-initialization and fallback
async function getUserLists(KV) {
  try {
    // Check if KV is initialized
    let admins = await KV.get('admins', 'json');

    if (!admins) {
      // Auto-initialize KV on first run
      await KV.put('admins', JSON.stringify(DEFAULT_ADMINS));
      await KV.put('pacers', JSON.stringify(DEFAULT_PACERS));
      await KV.put('runners', JSON.stringify(DEFAULT_RUNNERS));

      // Use defaults for this request
      return { admins: DEFAULT_ADMINS, pacers: DEFAULT_PACERS, runners: DEFAULT_RUNNERS };
    }

    // Read from KV
    const pacers = await KV.get('pacers', 'json');
    const runners = await KV.get('runners', 'json');

    return { admins, pacers, runners };
  } catch (error) {
    // Fallback to hardcoded lists if KV fails
    console.error('KV read failed, using fallback:', error);
    return { admins: DEFAULT_ADMINS, pacers: DEFAULT_PACERS, runners: DEFAULT_RUNNERS };
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

    // Check roles
    const roles = [];
    if (admins.includes(email)) roles.push('admin');
    if (pacers.includes(email)) roles.push('pacer');
    if (runners.includes(email)) roles.push('runner');

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
