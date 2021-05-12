import fetchClient  from "./fetchClient";

function uploadToCloudinary(url, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    return fetchClient(url, formData);
}

export default uploadToCloudinary;
