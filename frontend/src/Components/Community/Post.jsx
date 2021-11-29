export default function Post(props) {
    let imageContent;
    if (props.image) {
        imageContent = <>
            <img src={props.image} alt={"image from post"}/>
        </>
    } else {
        imageContent = <></>
    }
    return(
        <>
            <div style={{padding:"3px"}}>
                <p>id for this post is {props.url}</p>
                <p>content is {props.content}</p>
                <p>owner is {props.owner.first_name} {props.owner.last_name}</p>
                {imageContent}
            </div>

            {/*<br>*/}
        </>

    );
}