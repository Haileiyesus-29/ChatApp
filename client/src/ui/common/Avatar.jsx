import Image from './Image'
/* eslint-disable react/prop-types */
function Avatar({ image, status, size = 'sm' }) {
   return (
      <div className={`avatar mx-1 aspect-square ${status}`}>
         <div
            className={`${size == 'sm' && 'w-12'} 
            ${size == 'md' && 'w-16'}
            ${size == 'lg' && 'w-20'}
            rounded-full`}
         >
            <Image image={image} />
         </div>
      </div>
   )
}
export default Avatar
