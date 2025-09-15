import React, { useState } from "react";
import MznPreset from "./MznPreset";
import PddlPresets from "./PddlPreset";

export default function ModeBinder() {
    const [color, setColor] = useState("gray");
    const [color2, setColor2] = useState("gray");
    const [color3, setColor3] = useState("gray");

    const [activeTab, setActiveTab] = useState("pddl");

    const [pddlState, setPddlState] = useState({
        domainText: "",
        problemText: "",
        domainFileName: "",
        problemFileName: ""
    });

    const [minizincState, setMinizincState] = useState({
        content: "",
        fileName: ""
    });

    const [mznPreset, setMznPreset] = useState("none");
    const [PddlPreset, setPddlPreset] = useState("none");

    const tabs = [
        { name: "Pddl", key: "pddl" },
        { name: "Minizinc", key: "minizinc" },
    ];

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;
        const extension = file.name.split(".").pop().toLowerCase();
        if (!extension) return ;
        if (extension != "pddl" && type != "minizinc") {
            if (type === "pddlDomain")
                setColor("red");
            else
                setColor2("red");
            return ;
        }
        if (extension != "mzn" && type === "minizinc") {
            setColor3("red");
            return ;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            if (type === "pddlDomain") setPddlState({ ...pddlState, domainText: content, domainFileName: file.name });
            if (type === "pddlProblem") setPddlState({ ...pddlState, problemText: content, problemFileName: file.name });
            if (type === "minizinc") setMinizincState({ ...minizincState, content, fileName: file.name });
        };
        reader.readAsText(file);
    };

    return (
    <form onSubmit={(e) => { e.preventDefault(); alert("Coming Soon!") }} className="w-full place-items-center">
        <header className="place-items-center text-center">
            <ul className="flex flex-row">
                {tabs.map((tab) => (
                    <li
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`min-w-[100px] py-2 px-3 mx-1 rounded-t-lg border border-b-transparent border-[lightgray] cursor-pointer
                        ${activeTab === tab.key ? "bg-blue-50" : ""}`}
                    >
                    {tab.name}
                    </li>
                ))}
                </ul>
        </header>
        <main className="w-1/2 min-w-[320px] min-h-85 h-auto flex flex-row place-items-center rounded border border-[lightgray]">
            {activeTab === "pddl" && (
            <div className="w-full flex flex-col place-items-center">
                <div className="w-[95%]">
                    <PddlPresets output={pddlState} setOutput={setPddlState} type={PddlPreset} setType={setPddlPreset} />
                    <div className="w-full flex flex-row flex-wrap place-items-center justify-between">
                        <input type="file" accept=".pddl" onChange={(e) => handleFileUpload(e, "pddlDomain")} />
                        <label className={`text-[${color}]`}>.pddl</label>
                    </div>
                    <textarea required className="w-full border rounded min-h-[300px]"
                        placeholder="Goals and Contraints Info"
                        value={pddlState.domainText}
                        onChange={(e) => setPddlState({ ...pddlState, domainText: e.target.value })}
                    />

                    <div className="pt-5 w-full flex flex-row flex-wrap place-items-center justify-between">
                        <input type="file" accept=".pddl" onChange={(e) => handleFileUpload(e, "pddlProblem")} />
                        <label className={`text-[${color2}]`}>.pddl</label>
                    </div>
                    <textarea required className="w-full border rounded min-h-[300px]"
                        placeholder="Scenario Info"
                        value={pddlState.problemText}
                        onChange={(e) => setPddlState({ ...pddlState, problemText: e.target.value })}
                    />
                </div>
            </div>
            )}

            {activeTab === "minizinc" && (
            <div className="w-full flex flex-col place-items-center">
                <div className="w-[95%]">
                    <MznPreset output={minizincState} setOutput={setMinizincState} type={mznPreset} setType={setMznPreset} />
                    <div className="w-full flex flex-row flex-wrap place-items-center justify-between">
                        <input type="file" accept=".mzn" onChange={(e) => handleFileUpload(e, "minizinc")} />
                        <label className={`text-[${color3}]`}>.mzn</label>
                    </div>
                    <textarea required className="w-full border rounded min-h-[300px]"
                        placeholder="Scenario, Goals and Constraints Info"
                        value={minizincState.content}
                        onChange={(e) => setMinizincState({ ...minizincState, content: e.target.value })}
                    />
                </div>
            </div> 
            )}
        </main>
        <div>
            <button className="mb-10" type="submit">Launch</button>
        </div>
    </form>
    );
}
