import React, { useState, useEffect, useRef } from "react";
import { getPddl, getMzn, solvePddl, solveMzn } from "../utils/resultsViewer";

export default function PlanInText({ tab, contents= "", result }) {
    const [activeTab, setActiveTab] = useState(contents.type? contents.type : "pddl");

    const tabs = [
        { name: "Pddl", key: "pddl" },
        { name: "Minizinc", key: "minizinc" },
        { name: "English", key: "natural" },
    ];

    const [pddlState, setPddlState] = useState({
        domain: contents.domainText,
        problem: contents.problemText,
    });

    const [minizincState, setMinizincState] = useState({
        model_str: contents.mznContent,
        model_params: {}
    });

    const [naturalState, setNaturalState] = useState({
        content: "",
        fileName: ""
    });

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    async function solve(type) {
        try {
            if (type === "pddl") {
                const resp = await solvePddl(pddlState);
                const res = await getPddl(resp);
                result(res);
            }
            else if (type === "minizinc") {
                const resp = await solveMzn(minizincState);
                const res = await getMzn(resp);
                result(res);
            }
            tab("Results");
        }
        catch (error) {
            console.error("Error during solving process:", error);
        }
    }

    return (
        <section className="portrait:h-screen portrait:w-screen bg-white
         grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-6 landscape:col-span-7
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-12" ref={containerRef}>
            <header className="row-span-1 col-span-7 flex flex-col place-items-center
                col-start-1 portrait:col-span-12 row-start-4 text-center">
                <ul className="flex flex-row">
                    {tabs.map((tab) => (
                        <li
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`min-w-[100px] py-2 px-3 mx-1 rounded-lg border border-[lightgray] cursor-pointer
                            ${activeTab === tab.key ? "dark:bg-teal-700 bg-blue-50" : ""}`}
                        >
                        {tab.name}
                        </li>
                    ))}
                </ul>
            </header>
            <div className="row-start-5 row-span-3 col-start-1 col-span-12
            landscape:col-start-2 landscape:col-span-5" ref={bottomRef}>
            {activeTab === "pddl" && (
            <div className="w-full flex flex-col place-items-center">
                <div className="w-[95%] max-h-[320px] overflow-y-auto">
                    <textarea required className="w-full border rounded min-h-[150px]"
                        placeholder="Goals and Contraints Info"
                        value={pddlState.domain}
                        onChange={(e) => setPddlState({ ...pddlState, domain: e.target.value })}
                    />
                    <textarea required className="w-full border rounded min-h-[150px]"
                        placeholder="Scenario Info"
                        value={pddlState.problem}
                        onChange={(e) => setPddlState({ ...pddlState, problem: e.target.value })}
                    />
                </div>
            </div>
            )}

            {activeTab === "minizinc" && (
            <div className="w-full flex flex-col place-items-center">
                <div className="w-[95%] max-h-[320px] overflow-y-auto">
                    <textarea required className="w-full border rounded min-h-[300px]"
                        placeholder="Scenario, Goals and Constraints Info"
                        value={minizincState.model_str}
                        onChange={(e) => setMinizincState({ ...minizincState, model_str: e.target.value })}
                    />
                </div>
            </div> 
            )}

            {activeTab === "natural" && (
            <div className="w-full flex flex-col place-items-center">
                <div className="w-[95%] max-h-[320px] overflow-y-auto">
                    <textarea required className="w-full border rounded min-h-[300px]"
                        placeholder="Under development - use with caution!
Please describe your plan's main scenario, goals and constraints"
                        value={naturalState.content}
                        onChange={(e) => setNaturalState({ ...naturalState, content: e.target.value })}
                    />
                </div>
            </div> 
            )}
            </div>
            <button className="row-start-11 row-span-1 col-start-4 col-span-1
            portrait:col-span-2 portrait:col-start-6 rounded"
            onClick={() => { if (activeTab === "pddl" || activeTab === "minizinc") solve(activeTab); }}
            type="button">Solve</button>
        </section>
    );
}