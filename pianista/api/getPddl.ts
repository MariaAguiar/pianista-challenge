
async function pollPlan(id: string): Promise<any> {
    const planUrl = `https://planner-apim.azure-api.net/solve/pddl?id=${encodeURIComponent(id)}`;
  
    while (true) {
      const res = await fetch(planUrl, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.PIANISTA_API_KEY!,
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 202) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
  
      return await res.json();
    }
  }
  

export default async function getPddl(req: any, res: any) {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Missing id" });
    
        const planUrl = `https://planner-apim.azure-api.net/solve/pddl?id=${encodeURIComponent(id)}`;
        console.log(planUrl);    
  
        const getPlan = await fetch(planUrl, {
            headers: { 'Ocp-Apim-Subscription-Key': `${process.env.PIANISTA_API_KEY}`,
            "Content-Type": "application/json" },
            method: "GET",
        });
        if (getPlan.status === 202) {
            const planData = await pollPlan(id);
            return res.status(200).json(planData);
        }
        const planData = await getPlan.json();
        res.status(getPlan.status).json(planData);
    } catch (err: any) {
        res.status(err.status || 500).json({ error: err.message });
    }
  }