import RectangleItem from "../RectangleItem";

export default function SearchResult(props) {
    return (<>
        <div className={"w100"}>
            <RectangleItem
                img={props.image}
                content={props.name}
                btn={[]}
                url={props.url}
            />
            {/*<img src={props.image ?? ""}/>*/}
            {/*<h4>{props.name}</h4>*/}
        </div>
    </>)
}