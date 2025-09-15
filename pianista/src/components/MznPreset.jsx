import { useState } from "react";
import { exportToText } from "../utils/PresetConversors";

export default function MznPresets({ output, setOutput, type, setType }) {
  const [preset, setPreset] = useState(type);
  const [params, setParams] = useState({
    boardSize: 8,
  });
  const presets = [
    { name: "none", key: "none" },
    { name: "N-Queens", key: "nqueens" },
  ];
  const [activePreset, setActivePreset] = useState(type);

  const updateTextarea = () => {
    const text = exportToText(preset, params);
    setOutput({...output, content: text});
    setType(preset);
  }

  const presetSelector = (key) => {
    if (type !== key) setOutput("");
    setPreset(key);
    setActivePreset(key);
    updateTextarea();
    const text = exportToText(key, params);
    setOutput({...output, content: text});
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

      {preset === "nqueens" && (
        <article className="py-4 flex flex-col text-right">
            <div className="w-full flex flex-row">
                <label className="block w-1/2">Board Size |</label>
                <input className="w-16 text-center border rounded-sm border-[lightblue]" type="number" min="1" max="200" value={params.boardSize}
                onChange={e => { if(e.target.value >= 1 && e.target.value <= 200) setParams({...params, boardSize: +e.target.value}) }}/>
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
