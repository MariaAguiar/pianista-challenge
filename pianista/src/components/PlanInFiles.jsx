import { useState, useEffect, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import Parameters from "./Parameters";
import { validatePddl } from "../utils/apiCalls";

export default function PlanInFiles( { tab, setContent, toSolve,
    setToSolve, params, setParams, pddlOptions, mznOptions } ) {
    const [activeTab, setActiveTab] = useState("pddl");
    const [convert, setConvert] = useState(false);
    const [files, setFiles] = useState([]);

    const tabs = [
        { name: "Pddl", key: "pddl" },
        { name: "Minizinc", key: "minizinc" },
        { name: "English", key: "natural" },
    ];

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: acceptedFiles => {
          for (const file of acceptedFiles) {
            const reader = new FileReader();
            reader.onload = () => {
              const fileAsBinaryString = reader.result;
              if (!files.find(f => f.name === file.name))
                  setFiles(prevFiles => [...prevFiles, {name: file.name, content: fileAsBinaryString}] );
            };
            reader.onabort = () => alert('file reading was aborted');
            reader.onerror = () => alert('file reading has failed');
            reader.readAsBinaryString(file);
          }
        },
    });

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const setTab = (tabName) => {
        tab(tabName);
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    async function fillContent(input, origin) {
        if (activeTab === "pddl") {
            setConvert(true);
            let domain, problem;
            if (await validatePddl({"pddl": input[0].content})) {
                domain = input[0].content;
                problem = input[1].content;
            }
            else if (await validatePddl({"pddl": input[1].content})) {
                domain = input[1].content;
                problem = input[0].content;
            }
            setContent({
                type: "pddl",
                domainText: domain,
                problemText: problem,
                mznContent: "",
                params,
            });
        }
        else if (activeTab === "minizinc") {
            setContent({
                type: "minizinc",
                domainText: "",
                problemText: "",
                mznContent: input[0].content,
                params,
            });
        }
        else {
            setContent({
                type: "natural",
                domainText: "",
                problemText: "",
                mznContent: input[0].content,
                params,
            });
        }
        if (origin === "solve") setToSolve(true);
        else setTab("Plan Text");
        setConvert(false);
    }

    return (
        <section className="portrait:h-screen portrait:w-screen bg-white dark:bg-[#242424]
        grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-7 landscape:col-span-5
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-10" ref={containerRef}>
            <h1 className="row-span-1 col-span-5
            portrait:col-span-12 row-start-4 col-start-1 text-center">
                Awaiting Files
            </h1>
            <div className="row-span-1 col-span-7 flex flex-col place-items-center
                col-start-1 portrait:col-span-12 row-start-5 text-center">
                <ul className="flex flex-row">
                    {tabs.map((tab) => (
                        <li
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`min-w-[100px] py-2 px-3 mx-1 rounded-lg border border-[lightgray] cursor-pointer
                            ${activeTab === tab.key ? "dark:bg-teal-800 bg-blue-50" : ""}`}
                        >
                        {tab.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="row-start-6 row-span-1
            col-start-1 col-span-12">
                {activeTab === "pddl" && (<Parameters params={params} setParams={setParams} options={pddlOptions} />)}
                {activeTab === "minizinc" && (<Parameters params={params} setParams={setParams} options={mznOptions} />)}
            </div>
            <div className="row-start-7 row-span-3
            col-start-1 col-span-12" ref={bottomRef}>
                <ul className="m-2 p-1 px-2 rounded max-h-[100px] overflow-y-auto">
                    {files.map((file, idx) => (
                        <li className="m-1 p-1 border border-[lightgray] rounded flex flex-row place-items-center justify-between" key={idx}>
                            <span className="ml-1">{file.name} </span>
                            <button
                                onClick={() =>
                                    setFiles(prevFiles =>
                                        prevFiles.filter((f, i) => f.name !== file.name && i !== idx)
                                    )
                                }
                                className="px-2 rounded cursor-pointer">
                                X
                            </button>
                        </li>
                    ))}
                </ul>
                {files.length === 0 ? (
                <div 
                    {...getRootProps()}
                    className={`h-[50%] my-2 mx-4 border-2 border-dashed rounded-lg text-center ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop your files here ...</p>
                    ) : (
                        <p>Drag 'n' drop your files here or click to select files</p>
                    )}
                </div>
                ) : (
                <div 
                    {...getRootProps()}
                    className={`border-2 my-2 mx-4 border-dashed rounded-lg text-center ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop your files here ...</p>
                    ) : (
                        <p>Drag 'n' drop your files here or click to select files</p>
                    )}
                </div>
                )}
            </div>
            {((files.length === 2 && activeTab === "pddl") ||
            (files.length === 1 && activeTab !== "pddl")) ? (
            <div className="
            row-start-10 row-span-1 col-start-3 col-span-1
            portrait:col-span-2 portrait:col-start-6
            flex flex-row place-items-center justify-center">
                {convert ? (
                <button className="p-2 mx-1 rounded"
                type="button" disabled>
                    Twick
                </button>
                ): (
                <button className="p-2 mx-1 rounded"
                type="button" onClick={() => fillContent(files, "twick")}>
                    Twick
                </button>
                )}
                {(!toSolve && !convert) && (
                <button className="p-2 mx-1 rounded" type="button"
                onClick={() => fillContent(files, "solve")}>
                    Solve
                </button>
                )}
                {(!toSolve && convert) && (
                <button type="button" className="p-2 mx-1 rounded" disabled>
                        Solve
                </button>
                )}
                {(toSolve && !convert) && (
                <button type="button" className="p-2 mx-1 rounded" disabled>
                        Solving...
                </button>
                )}
            </div>
            ) :
            files.length > 0 ? (
                <p className="row-start-10 row-span-1 col-start-1 col-span-12
                flex flex-row place-items-center text-center">
                    <span className="w-full block">
                        Incorrect number of files for the selected format
                    </span>
                </p>
            ): null}
        </section>
    );
}