
export function BlocksToDomain() {
    return `(define (domain blocks)
(:requirements :strips :typing)
(:types block)

(:predicates
    (on ?x - block ?y - block)
    (ontable ?x - block)
    (clear ?x - block)
    (handempty)        
    (holding ?x - block)
)

(:action pickup
    :parameters (?b - block)
    :precondition (and (ontable ?b) (clear ?b) (handempty))
    :effect (and
    (not (ontable ?b))
    (not (handempty))
    (holding ?b)
    (not (clear ?b))
    )
)

(:action putdown
    :parameters (?b - block)
    :precondition (holding ?b)
    :effect (and
    (ontable ?b)
    (clear ?b)
    (handempty)
    (not (holding ?b))
    )
)

(:action stack
    :parameters (?b - block ?t - block)
    :precondition (and (holding ?b) (clear ?t))
    :effect (and
    (on ?b ?t)
    (clear ?b)
    (handempty)
    (not (holding ?b))
    (not (clear ?t))
    )
)

(:action unstack
    :parameters (?b - block ?t - block)
    :precondition (and (on ?b ?t) (clear ?b) (handempty))
    :effect (and
    (holding ?b)
    (clear ?t)
    (not (on ?b ?t))
    (not (handempty))
    )
)
)`
}

export function BlocksToProblem({ blocks }) {
    let objects = [];
    for (let i = 1; i <= blocks; i++) objects.push(`block${i}`);

    const allOnTable = Array.from({ length: blocks }, (_, i) => {
        const blocksIndex = (i % blocks) + 1;
        return `(ontable block${blocksIndex})`;
    }).join('\n    ');
    const allClear = Array.from({ length: blocks }, (_, i) => {
        const blocksIndex = (i % blocks) + 1;
        return `(clear block${blocksIndex})`;
    }).join('\n    ');

    const allGoals = Array.from({ length: blocks }, (_, i) => {
        const blocksIndex = (i % blocks) + 1;
        if (i === 0) return "";
        return `(on block${blocksIndex} block${blocksIndex - 1})`;
    }).join('\n    ');

    return `(define (problem blocks-problem)
(:domain blocks)

(:objects
    ${objects.join(" ")} - block
)

(:init
    ${allOnTable}
    ${allClear}
    (handempty)
)

(:goal (and
    ${allGoals}
))
)`;
}