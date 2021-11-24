export default function Post(props) {
    return(
        <>
        <h5>id for this post is {props.url}</h5>
        <h5>content is {props.content}</h5>
        <h5>owner is {props.owner.first_name} {props.owner.last_name}</h5>
        </>

    );
}