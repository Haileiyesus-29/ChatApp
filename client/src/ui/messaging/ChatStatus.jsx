import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../common/Avatar'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line react/prop-types
function ChatStatus({ page, name, fname, lname, image, isLoading }) {
   return (
      <div className='p-2 border-b flex gap-2 items-center dark:bg-neutral-content/10'>
         {isLoading ? (
            <div>Loading... </div>
         ) : (
            <>
               <div className='flex items-center'>
                  <Avatar image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               </div>
               <div className='flex flex-col justify-between'>
                  <h3 className=''>
                     {name || `${fname} ${lname ? lname : ''}`}
                  </h3>
                  {page === 'chat' && (
                     <span className='text-xs text-green-400/80'>online</span>
                  )}
               </div>
            </>
         )}
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
export default ChatStatus
