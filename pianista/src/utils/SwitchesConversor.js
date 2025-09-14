
export function SwitchesToDomain() {
    return `(define (domain simple_switch)
(:requirements :strips :typing)
(:types switch)
(:predicates (off ?s - switch)
    (on ?s - switch))
(:action switchon
    :parameters (?s - switch)
    :precondition (and (off ?s))
    :effect (and  (not (off ?s))
    (on ?s)))
(:action switchoff
    :parameters (?s - switch)
    :precondition (and (on ?s))
    :effect (and (not (on ?s)) (off ?s))))`
}

export function SwitchesToProblem({ switches }) {
    let objects = [];
    for (let i = 1; i <= switches; i++) objects.push(`switch${i}`);

    const allOff = Array.from({ length: switches }, (_, i) => {
        const switchIndex = (i % switches) + 1;
        return `(off switch${switchIndex})`;
    }).join('\n    ');

    const allOn = Array.from({ length: switches }, (_, i) => {
        const switchIndex = (i % switches) + 1;
        return `(on switch${switchIndex})`;
    }).join('\n    ');

    return `(define (problem switch-problem)
(:domain simple_switch)

(:objects
    ${objects.join(" ")} - switch
)

(:init
    ${allOff}
)

(:goal (and
    ${allOn}
))
)`;
}