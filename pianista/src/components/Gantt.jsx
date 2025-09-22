
export default function Gantt( { plan }) {


    return (
        <div>
            {plan.map((task, row) => (
            <div
              key={row}
              className={`grid items-center mb-2 grid-rows-${plan.length} grid-cols-${plan.length} gap-0`}
              style={{ gridTemplateColumns: `200px repeat(${plan.length}, 60px)` }}
            >
              <div className="pr-2">{task}</div>
              {Array.from({ length: plan.length }).map((_, col) => (
                <div key={col} className="relative h-6">
                  {col === row && (
                    <div className="absolute inset-0 bg-green-500 rounded"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
    );
}