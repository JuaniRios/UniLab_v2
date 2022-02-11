import React from "react";


export default function DoubleInputWrap(props){
    let newChildren = [];
    for (const child of props.children) {
        newChildren.push(React.cloneElement(child, {width: "48%"}))
    }

    return (
        <div className={"double-input-wrap"}>
            {newChildren}
        </div>
    )
}