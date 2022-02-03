import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
// STYLES
import "./UniversityForm.css";

export default function UniversityForm(props) {
	const [formToggled, setFormToggled] = useState(false);

	return (
		<>
			<div className={`uni-form-btn uni-button`} onClick={(e) => setFormToggled(true)}>
				Create a university page
			</div>
			{formToggled ? (
				<>
					<div className={`overlay`} onClick={(e) => setFormToggled(false)}></div>
					<div className={`uni-form-wrapper shadow`}>
						<CloseButton
							borderRadius="0 10px 0 10px"
							position="absolute"
							clickEvent={(e) => setFormToggled(false)}
						/>

						<div className={`uni-form custom-scroll`}>
							<h1 className={`uni-form-title`}>Create a new university page</h1>

							<BasicInput
								name="uni-name"
								label="University name"
								type="text"
								width="100%"
							/>

							<div className="double-input-wrap">
								<BasicInput name="uni-city" label="City" type="text" width="47%" />
								<BasicInput
									name="uni-country"
									label="Country"
									type="text"
									width="47%"
								/>
							</div>

							<TextArea
								name="uni-summary"
								label="Summary (Optional)"
								width="100%"
								required="no"
							/>

							<TextArea
								name="uni-summary"
								label="Summary (Optional)"
								width="100%"
								required="no"
							/>

							<div className="uni-create-btn uni-button">Create</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}
