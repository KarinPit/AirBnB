import { useFormikContext } from "formik";
import React from "react";

export default function SummaryStep8() {
  const { values, setFieldValue, errors, touched, setFieldTouched } =
    useFormikContext();

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setFieldValue("summary", value);
    setFieldTouched("summary", true, false);
  };
  {
    console.log(errors);
  }

  // Validate the title length
  const isTitleTooLong = values.summary && values.summary.length > 500;

  return (
    <div className="summary-step-8">
      <div>
        <div className="summary-step-8-head">
          <h1>Create your description</h1>
          <span>Share what makes your place special.</span>
        </div>
        <div className="summary-step-8-textarea">
          <textarea
            name="summary"
            value={values.summary}
            onChange={handleTitleChange}
            rows={5}
            autoComplete="off"
            className={isTitleTooLong ? "error-border" : ""}
          />
        </div>
        <div className="summary-step-8-counter">
          <span>{values.summary?.length || 0}/500</span>
        </div>
        <div className="err-msg">{errors["summary"]}</div>
      </div>
    </div>
  );
}
