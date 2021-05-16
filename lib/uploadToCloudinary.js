export default async function uploadToCloudinary(url, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    const res = await fetch(url, {body: formData, method: "POST"});
    return  res.json();
}
