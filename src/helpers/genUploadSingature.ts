import cloudinary from "../config/cloudinaryConfig"

function genUploadSignature({
  eager = "c_pad,h_300,w_400|c_crop,h_200,w_260",
  folder = "chatapp/profile_pictures",
  id,
}) {
  const timestamp = Math.round(Date.now() / 1000)
  const customFolder = `${folder}/${id}`

  const signature = cloudinary.utils.api_sign_request(
    {timestamp, eager, folder: customFolder},
    cloudinary.config().api_secret!
  )

  const cloudName = cloudinary.config()?.cloud_name || ""

  return {
    signature,
    timestamp,
    folder: customFolder,
    eager,
    apiKey: cloudinary.config().api_key,

    url: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  }
}

export default genUploadSignature
