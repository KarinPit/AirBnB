export const uploadService = {
  uploadImg,
};

async function uploadImg(file) {
  const CLOUD_NAME = "duebd8al2";
  const UPLOAD_PRESET = "l6mdxism";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return {
      secure_url: data.secure_url,
      height: data.height,
      width: data.width
    };
  } catch (err) {
    console.error("Failed to upload", err);
    throw err;
  }
}
