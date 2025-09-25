import { React, useState } from "react";

import Landing from "./components/Landing";
import Breadcrumbs from "./components/Breadcrumbs";
import RecordsPanel from "./components/RecordsPanel";
import Branding from "./components/Branding";

import ModeBinder from "./components/legacy/ModeBinder";
import PlanInFiles from './components/PlanInFiles';
import PlanInText from './components/PlanInText';
import PlanInPreset from './components/PlanInPreset';
import PlanResults from './components/PlanResults';

export default function App() {
	const [activeTab, setActiveTab] = useState("landing");
	const [contentState, setContentState] = useState({
        type: "",
        domainText: "",
        problemText: "",
		mznContent: ""
    });
	const [resultPlan, setResultPlan] = useState("");

	return (
		<div className="w-screen h-screen grid grid-cols-12 gap-4
		 grid-rows-12 portrait:grid-rows-14
		">
			<div className="col-start-1 col-span-5 row-start-1 row-span-12
			portrait:col-start-1 portrait:col-span-12 portrait:row-start-1 portrait:row-span-8
			portrait:bg-linear-to-b portrait:border-b portrait:border-b-3
			landscape:border-r landscape:border-r-3
			bg-linear-to-r from-white to-[#F6F6F5] dark:from-[#242424] dark:to-[#333333]">
			</div>
			<Breadcrumbs name={activeTab} tab={setActiveTab} />
			<RecordsPanel />
			<Branding />
			<Landing tab={setActiveTab} />
			{activeTab === "Plan Files" && (
				<PlanInFiles />
			)}
			{activeTab === "Plan Text" && (
				<PlanInText tab={setActiveTab} contents={contentState} result={setResultPlan} />
			)}
			{activeTab === "Presets" && (
				<PlanInPreset tab={setActiveTab} contents={contentState} setContent={setContentState} />
			)}
			{activeTab === "Results" && (
				<PlanResults result={resultPlan} />
			)}
		</div>
	);
}

