import cloudinary from "@/config/cloudinaryConfig"

function genUploadSignature(
  editConfig = {width: 300, height: 300, crop: "pad"},
  folder = "profile_pictures"
) {
  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {timestamp, eager: [editConfig], folder},
    cloudinary.config().api_secret!
  )

  const cloudName = cloudinary.config()?.cloud_name || ""

  return {
    signature,
    timestamp,
    apiKey: cloudinary.config().api_key,
    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  }
}

export default genUploadSignature
