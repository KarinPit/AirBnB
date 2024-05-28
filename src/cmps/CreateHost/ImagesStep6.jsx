import React from "react";
import { useFormikContext } from "formik";
import { ImgUploader } from "../../cmps/ImgUploader";

export default function ImagesStep6() {
  const { values, setFieldValue } = useFormikContext();

  function onUploaded(imgUrls) {
    console.log(imgUrls);
    setFieldValue("imgUrls", imgUrls);
  }

  return (
    <div className="images-step-6">
      <div>
        <div className="images-step-6-head">
          <h3>Choose at least 5 photos</h3>
        </div>
        <ImgUploader onUploaded={onUploaded} images={values.imgUrls} />
      </div>
    </div>
  );
}
