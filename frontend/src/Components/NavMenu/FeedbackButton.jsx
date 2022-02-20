import "./FeedbackButton.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-solid-svg-icons";

export default function FeedbackButton (props) {

    return (<>
        <FontAwesomeIcon className="fab" icon={faSmile} onClick={props.onClick}/>
    </>)
}