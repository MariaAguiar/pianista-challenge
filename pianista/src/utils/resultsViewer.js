
export async function solvePddl(inputData) {
    try {
        const res = await fetch("/api/solvePddl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
        });
  
        const data = await res.json();
        return data.id;
    } catch (error) {
        console.error("Error during PDDL solving:", error);
    }
}

export async function getPddl(data) {
    try {
        const getPlan = await fetch(`/api/getPddl?id=${encodeURIComponent(data)}`);
        const planData = await getPlan.json();
        console.log(planData);
        return planData;
    } catch (error) {
        console.error("Error fetching PDDL plan:", error);
    }
}



export async function solveMzn(inputData) {
    try {
        const res = await fetch("/api/solveMzn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
        });
  
        const data = await res.json();
        return data.id;
    } catch (error) {
        console.error("Error during Mzn solving:", error);
    }
}

export async function getMzn(data) {
    try {
        const getPlan = await fetch(`/api/getMzn?id=${encodeURIComponent(data)}`);
        const planData = await getPlan.json();
        console.log(planData);
        return planData;
    } catch (error) {
        console.error("Error fetching Mzn plan:", error);
    }
}