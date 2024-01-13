import {
   faAngleRight,
   faFaceLaugh,
   faImage,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ChatForm() {
   return (
      <form className=' mt-auto'>
         <div className='flex items-center gap-1 px-2 py-1 dark:bg-base-300'>
            <button type='button' className='btn btn-xs btn-circle'>
               <FontAwesomeIcon icon={faImage} style={{ fontSize: '1.5rem' }} />
            </button>
            <button type='button' className='btn btn-xs btn-circle'>
               <FontAwesomeIcon
                  icon={faFaceLaugh}
                  style={{ fontSize: '1.5rem' }}
               />
            </button>
            <textarea
               className='grow max-h-10 resize-none dark:bg-gray-700/30 w-full px-2 py-1 rounded-md  focus:outline-gray-700 focus:outline-offset-1 focus:outline-double focus:outline-2'
               placeholder='Your message...'
            ></textarea>
            <button
               type='submit'
               className=' dark:bg-primary px-2 self-stretch rounded-lg dark:text-primary-content'
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
