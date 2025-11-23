// Update user lists in KV
// Admin endpoint to save modified user lists

export async function onRequestPost(context) {
    try {
        const { request } = context;
        const body = await request.json();
        const { admins, pacers, runners } = body;

        // Validate input
        if (!Array.isArray(admins) || !Array.isArray(pacers) || !Array.isArray(runners)) {
            return new Response(JSON.stringify({ error: 'Invalid data format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate all emails are Gmail addresses
        const allEmails = [...admins, ...pacers, ...runners];
        for (const email of allEmails) {
            if (!email.includes('@gmail.com')) {
                return new Response(JSON.stringify({ error: `Invalid email: ${email}` }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        const KV = context.env.PACELEADER_KV;

        // Check if KV is available
        if (!KV) {
            console.error('KV namespace not available');
            return new Response(JSON.stringify({
                error: 'KV storage not available. Changes saved locally but not persisted.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Update KV with new lists
        await KV.put('admins', JSON.stringify(admins));
        await KV.put('pacers', JSON.stringify(pacers));
        await KV.put('runners', JSON.stringify(runners));

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error updating lists:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
