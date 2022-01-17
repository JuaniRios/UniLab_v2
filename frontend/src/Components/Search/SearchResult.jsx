export default function SearchResult(props) {
    return (<>
        <div>
            <img src={props.image ?? ""}/>
            <h4>{props.name}</h4>
        </div>
    </>)
}