import { useState } from "react";
import { exportToText, exportDomain } from "../utils/PresetConversors";

export default function PddlPresets({ output, setOutput, type, setType }) {
  const [preset, setPreset] = useState(type);
  const [params, setParams] = useState({
    trucks: 1,
    planes: 1,
    cities: 2,
    airports: 2,
    packages: 1,
    blocks: 3,
    switches: 2,
  });
  const presets = [
    { name: "none", key: "none" },
    { name: "Logistics", key: "logistics" },
    { name: "Blocks World", key: "blocks" },
    { name: "On/Off Switch", key: "switches" },
  ];
  const [activePreset, setActivePreset] = useState(type);

  const updateTextarea = () => {
    const text = exportToText(preset, params);
    setOutput({...output, domainText: exportDomain(preset), problemText: text});
    setType(preset);
  }

  const presetSelector = (key) => {
    if (type !== key) setOutput("");
    setPreset(key);
    setActivePreset(key);
    updateTextarea();
    const text = exportToText(key, params);
    setOutput({...output, domainText: exportDomain(key), problemText: text});
    setType(key);
  };

  return (
    <div className="flex flex-col w-full py-5">
      <header className="w-full py-2 place-items-start text-center">
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
        <article className="py-4 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Trucks | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.trucks} 
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, trucks: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Planes | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.planes} 
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, planes: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Cities | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="2" max="200" value={params.cities} 
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, cities: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Airports | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="2" max="200" value={params.airports} 
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, airports: +e.target.value}) }}/>
            </div>
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Packages | </label>
                <input className="w-16 text-center border rounded-sm border-[lightblue] mb-1" type="number" min="1" max="200" value={params.packages}
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200)  setParams({...params, packages: +e.target.value}) }}/>
            </div>
        </article>
      )}

      {preset === "blocks" && (
        <article className="py-4 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Blocks |</label>
                <input className="w-16 text-center border rounded-sm border-[lightblue]" type="number" min="2" max="200" value={params.blocks}
                onChange={e => { if(e.target.value >= 2 && e.target.value <= 200) setParams({...params, blocks: +e.target.value}) }}/>
            </div>
        </article>
      )}

      {preset === "switches" && (
        <article className="py-4 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Nr of Switches |</label>
                <input className="w-16 text-center border rounded-sm border-[lightblue]" type="number" min="2" max="200" value={params.switches}
                onChange={e => { if(e.target.value >= 2 && e.target.value <= 200) setParams({...params, switches: +e.target.value}) }}/>
            </div>
        </article>
      )}
      
      {preset !== "none" && (
      <div className="w-full flex flex-col place-items-center">
        <button type="button" className="min-w-[15%] mt-2 py-1 px-2 rounded-lg border border-[lightblue] cursor-pointer" onClick={updateTextarea}>Update</button>
      </div>
      )}
    </div>
  );
}
