
export default async function planners(req: any, res: any) {
    try {    
        const paramsUrl = `https://planner-apim.azure-api.net/planners`;
  
        const getParams = await fetch(paramsUrl, {
            headers: { 'Ocp-Apim-Subscription-Key': `${process.env.PIANISTA_API_KEY}`,
            "Content-Type": "application/json" },
            method: "GET",
        });
        const paramData = await getParams.json();
        res.status(getParams.status).json(paramData);
    } catch (err: any) {
        res.status(err.status || 500).json({ error: err.message });
    }
}