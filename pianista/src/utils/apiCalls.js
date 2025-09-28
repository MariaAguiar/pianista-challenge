
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

export async function getPddlParams() {
    const getPlanners = await fetch(`/api/planners`);
    const plannersData = await getPlanners.json();
    return plannersData;
}

export async function validatePddl(inputData) {
    try {
        const domain = await fetch(`/api/validatePddl?type=${encodeURIComponent("domain")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
        });
        const data = await domain.json();
        if (data.result === "success") return true;
        return false;
  
    } catch (error) {
        console.error("Error during PDDL validation:", error);
    }
}

export async function solveMzn(inputData) {
    const res = await fetch("/api/solveMzn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputData),
    });

    const data = await res.json();
    return data.id;
}

export async function getMzn(data) {
    const getPlan = await fetch(`/api/getMzn?id=${encodeURIComponent(data)}`);
    const planData = await getPlan.json();
    console.log(planData);
    return planData;
}

export async function getMznParams() {
    const getSolvers = await fetch(`/api/solvers`);
    const solversData = await getSolvers.json();
    return solversData;
}