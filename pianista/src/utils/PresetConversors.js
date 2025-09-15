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
        case "nqueens":
        return NQueensToMzn(params);
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
        case "nqueens":
        return ;
        default:
        return "";
    }
}

export function NQueensToMzn({ boardSize }) {
    return `int: N = ${boardSize};
array[1..N] of var 1..N: q;

constraint all_different(q);

constraint forall(i, j in 1..N where i < j) (
abs(q[i] - q[j]) != j - i
);

solve satisfy;`;
}
  