import {CSSTransition} from "react-transition-group";
import GeneralForm from "../Forms/GeneralForm";
import DoubleInputWrap from "../Forms/DoubleInputWrap";
import BasicInput from "../Forms/BasicInput";
import {useState} from "react";
import SelectorInput from "../Forms/SelectorInput";
import CategoryWrap from "../Forms/CategoryWrap";
import TextArea from "../Forms/TextArea";

export default function FeedbackForm(props) {
    const [institution, setInstitution] = useState("")
    const [country, setCountry] = useState("")
    const [looks, setLooks] = useState("")
    const [accessibility, setAccessibility] = useState("")
    const [usability, setUsability] = useState("")

    return (<>
        <GeneralForm formToggle={[props.display, props.setDisplay]} title="Submit your Feedback" submitText="Submit">
            <DoubleInputWrap>
                <BasicInput label={"Institution"} required={true} value={institution} setter={setInstitution}/>
                <BasicInput label={"Country"} required={true} value={country} setter={setCountry}/>
            </DoubleInputWrap>

            <CategoryWrap label={"How do you rate the platform in regards to:"}>
                <DoubleInputWrap>
                    <SelectorInput label={"Layout and Looks"} required={true} value={looks} setter={setLooks}
                        choices={{"Very Bad": 1, "Bad": 2, "Could be better": 3, "Alright": 4, "Good": 5,
                            "Very good": 6, "Incredible": 7}}/>
                    <SelectorInput label={"Accessibility"} required={true} value={accessibility} setter={setAccessibility}
                            choices={{"Very Bad": 1, "Bad": 2, "Could be better": 3, "Alright": 4, "Good": 5,
                                "Very good": 6, "Incredible": 7}}/>
                </DoubleInputWrap>

                <SelectorInput label={"Usability"} required={true} value={usability} setter={setUsability}
                    choices={{"Very Bad": 1, "Bad": 2, "Could be better": 3, "Alright": 4, "Good": 5,
                        "Very good": 6, "Incredible": 7}}/>
            </CategoryWrap>

            <DoubleInputWrap>
                <SelectorInput label={"Do you feel you will be using this platform in the future?"} required={true} value={using} setter={setUsing}
                    choices={{"Yes": 1, "No": 2}}/>
                <SelectorInput label={"Will you recommend your colleagues to register?"} required={true} value={recommend} setter={setRecommend}
                    choices={{"Yes": 1, "No": 2}}/>
            </DoubleInputWrap>

            <TextArea label={"Comments to improve the platform?"} required={false} value={improve} setter={setImprove}/>


        </GeneralForm>

    </>)
}