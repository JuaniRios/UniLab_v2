import RectangleItem from "../RectangleItem";

export default function UniItem(props) {
    return (<>
        <RectangleItem img={props.image} url={props.url} content={props.name}/>
    </>)
}
