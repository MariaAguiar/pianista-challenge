import React, { useRef, useEffect } from 'react';
import Gantt from './Gantt';

export default function PlanResults( { result }) {

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const parsePlan = (plan) => {
        return plan.split("\n")
        .map((l) => l.trim())
        .filter((l, i) => i > 0 && l);
    }

    return (
        <section className="portrait:h-screen portrait:w-screen bg-white overflow-auto
        grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-7 landscape:col-span-5
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-10" ref={containerRef}>
            <h1 className="row-span-1 col-span-5
            portrait:col-span-12 row-start-4 col-start-1 text-center">
                Results
            </h1>
            <div className="row-start-5 row-span-3
            col-start-1 col-span-12" ref={bottomRef}>
                {result.detail && 
                    <p>{result.detail}</p>
                }
                {result.plan && (
                    <Gantt plan={parsePlan(result.plan)} />
                )}
            </div>
        </section>
    );
}