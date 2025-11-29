// Get user lists from KV
// Admin endpoint to fetch current user lists

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

export async function onRequestPost(context) {
    try {
        const KV = context.env.PACELEADER_KV;

        // Read lists from KV with fallback to defaults
        let admins, pacers, runners;

        try {
            const rawAdmins = await KV.get('admins', 'json');
            const rawPacers = await KV.get('pacers', 'json');
            const rawRunners = await KV.get('runners', 'json');

            const baseAdmins = (!rawAdmins || rawAdmins.length === 0) ? DEFAULT_ADMINS : rawAdmins;
            const basePacers = (!rawPacers || rawPacers.length === 0) ? DEFAULT_PACERS : rawPacers;
            const baseRunners = (!rawRunners || rawRunners.length === 0) ? DEFAULT_RUNNERS : rawRunners;

            admins = normalizeList(baseAdmins, 'admins');
            pacers = normalizeList(basePacers, 'pacers');
            runners = normalizeList(baseRunners, 'runners');
        } catch (kvError) {
            // Fallback to defaults if KV fails
            console.error('KV read failed, using fallback:', kvError);
            admins = normalizeList(DEFAULT_ADMINS, 'admins');
            pacers = normalizeList(DEFAULT_PACERS, 'pacers');
            runners = normalizeList(DEFAULT_RUNNERS, 'runners');
        }

        return new Response(JSON.stringify({
            admins,
            pacers,
            runners
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Ultimate fallback - return defaults even on error
        return new Response(JSON.stringify({
            admins: DEFAULT_ADMINS,
            pacers: DEFAULT_PACERS,
            runners: DEFAULT_RUNNERS
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
