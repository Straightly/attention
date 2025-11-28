// Pacer runs API
// Stores all runs in a single KV key "runs" as a JSON array.
// Each run has: date, pacer, startTime, pace, startPlace, signedUpRunners[]

export async function onRequestPost(context) {
    const KV = context.env.PACELEADER_KV;

    if (!KV) {
        return new Response(JSON.stringify({ error: 'KV storage not available' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { request } = context;
        const body = await request.json();
        const { mode, pacer, date, startTime, pace, startPlace, removed } = body || {};

        // Load existing runs (or empty array)
        let runs = [];
        try {
            const stored = await KV.get('runs', 'json');
            if (Array.isArray(stored)) {
                runs = stored;
            }
        } catch (e) {
            // Ignore and start with empty runs
            runs = [];
        }

        if (mode === 'getByPacer') {
            if (!pacer) {
                return new Response(JSON.stringify({ error: 'Missing pacer' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const pacerRuns = runs.filter(r => r.pacer === pacer);
            return new Response(JSON.stringify({ runs: pacerRuns }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (mode === 'upsert') {
            if (!pacer || !date) {
                return new Response(JSON.stringify({ error: 'Missing pacer or date' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const defaults = {
                startTime: '8:00am',
                pace: '10:00/ml',
                startPlace: 'WF'
            };

            // Find existing run for this pacer + date
            let run = runs.find(r => r.pacer === pacer && r.date === date);
            if (!run) {
                run = {
                    date,
                    pacer,
                    startTime: startTime || defaults.startTime,
                    pace: pace || defaults.pace,
                    startPlace: startPlace || defaults.startPlace,
                    signedUpRunners: [pacer],
                    removed: typeof removed === 'boolean' ? removed : false
                };
                runs.push(run);
            } else {
                // Update fields if provided
                if (typeof startTime === 'string') run.startTime = startTime;
                if (typeof pace === 'string') run.pace = pace;
                if (typeof startPlace === 'string') run.startPlace = startPlace;
                if (typeof removed === 'boolean') run.removed = removed;
                if (!Array.isArray(run.signedUpRunners)) {
                    run.signedUpRunners = [pacer];
                } else if (!run.signedUpRunners.includes(pacer)) {
                    run.signedUpRunners.push(pacer);
                }
            }

            await KV.put('runs', JSON.stringify(runs));

            return new Response(JSON.stringify({ run }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ error: 'Unknown mode' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Pacer runs API error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
