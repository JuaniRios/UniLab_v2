import React, {useEffect, useState} from "react";
import "./ImageGallery.css"

function ImagePreview(props){
    const separator = (props.location && props.description) ? "-" : ""
    return (<>
        <div className="preview">
            <a target="_blank" href={props.image}>
                <img src={props.image} alt="" width="600" height="400"/>
            </a>
            <div className="desc">{props.location} {separator} {props.description}</div>
        </div>
    </>)
}
export default function ImageGallery(props){
    // Take images straight from API
    const [imageItems, setImageItems] = useState([])

    useEffect(()=>{
        let newImages = []
        for (const image of props.images) {
            newImages.push(<ImagePreview {...image}/>)
        }
        setImageItems(newImages)
    },[props.images])

    return (<>
        <div className="gallery">
            {imageItems || <h4 className={`normal`} style={{margin: "1rem 0"}}>You haven't added any Pictures yet...</h4>}
        </div>
    </>)
}