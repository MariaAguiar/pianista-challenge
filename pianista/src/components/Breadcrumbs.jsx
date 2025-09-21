
export default function Breadcrumbs({ name, tab }) {
    const setTab = (tabName) => {
        name = tabName;
        tab(tabName);
    }
    return (
        <nav className="py-1 my-[2.5vh] px-[5%] landscape:text-right sticky top-[2.5vh]
        col-span-3 col-start-2 portrait:col-span-7 portrait:col-start-1
        row-span-1 row-start-1 portrait:row-span-1 portrait:row-start-1 ">
            <span className="underline cursor-pointer" onClick={() => setTab("landing")}>Pianista</span>
            {name === "landing" && (
                <span> &gt; Home</span>
            )}
            {name !== "landing" && (
                <span onClick={() => setTab(name)}> &gt; {name}</span>
            )}
            {/* <span> &gt; Blocks World</span> */}
        </nav>
    );
}