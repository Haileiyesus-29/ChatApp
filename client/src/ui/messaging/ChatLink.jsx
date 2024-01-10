/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import Avatar from '../common/Avatar'

function ChatLink({ chat }) {
   const { fname, lname, image, id, createdAt, text } = chat
   const time = formatDate(createdAt)

   return (
      <Link
         state={chat}
         to={`/chat/${id}`}
         className=' flex gap-2 items-center p-1 dark:bg-base-content/10 rounded-md relative'
      >
         <div className='inline-flex items-center'>
            <Avatar
               image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
               status={'online'}
            />
         </div>
         <div className='flex flex-col justify-between'>
            <span className='text-lg font-bold  leading-tight pb-1'>
               {`${fname} ${lname}`}
            </span>
            <span className='text-sm '>{text}</span>
         </div>
         <span className='absolute top-1 right-2 dark:text-neutral-content/70 text-xs'>
            {time}
         </span>
      </Link>
   )
}
export default ChatLink
