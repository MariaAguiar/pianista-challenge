import React, { useState } from "react";
import UIEntity from "./UIEntity";
import UITable from "../UITable";

export default function UIBuilder() {
    return (
        <div className="w-full h-full">
            <h1 className="p-1 py-6">Scenario</h1>
            <div className="flex flex-row flex-wrap">
                <UIEntity category="People" />
                <UIEntity category="Resources" />
                <UIEntity category="Locations" />
                <UIEntity category="Targets" />
                <UIEntity category="Actions" />
                <UIEntity category="Globals" />
            </div>
            <h1 className="p-1 py-4 pt-8">Actions, Goals & Constraints</h1>
            <div className="flex flex-row my-3">
                <h3 className="border-r pr-2 mr-2 min-[100px]">Actions</h3>
                <UITable rows={1} cols={5} headers={["Action", "for", "requires", "result", "properties"]} />
            </div>
            <div className="flex flex-row my-3">
                <h3 className="border-r pr-2 mr-2 min-[100px]">Goals</h3>
                <UITable rows={1} cols={2} headers={["entity", "at end"]} />
            </div>
            <div className="flex flex-row my-3">
                <h3 className="border-r pr-2 mr-2 min-[100px]">Per entity<br/>Constraints</h3>
                <UITable rows={1} cols={2} headers={["entity", "at start"]} />
            </div>
            <div className="flex flex-row my-3">
                <h3 className="border-r pr-2 mr-2 min-[100px]">Relational<br/>Constraints</h3>
                <UITable rows={1} cols={4} headers={["entity 1", "entity 2", "relationship", "continuity"]} />
            </div>
        </div>
    );
}