function Avatar({ image, status }) {
   return (
      <div className={`avatar mx-1 ${status}`}>
         <div className='w-12 rounded-full'>
            <img src={image} />
         </div>
      </div>
   )
}
export default Avatar
