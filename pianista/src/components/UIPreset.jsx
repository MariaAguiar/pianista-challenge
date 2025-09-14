import { useState } from "react";
import { exportToText } from "../utils/PresetConversors";

export default function UIPresets({ output, setOutput, type, setType }) {
  const [preset, setPreset] = useState(type.preset);
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
  const presets = [
    { name: "Logistics", key: "logistics" },
    { name: "Blocks World", key: "blocks" },
    { name: "On/Off Switch", key: "switches" },
    { name: "N-Queens", key: "nqueens" },
  ];
  const [activePreset, setActivePreset] = useState(type.preset);

  const presetSelector = (key) => {
    if (type.preset !== key) setOutput("");
    setPreset(key);
    setActivePreset(key);
  };

  const handleExport = () => {
    const text = exportToText(preset, params);
    setOutput(text);
    setType(prev => ({
      ...prev,
      type: preset === "nqueens" ? "minizinc" : "pddl",
      preset: preset
    }));
  };

  return (
    <div className="flex flex-col w-full py-5">
      <header className="w-full place-items-start text-center">
        <h2 className="text-lg my-2">Choose Preset</h2>
        <ul className="flex flex-row flex-wrap">
        {presets.map((preset) => (
          <li
            key={preset.key}
            onClick={() => presetSelector(preset.key)}
            className={`min-w-25 py-2 px-3 mx-1 rounded-lg border cursor-pointer border-[lightblue]
              ${activePreset === preset.key ? "bg-blue-50" : ""}`}
          >
            {preset.name}
          </li>
        ))}
        </ul>
      </header>

      {preset === "logistics" && (
        <article className="p-4 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Trucks | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.trucks} 
                onChange={e => { if(e.target.value <= 200) setParams({...params, trucks: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Planes | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.planes} 
                onChange={e => { if(e.target.value <= 200) setParams({...params, planes: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Cities | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="2" max="200" value={params.cities} 
                onChange={e => { if(e.target.value <= 200) setParams({...params, cities: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Airports | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="2" max="200" value={params.airports} 
                onChange={e => { if(e.target.value <= 200) setParams({...params, airports: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Packages | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.packages}
                onChange={e => { if(e.target.value <= 200)  setParams({...params, packages: +e.target.value}) }}/>
            </div>
        </article>
      )}

      {preset === "blocks" && (
        <article className="m-8 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Blocks |</label>
                <input className="min-w-[40px] text-center border rounded-sm border-[lightblue]" type="number" min="3" max="200" value={params.blocks}
                onChange={e => { if(e.target.value <= 200) setParams({...params, blocks: +e.target.value}) }}/>
            </div>
        </article>
      )}

      {preset === "switches" && (
        <article className="m-8 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Switches |</label>
                <input className="w-10 text-center border rounded-sm border-[lightblue]" type="number" min="2" max="200" value={params.switches}
                onChange={e => { if(e.target.value <= 200) setParams({...params, switches: +e.target.value}) }}/>
            </div>
        </article>
      )}

      {preset === "nqueens" && (
        <article className="m-[40px] flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Board Size |</label>
                <input className="w-10 text-center border rounded-sm border-[lightblue]" type="number" min="1" max="200" value={params.boardSize}
                onChange={e => { if(e.target.value <= 200) setParams({...params, boardSize: +e.target.value}) }}/>
            </div>
        </article>
      )}
      
      {preset !== "" && (
      <div className="w-full flex flex-col place-items-center">
        <button type="button" className="min-w-[15%] mt-2 py-2 px-3 rounded-lg border border-[lightblue] cursor-pointer" onClick={handleExport}>Get Result</button>
        <textarea className="my-2 rounded border border-[lightgray] h-[500px] w-[90%]" value={output} onChange={ (e) => setOutput(e.target.value) } />
      </div>
      )}
    </div>
  );
}
