export default async function validatePddl(req: any, res: any) {
    try {
        const { type } = req.query;
        const apiUrl = `https://planner-apim.azure-api.net/validate/pddl?pddl_type=${encodeURIComponent(type)}`;
        const postPlan = await fetch(apiUrl, {
            headers: { 'Ocp-Apim-Subscription-Key': `${process.env.PIANISTA_API_KEY}`,
            "Content-Type": "application/json" },
            method: req.method,
            body: JSON.stringify(req.body),
        });
        const data = await postPlan.json();
        console.log(data);
        res.status(postPlan.status).json(data);
    } catch (err: any) {
        res.status(err.status || 500).json({ error: err.message });
    }
  }