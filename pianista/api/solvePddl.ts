
export default async function solvePddl(req: any, res: any) {
  try {
    const apiUrl = "https://planner-apim.azure-api.net/solve/pddl";
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
