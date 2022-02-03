import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import BasicInput from "../Forms/BasicInput";
import TextArea from "../Forms/TextArea";
// STYLES
import "./CompanyForm.css";

export default function CompanyForm(props) {
	const [formToggled, setFormToggled] = useState(false);

	return (
		<>
			<div className={`comp-form-btn uni-button`} onClick={(e) => setFormToggled(true)}>
				Create a company page
			</div>

			{formToggled ? (
				<>
					<div className={`overlay`} onClick={(e) => setFormToggled(false)}></div>
					<div className={`comp-form-wrapper shadow`}>
						<CloseButton
							borderRadius="0 10px 0 10px"
							position="absolute"
							clickEvent={(e) => setFormToggled(false)}
						/>
						<div className={`comp-form custom-scroll`}>
							<h1 className={`comp-form-title`}>Create a new company page</h1>

							<BasicInput
								name="comp-name"
								label="Company name"
								type="text"
								width="100%"
							/>

							<div className="double-input-wrap">
								<BasicInput name="comp-city" label="City" type="text" width="47%" />
								<BasicInput
									name="comp-country"
									label="Country"
									type="text"
									width="47%"
								/>
							</div>

							<TextArea
								name="comp-summary"
								label="Summary (Optional)"
								width="100%"
								required="no"
							/>

							<div className="comp-create-btn uni-button">Create</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}
