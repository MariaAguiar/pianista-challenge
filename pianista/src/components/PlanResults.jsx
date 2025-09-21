
export default function PlanResults( { result }) {
    return (
        <div>
            <p>{result.plan ? result.plan : result.detail}</p>
        </div>
    );
}