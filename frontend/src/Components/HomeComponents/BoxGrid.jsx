import React, { useEffect, useState } from "react";
import fetchContent from "../HelperFunctions/fetchContent";
import { useAuthState } from "../../Context";

function Box(props) {
    if (props.contentType === "companies") {
        if (props.content.name.length > 20) {
            props.content.name = props.content.name.slice(0, 20) + "...";
        }
        return (
            <>
                <a className={`employer-item shadow`} style={{ backgroundImage: `url(${props.content.image})` }}>
                    <div className={`employer-name noselect`}>
                        <div className={`w90`}>{props.content.name}</div>
                        <div className={`employer-stars`}>{`rating: ${props.content.rating}`}</div>
                    </div>
                    <div className={`employer-overlay`} />
                </a>
            </>

        )
    }

}
export default function BoxGrid(props) {
    const authState = useAuthState()
    const [boxes, setBoxes] = useState([])

    useEffect(() => {
        fetchContent(props.contentType, 1).then(data => {
            const items = data.results
            const newBoxes = []
            for (let i = 0; i < items.length; i++) {
                let ibox = <Box key={i} contentType={props.contentType} content={items[i]} />
                newBoxes.push(ibox)
            }
            setBoxes(oldBoxes => oldBoxes.concat(newBoxes))
        })
    }, [])

    return (
        <>
            <div className={`employer-box`}>
                {boxes}
            </div>
        </>
    )

}