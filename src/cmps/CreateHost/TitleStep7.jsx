import { useFormikContext } from "formik";
import React from "react";

export default function TitleStep7() {
  const { values, setFieldValue, errors, setFieldTouched } = useFormikContext();

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setFieldValue("name", value);
    setFieldTouched("name", true, false);
  };

  // Validate the title length
  const isTitleTooLong = values.name && values.name.length > 32;

  return (
    <div className="title-step-7">
      <div>
        <div className="title-step-7-head">
          <h1>Now, let's give your apartment a title</h1>
          <span>
            Short titles work best. Have fun with it—you can always change it
            later.
          </span>
        </div>
        <div>
          <textarea
            name="name"
            value={values.name}
            onChange={handleTitleChange}
            rows={5}
            autoComplete="off"
            className={isTitleTooLong ? "error-border" : ""}
          />
        </div>
        <div className="title-step-7-counter">
          <span>{values.name?.length || 0}/32</span>
        </div>
        <div className="err-msg">{errors["name"]}</div>
      </div>
    </div>
  );
}
