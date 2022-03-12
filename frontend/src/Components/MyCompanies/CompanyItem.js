import RectangleItem from "../RectangleItem";

export default function CompanyItem(props) {
    return (<>
        <RectangleItem img={props.image} url={props.url} content={props.name}/>
    </>)
}
