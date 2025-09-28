import { React, useState, useEffect } from "react";

import Landing from "./components/Landing";
import Breadcrumbs from "./components/Breadcrumbs";
import RecordsToggler from "./components/RecordsToggler";
import Branding from "./components/Branding";

import PlanInFiles from './components/PlanInFiles';
import PlanInText from './components/PlanInText';
import PlanInPreset from './components/PlanInPreset';
import PlanResults from './components/PlanResults';
import RecordsPanel from "./components/RecordsPanel";

import { getPddlParams, getMznParams } from "./utils/apiCalls";

export default function App() {
	const [activeTab, setActiveTab] = useState("landing");
    const [toSolve, setToSolve] = useState(false);
	const [resultPlan, setResult] = useState(null);
	const [params, setParams] = useState("requesting");
	const [pddlOptions, setPddlOptions] = useState([]);
	const [mznOptions, setMznOptions] = useState([]);
	const [latestContent, setLatestContent] = useState({
        type: "",
        domainText: "",
        problemText: "",
		mznContent: "",
		params: ""
    });

    const onPopState = (event) => {
        if (event.state?.activeTab)
			setActiveTab(event.state.activeTab);
    };

	async function fetchOptions(type) {
		try {
			let resp;
			if (type === "pddl") {
				resp = await getPddlParams();
				setPddlOptions(resp);
			}
			else if (type === "minizinc") {
				resp = await getMznParams();
				setMznOptions(resp);
			}
		} catch (err) {
			console.error("Failed to fetch parameters:", err);
		}
	}
	
	useEffect(() => {
		window.addEventListener("popstate", onPopState);
		window.history.replaceState({ activeTab }, "");
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	useEffect(() => {
		const lastState = window.history.state?.activeTab;
  		if (lastState !== activeTab) window.history.pushState({ activeTab: activeTab }, "", "");
		if (pddlOptions.length === 0 && params === "requesting") {
			fetchOptions("pddl");
		}
		if (mznOptions.length === 0 && params === "requesting") {
			fetchOptions("minizinc");
			setParams("");
		}
	}, [activeTab]);

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
			<Branding />
			<Landing tab={setActiveTab} />
			{activeTab === "Plan Files" && (
				<PlanInFiles tab={setActiveTab} setContent={setLatestContent}
				toSolve={toSolve} setToSolve={setToSolve}
				params={params} setParams={setParams}
				pddlOptions={pddlOptions} mznOptions={mznOptions} />
			)}
			{activeTab === "Plan Text" && (
				<PlanInText toSolve={toSolve} setToSolve={setToSolve}
				contents={latestContent} setContent={setLatestContent}
				params={params} setParams={setParams}
				pddlOptions={pddlOptions} mznOptions={mznOptions} />
			)}
			{activeTab === "Presets" && (
				<PlanInPreset tab={setActiveTab}
				contents={latestContent} setContent={setLatestContent}
				toSolve={toSolve} setToSolve={setToSolve}
				param={params} setParam={setParams}
				pddlOptions={pddlOptions} mznOptions={mznOptions} />
			)}
			<RecordsPanel tab={activeTab} setTab={setActiveTab} newRec={latestContent}
				toSolve={toSolve} setToSolve={setToSolve}
				setContent={setLatestContent} setResult={setResult} />
			{activeTab === "Results" && (
				<PlanResults result={resultPlan} />
			)}
			<Breadcrumbs name={activeTab} tab={setActiveTab}/>
			<RecordsToggler tab={setActiveTab} toSolve={toSolve} />
		</div>
	);
}

