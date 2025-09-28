
export default function Parameters({ params, setParams, options }) {
  
  return (
    <div className="p-1 flex-row place-items-center flex-wrap">
      <ul className="flex flex-row place-items-center flex-wrap">
        {options.length > 0 && options.map((opt) => (
            <li
            key={opt.id}
            onClick={() => {if (params !== opt.id) setParams(opt.name) }}
            className={`px-2 mx-1 rounded-lg border border-[lightgray] cursor-pointer
                ${params === opt.id ? "dark:bg-teal-800 bg-blue-50" : ""}`}
            >
            {opt.name}
            </li>
        ))}
        {options.length === 0 && (
          <li>Loading Options...</li>
        )}
      </ul>
    </div>
  );
}
