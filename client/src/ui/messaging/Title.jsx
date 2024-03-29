import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../common/Avatar'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line react/prop-types
function Title({ name, image }) {
   return (
      <div className='p-2 flex gap-2 items-center '>
         <div className='flex items-center'>
            <Avatar image={image} />
         </div>
         <div className='flex flex-col justify-between'>
            {name && <h3 className=''>{name}</h3>}{' '}
            <span className='text-xs text-green-400/80'>online</span>
         </div>

         <div className=' ml-auto flex items-center gap-2 pr-2'>
            <span>
               <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={{ fontSize: '1.5rem' }}
               />
            </span>
         </div>
      </div>
   )
}
export default Title
