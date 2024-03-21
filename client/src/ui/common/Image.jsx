const serverAddr = import.meta.env.VITE_SERVER_ADDR

function Image({ image, className }) {
   let defaultImage =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfFsrFWiPdd7mVVTaklVWpDbebmLTAG5uE5svdf-NwSg&s'
   return (
      <img
         className={`w-full h-full object-cover ${className}`}
         src={image ? `${serverAddr}/${image}` : defaultImage}
         alt='image'
      />
   )
}
export default Image
