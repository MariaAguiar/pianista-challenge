
export default function Landing({ tab }) {
    const setTab = (tabName) => {
        tab(tabName);
    }

    return (
        <>
			<p className="flex place-items-center portrait:text-center
            col-span-5 col-start-7 row-span-1 row-start-6
            portrait:col-span-8 portrait:col-start-3
            portrait:sm:col-span-6 portrait:sm:col-start-4
            portrait:row-span-1 portrait:row-start-10">
                <span className='w-full block'>How would you like to start?</span>
            </p>
			<nav className="grid landscape:grid-cols-3 gap-4
            col-span-5 col-start-7 row-span-1 row-start-7
            portrait:grid-cols-subgrid
            portrait:col-span-6 portrait:col-start-4
            portrait:row-span-3 portrait:row-start-11">
				<button type="button" className="col-span-1 col-start-1
                portrait:col-span-6 portrait:col-start-1 rounded"
                onClick={() => setTab("Plan Files")} >Upload my files</button>
				<button type="button" className="col-span-1 col-start-2
                portrait:col-span-6 portrait:col-start-1 rounded"
                onClick={() => setTab("Plan Text")} >Write my plan</button>
				<button type="button" className="col-span-1 col-start-3
                portrait:col-span-6 portrait:col-start-1 rounded"
                onClick={() => setTab("Presets")} >Try a preset</button>
			</nav>
        </>
    );
}