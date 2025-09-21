import React, { useState, useEffect, useRef } from "react";
import { exportToText, exportDomain } from "../utils/PresetConversors";

export default function PlanInPreset({ tab, contents, setContent }) {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const setTab = (tabName) => {
        tab(tabName);
    }

    const [params, setParams] = useState({
        trucks: 1,
        planes: 1,
        cities: 2,
        airports: 2,
        packages: 1,
        blocks: 3,
        switches: 2,
        boardSize: 8,
      });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const presetSelector = (type, key) => {
        const text = exportToText(key, params);
        if (type === "pddl")
            setContent({...contents, type: type, domainText: exportDomain(key), problemText: text});
        else if (type === "minizinc")
            setContent({...contents, type: type, mznContent: text});
        setTab("Plan Text");
    };

    return (
        <section className="portrait:h-screen portrait:w-screen bg-white overflow-y-clip
        grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-7 landscape:col-span-5
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-10" ref={containerRef}>
            <h1 className="row-span-1 col-span-5
            portrait:col-span-12 portrait:col-start-1 portrait:row-start-4
            row-start-4 col-start-1 text-center">Presets</h1>
            <div className="row-start-5 row-span-12 col-start-1 col-span-12
            flex flex-col place-items-center">
                <div tabIndex="0" className="block w-full p-2 my-1 group border border-[lightgray] text-center cursor-pointer">
                    <span>Logistics</span>
                    <span className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus-within:max-h-[50px]"><br/>
                        [description]
                    </span>
                    <article className="max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus-within:max-h-[250px] group-focus-within:py-4 flex flex-col text-right">
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Trucks | </label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue] mb-1" type="number" min="1" max="200" value={params.trucks} 
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, trucks: +e.target.value}) }}/>
                        </div>
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Planes | </label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue] mb-1" type="number" min="1" max="200" value={params.planes} 
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, planes: +e.target.value}) }}/>
                        </div>
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Cities | </label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue] mb-1" type="number" min="2" max="200" value={params.cities} 
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, cities: +e.target.value}) }}/>
                        </div>
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Airports | </label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue] mb-1" type="number" min="2" max="200" value={params.airports} 
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, airports: +e.target.value}) }}/>
                        </div>
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Packages | </label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue] mb-1" type="number" min="1" max="200" value={params.packages}
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200)  setParams({...params, packages: +e.target.value}) }}/>
                        </div>
                    </article>
                    <button type="button" className="hidden max-h-0 rounded overflow-hidden
                    transition-[max-height] duration-300 group-focus-within:max-h-[50px]
                    group-focus-within:p-2 group-focus-within:my-1 group-focus-within:inline-block"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => presetSelector("pddl", "logistics")}>
                        Launch
                    </button>
                </div>
                <div tabIndex="0" className="block w-full p-2 my-1 group border border-[lightgray] text-center cursor-pointer">
                    <span>Blocks World</span>
                    <span className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus:max-h-[50px]"><br/>
                        [description]
                    </span>
                    <article className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus-within:max-h-[70px] group-focus-within:py-4 flex flex-col text-right">
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Blocks |</label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue]" type="number" min="2" max="200" value={params.blocks}
                            onChange={e => { if(e.target.value >= 2 && e.target.value <= 200) setParams({...params, blocks: +e.target.value}) }}/>
                        </div>
                    </article>
                    <button type="button" className="hidden max-h-0 rounded overflow-hidden
                    transition-[max-height] duration-300 group-focus-within:max-h-[50px]
                    group-focus-within:p-2 group-focus-within:my-1 group-focus-within:inline-block"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => presetSelector("pddl", "blocks")}>
                        Launch
                    </button>
                </div>
                <div tabIndex="0" className="block w-full p-2 my-1 group border border-[lightgray] text-center cursor-pointer">
                    <span>NQueens</span>
                    <span className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus:max-h-[50px]"><br/>
                        [description]
                    </span>
                    <article className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus-within:max-h-[70px] group-focus-within:py-4 flex flex-col text-right">
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Board Size |</label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue]" type="number" min="1" max="200" value={params.boardSize}
                            onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, boardSize: +e.target.value}) }}/>
                        </div>
                    </article>
                    <button type="button" className="hidden max-h-0 rounded overflow-hidden
                    transition-[max-height] duration-300 group-focus-within:max-h-[50px]
                    group-focus-within:p-2 group-focus-within:my-1 group-focus-within:inline-block"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => presetSelector("minizinc", "nqueens")}>
                        Launch
                    </button>
                </div>
                <div tabIndex="0" className="block w-full p-2 my-1 group border border-[lightgray] text-center cursor-pointer">
                    <span>On/Off Switch</span>
                    <span className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus:max-h-[50px]"><br/>
                        [description]
                    </span>
                    <article className="block max-h-0 overflow-hidden transition-[max-height]
                    duration-300 group-focus-within:max-h-[70px] group-focus-within:py-4 flex flex-col text-right">
                        <div className="w-full flex flex-row overflow-hidden">
                            <label className="block w-1/2">Nr of Switches |</label>
                            <input className="w-16 text-center border rounded-sm dark:border-[darkcyan] border-[lightblue]" type="number" min="2" max="200" value={params.switches}
                            onChange={e => { if(e.target.value >= 2 && e.target.value <= 200) setParams({...params, switches: +e.target.value}) }}/>
                        </div>
                    </article>
                    <button type="button" className="hidden max-h-0 rounded overflow-hidden
                    transition-[max-height] duration-300 group-focus-within:max-h-[50px]
                    group-focus-within:p-2 group-focus-within:my-1 group-focus-within:inline-block"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => presetSelector("pddl", "switches")}>
                        Launch
                    </button>
                </div>
                <button className="w-[40px] p-2 my-1 rounded mx-6" type="button"
                onClick={() => setTab("landing")} ref={bottomRef}>X</button>
            </div>
        </section>
    );
}