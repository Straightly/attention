// Get user lists from KV
// Admin endpoint to fetch current user lists

// Hardcoded fallback lists (matching data/*.json files)
const DEFAULT_ADMINS = ['zhian.job@gmail.com'];
const DEFAULT_PACERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];
const DEFAULT_RUNNERS = ['zhian.job@gmail.com', 'jianame@gmail.com'];

export async function onRequestPost(context) {
    try {
        const KV = context.env.PACELEADER_KV;

        // Read lists from KV with fallback to defaults
        let admins, pacers, runners;

        try {
            admins = await KV.get('admins', 'json');
            pacers = await KV.get('pacers', 'json');
            runners = await KV.get('runners', 'json');

            // Use defaults if KV returns null/empty
            if (!admins || admins.length === 0) admins = DEFAULT_ADMINS;
            if (!pacers || pacers.length === 0) pacers = DEFAULT_PACERS;
            if (!runners || runners.length === 0) runners = DEFAULT_RUNNERS;
        } catch (kvError) {
            // Fallback to defaults if KV fails
            console.error('KV read failed, using fallback:', kvError);
            admins = DEFAULT_ADMINS;
            pacers = DEFAULT_PACERS;
            runners = DEFAULT_RUNNERS;
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
