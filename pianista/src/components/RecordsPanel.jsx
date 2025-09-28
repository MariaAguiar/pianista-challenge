
import { useRef, useEffect } from "react";
import useLocalStorage from "../hooks/LocalStorage";
import { getPddl, getMzn, solvePddl, solveMzn } from "../utils/apiCalls";

export default function RecordsPanel({ tab, setTab, newRec, toSolve, setToSolve, setContent, setResult }) {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);
	const [records, setRecords] = useLocalStorage("records", []);

    const addRecord = (newRec) => {
        const input = newRec.type === "pddl" ? [newRec.domainText, newRec.problemText] : [newRec.mznContent];
        for (const rec of records) {
            if (JSON.stringify(rec.inputs) === JSON.stringify(input) &&
                JSON.stringify(rec.params) === JSON.stringify(newRec.params)) {
                return [[{id: rec.id}], false];
            }
        }

        const newRecord = {
        id: records.length + 1,
        type: newRec.type,
        inputs: input,
        params: newRec.params,
        status: "received",
        output: ""
        };
        setRecords([...records, newRecord]);
        return [newRecord, true];
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "resolved":
                return <span className="inline-block mx-2 bg-green-500 w-4 h-4 rounded-full"></span>;
            case "error":
                return <span className="inline-block mx-2 bg-red-500 w-4 h-4 rounded-full"></span>;
            default:
                return <span className="inline-block mx-2 bg-gray-400 w-4 h-4 rounded-full"></span>;
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (!(toSolve && newRec)) return;
        const [newRecord, formed] = addRecord(newRec);
        if (!formed) {
            alert("Attempted record is aduplicate of record " + newRecord[0].id + ". Not adding");
            setToSolve(false);
            return ;
        }
        async function runSolve() {
            setRecords(prevRecords =>
                prevRecords.map(rec => {
                if (rec.status !== "resolved" && rec.status !== "solving" && rec.status !== "error") {
                    return { ...rec, status: "solving" };
                }
                return rec;
                })
            );
            for (const rec of [records, newRecord]) {
                try {
                    let output = "";
                    if (rec.type === "pddl") {
                        const content = { domain: rec.inputs[0], problem: rec.inputs[1], params: rec.params };
                        output = await solve("pddl", content);
                    } else if (rec.type === "minizinc") {
                        const content = {
                        model_str: JSON.stringify(rec.inputs[0]),
                        model_params: {solvers_name: rec.params}
                        };
                        output = await solve("minizinc", content);
                    }
            
                    setRecords(prevRecords =>
                        prevRecords.map(r =>
                        r.id === rec.id ? { ...r, status: "resolved", output } : r
                        )
                    );
                } catch (err) {
                    setRecords(prevRecords =>
                        prevRecords.map(r =>
                        r.id === rec.id ? { ...r, status: "error", output: err.message } : r
                        )
                    );
                }
            }
            setToSolve(false);
        }
        runSolve();
    }, [toSolve, newRec]);

    async function solve(type, content) {
        if (type === "pddl") {
            const resp = await solvePddl(content);
            const res = await getPddl(resp);
            return res;
        }
        else if (type === "minizinc") {
            const resp = await solveMzn(content);
            const res = await getMzn(resp);
            return res;
        }
    }

    return (
        <>
        {tab === "Records" && (<article  className="bg-white dark:bg-[#242424] grid gap-4 overflow-auto
        portrait:h-screen portrait:w-screen
        grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-7 landscape:col-span-5
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-10" ref={containerRef}>
            <h1 className="row-span-1 col-span-5
            portrait:col-span-12 row-start-4 col-start-1 text-center">
                Records
            </h1>
            <div className="row-start-5 row-span-3
            col-start-1 col-span-12" ref={bottomRef}>
                <ul className="p-2 pt-0">
                    {records.map((rec) => (
                    <li key={rec.id} className="p-2 my-1 border border-[lightgray] rounded">
                        <div className="flex flex-row place-items-center justify-between">
                            <div>id | {rec.id}</div>
                            <div className="flex flex-row flex-wrap place-items-center min-w-[160px]">status | {rec.status} {getStatusIcon(rec.status)}</div>
                            <button className="p-1 px-2 portrait:px-1 rounded"
                            onClick={() => { setTab("Plan Text");
                                setContent(rec.type === "pddl"? {type: "pddl", domainText: rec.inputs[0], problemText: rec.inputs[1]}
                                : {type: "minizinc", mznContent: rec.inputs[0], params: rec.params.length > 0 ? rec.params[0] : ""}
                                ); }}>
                                View Input
                            </button>
                            {rec.status === "resolved" && (
                                <button className="p-1 px-2 rounded"
                                onClick={() => { setTab("Results"); setResult(rec.output); }}>
                                    View Result
                                </button>
                            )}
                            {rec.status !== "resolved" && (
                                <button className="p-1 px-2 rounded" disabled>
                                    View Result
                                </button>
                            )}
                            <button className="p-1 px-2 text-[red] rounded"
                            onClick={() => setRecords(prev => prev.filter(r => r.id !== rec.id))}>
                                X
                            </button>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </article>
        )}
        </>
    );
}

