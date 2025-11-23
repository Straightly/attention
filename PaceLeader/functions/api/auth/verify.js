// Role-based authorization API for PaceLeader
// Verifies Google OAuth tokens and checks user roles

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

    // Define user lists
    const ADMINS = ['zhian.job@gmail.com'];
    const PACERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];
    const RUNNERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];

    // Check roles
    const roles = [];
    if (ADMINS.includes(email)) roles.push('admin');
    if (PACERS.includes(email)) roles.push('pacer');
    if (RUNNERS.includes(email)) roles.push('runner');

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
