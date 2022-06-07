export default async function uploadToCloudinary(preset, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API, {
    body: formData,
    method: "POST",
  });

  return res.json();
}
