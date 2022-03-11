import "./FeedbackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

export default function FeedbackButton(props) {
	return (
		<div className="fab" onClick={props.onClick}>
			Survey
		</div>
	);
}
