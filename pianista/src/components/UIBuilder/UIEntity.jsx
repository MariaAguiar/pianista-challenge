
export default function UIEntity({ category = "" }) {
    return (
        <div className="p-1 w-1/2 h-1/2 rounded drop-shadow-sm">
            <div className="p-2 w-full h-full bg-white rounded">
                <h2 className="w-full">{category}</h2>
                <div className="justify-between">
                    <div className="w-full h-3/4">
                        <div className="p-2 w-full h-full">Entity</div>
                    </div>
                    <div className="w-full h-1/4 flex flex-row justify-around">
                        <input type="text" className="w-1/2 border rounded px-2 bg-white" placeholder="Name" />
                        <input type="number" className="w-1/4 border rounded px-2 bg-white" placeholder="Qnt" />
                        <button className="p-1 px-3 rounded">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}