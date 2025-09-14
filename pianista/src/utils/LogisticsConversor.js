
export function LogisticsToDomain() {
    return `(define (domain logistics)
(:requirements :strips :typing)
(:types
    city
    airport
    truck
    airplane
    package
)

(:predicates
    (at-truck ?t - truck ?loc - (either city airport))
    (at-plane ?pl - airplane ?a - airport)
    (at-package ?p - package ?loc - (either city airport))
    (in-truck ?p - package ?t - truck)
    (in-plane ?p - package ?pl - airplane)
    (airport-in-city ?a - airport ?c - city)
)

(:action drive-truck-city-to-airport
    :parameters (?t - truck ?c - city ?a - airport)
    :precondition (and
    (at-truck ?t ?c)
    (airport-in-city ?a ?c))
    :effect (and
    (not (at-truck ?t ?c))
    (at-truck ?t ?a))
)

(:action drive-truck-airport-to-city
    :parameters (?t - truck ?c - city ?a - airport)
    :precondition (and
    (at-truck ?t ?a)
    (airport-in-city ?a ?c))
    :effect (and
    (not (at-truck ?t ?a))
    (at-truck ?t ?c))
)

(:action fly-plane
    :parameters (?pl - airplane ?from - airport ?to - airport)
    :precondition (at-plane ?pl ?from)
    :effect (and
    (not (at-plane ?pl ?from))
    (at-plane ?pl ?to))
)

(:action load-truck
    :parameters (?p - package ?t - truck ?loc - (either city airport))
    :precondition (and
    (at-package ?p ?loc)
    (at-truck ?t ?loc))
    :effect (and
    (not (at-package ?p ?loc))
    (in-truck ?p ?t))
)

(:action unload-truck
    :parameters (?p - package ?t - truck ?loc - (either city airport))
    :precondition (and
    (in-truck ?p ?t)
    (at-truck ?t ?loc))
    :effect (and
    (not (in-truck ?p ?t))
    (at-package ?p ?loc))
)

(:action load-plane
    :parameters (?p - package ?pl - airplane ?a - airport)
    :precondition (and
    (at-package ?p ?a)
    (at-plane ?pl ?a))
    :effect (and
    (not (at-package ?p ?a))
    (in-plane ?p ?pl))
)

(:action unload-plane
    :parameters (?p - package ?pl - airplane ?a - airport)
    :precondition (and
    (in-plane ?p ?pl)
    (at-plane ?pl ?a))
    :effect (and
    (not (in-plane ?p ?pl))
    (at-package ?p ?a))
)
)`;
}

export function LogisticsToProblem({ trucks, planes, cities, airports, packages }) {
    let objects = [];
    for (let i = 1; i <= trucks; i++) objects.push(`truck${i} - truck`);
    for (let i = 1; i <= planes; i++) objects.push(`plane${i} - airplane`);
    for (let i = 1; i <= cities; i++) objects.push(`city${i} - city`);
    for (let i = 1; i <= airports; i++) objects.push(`airport${i} - airport`);
    for (let i = 1; i <= packages; i++) objects.push(`package${i} - package`);

    const allCityAirports = Array.from({ length: cities }, (_, i) => {
        const cityIndex = (i % cities) + 1;
        return `(airport-in-city airport${i + 1} city${cityIndex})`;
    }).join('\n    ');
    
    const allPackages = Array.from({ length: packages }, (_, i) => {
        const cityIndex = (i % cities) + 1;
        return `(at-package package${i + 1} city${cityIndex})`;
    }).join('\n    ');

    const allTrucks = Array.from({ length: trucks }, (_, i) => {
        const cityIndex = (i % cities) + 1;
        return `(at-truck truck${i + 1} city${cityIndex})`;
    }).join('\n    ');

    const allPlanes = Array.from({ length: planes }, (_, i) => {
        const airportIndex = (i % airports) + 1;
        return `(at-plane plane${i + 1} airport${airportIndex})`;
    }).join('\n    ');

    const goals = Array.from({ length: packages }, (_, i) => {
        const airportIndex = (i % airports) + 1;
        return `(at-package package${i + 1} airport${airportIndex})`;
    }).join('\n    ');
    

    return `(define (problem logistics-problem) (:domain logistics)

(:objects
    ${objects.join("\n    ")}
)

(:init
    ${allCityAirports}
    ${allPackages}
    ${allTrucks}
    ${allPlanes}
)

(:goal (and
    ${goals}
))
)`;
}
