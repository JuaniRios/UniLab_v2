import React from "react";
import "./CategoryWrap.css"

export default function CategoryWrap(props){

    return (
        <div className={"category-wrap"} style={{width:"100%"}}>
            <h3 className={`category-label`}>{props.label}</h3>
            {props.children}
        </div>
    )
}