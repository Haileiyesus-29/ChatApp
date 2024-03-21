const serverAddr = import.meta.env.VITE_SERVER_ADDR

function Image({ image, className }) {
   return (
      <img
         className={`w-full h-full object-cover ${className}`}
         src={`${serverAddr}/${image}`}
         alt='image'
      />
   )
}
export default Image
