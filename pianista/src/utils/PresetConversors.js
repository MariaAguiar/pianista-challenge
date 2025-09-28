import { LogisticsToProblem, LogisticsToDomain  } from "./LogisticsConversor.js";
import { BlocksToProblem, BlocksToDomain  } from "./BlocksConversor.js";
import { SwitchesToProblem, SwitchesToDomain  } from "./SwitchesConversor.js";

export function exportToText(preset, params) {
    switch (preset) {
        case "logistics":
        return LogisticsToProblem(params);
        case "blocks":
        return BlocksToProblem(params);
        case "switches":
        return SwitchesToProblem(params);
        case "scheduling":
        return Scheduling(params);
        default:
        return "";
    }
}

export function exportDomain(preset) {
    switch (preset) {
        case "logistics":
        return LogisticsToDomain();
        case "blocks":
        return BlocksToDomain();
        case "switches":
        return SwitchesToDomain();
        case "scheduling":
        return ;
        default:
        return "";
    }
}

export function Scheduling({ tasks, slots }) {
    return `int: n_tasks = ${tasks};
int: n_slots = ${slots};
array[1..n_tasks] of int: durations = [2, 1, 3];
array[1..n_tasks] of var 1..n_slots: start_times;

include "alldifferent.mzn";

constraint
  alldifferent([start_times[i] + j | i in 1..n_tasks, j in 0..durations[i]-1]);

var 1..n_slots: makespan = max([start_times[i] + durations[i] - 1 | i in 1..n_tasks]);

solve minimize makespan;
`
}
  