import { useEffect, useRef } from "react";
import { useDropzone } from 'react-dropzone';

export default function PlanInFiles() {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: acceptedFiles => {
          console.log(acceptedFiles);
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

    return (
        <section className="portrait:h-screen portrait:w-screen bg-white
        grid landscape:grid-rows-subgrid landscape:grid-cols-subgrid gap-4
        landscape:col-start-7 landscape:col-span-5
        landscape:row-start-1 landscape:row-span-12
        portrait:grid-cols-12 portrait:grid-rows-10" ref={containerRef}>
            <h1 className="row-span-1 col-span-5
            portrait:col-span-12 row-start-4 col-start-1 text-center">
                Awaiting Files
            </h1>
            <div className="row-start-5 row-span-3
            col-start-1 col-span-12" ref={bottomRef}>
                <div
                    {...getRootProps()}
                    className={`size-full
                        border-2 border-dashed rounded-lg text-center ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop your files here ...</p>
                    ) : (
                        <p>Drag 'n' drop your files here, or click to select files</p>
                    )}
                </div>
            </div>
            <p className="row-start-8 row-span-1 col-start-1 col-span-12
            flex flex-row place-items-center text-center">
                <span className="w-full block">
                    Everything is in order! Shall we solve it?
                </span>
            </p>
            <button className="row-start-9 row-span-1 col-start-3 col-span-1
            portrait:col-span-2 portrait:col-start-6 rounded"
            type="button">Solve</button>
        </section>
    );
}