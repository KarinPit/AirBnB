import React, { useState, useEffect } from "react";
import { uploadService } from "../../services/other/upload.service";
import { ImageIcon, PlusIcon } from "../../services/other/svg.service";

export function ImgUploader({ onUploaded = null, images = [] }) {
  const [imgData, setImgData] = useState(new Array(6).fill(null));

  useEffect(() => {
    if (images.length) {
      const updatedData = images.map((img, index) =>
        img ? { ...img } : imgData[index]
      );
      console.log(updatedData);
      setImgData(updatedData);
    }
  }, [images]);

  const uploadImg = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { secure_url, height, width } = await uploadService.uploadImg(file);
      const indexToUpdate = imgData.findIndex((img) => !img || !img.imgUrl);

      if (indexToUpdate === -1) {
        console.error("No available slots to upload new image.");
        return;
      }

      const updatedImgData = [...imgData];
      updatedImgData[indexToUpdate] = { imgUrl: secure_url, width, height };

      setImgData(updatedImgData);

      if (onUploaded) {
        onUploaded(updatedImgData.map((img) => (img ? img : null)));
      }
    } catch (error) {
      console.error("Upload failed for the file:", error);
    }
  };

  return (
    <div className="upload-preview">
      {imgData.map((data, index) => (
        <div
          key={index}
          className={`upload-item ${index === 0 && data?.imgUrl ? "first-upload" : ""
            }`}
        >
          {data?.imgUrl ? (
            <img
              src={data.imgUrl}
              alt={`Uploaded image ${index + 1}`}
              className="upload-image"
            />
          ) : (
            <button
              onClick={() =>
                document.getElementById(`imgUpload-${index}`).click()
              }
              className="upload-button"
            >
              <ImageIcon />
            </button>
          )}
          <input
            type="file"
            onChange={uploadImg}
            accept="image/*"
            id={`imgUpload-${index}`}
            style={{ display: "none" }}
          />
        </div>
      ))}
    </div>
  );
}
