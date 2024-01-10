import {
   faAngleRight,
   faFaceLaugh,
   faImage,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ChatForm() {
   return (
      <form className=' mt-auto'>
         <div className='flex items-center px-3 py-2 dark:bg-base-300'>
            <button type='button' className='btn btn-xs btn-circle mx-1'>
               <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.5rem' }} />
            </button>
            <button type='button' className='btn btn-xs btn-circle mx-1'>
               <FontAwesomeIcon
                  icon={faFaceLaugh}
                  style={{ fontSize: '1.5rem' }}
               />
            </button>
            <textarea
               className='textarea h-12 max-h-24 w-full mx-1 text-lg'
               placeholder='Your message...'
            ></textarea>
            <button
               type='submit'
               className='btn btn-sm btn-circle dark:bg-primary dark:text-primary-content'
            >
               <FontAwesomeIcon
                  icon={faAngleRight}
                  style={{ fontSize: '1.5rem' }}
               />
            </button>
         </div>
      </form>
   )
}
export default ChatForm
