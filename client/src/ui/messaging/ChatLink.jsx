/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import Avatar from '../common/Avatar'

function ChatLink({ chat }) {
   const { fname, lname, image, id, createdAt, text } = chat
   const time = formatDate(createdAt)
   const { '*': paramId } = useParams()
   return (
      <Link
         state={chat}
         to={`/chat/${id}`}
         className={`flex gap-2 items-center p-1 rounded-md relative ${
            paramId === id
               ? 'dark:bg-primary dark:text-primary-content'
               : 'dark:bg-base-content/10'
         }`}
      >
         <div className='inline-flex items-center'>
            <Avatar
               image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
               status={'online'}
            />
         </div>
         <div className='flex flex-col justify-between gap-2'>
            <span className='text leading-tight '>
               {`${fname} ${lname ? lname : ''}`}
            </span>
            <span
               className={`text-xs ${
                  paramId === id
                     ? 'dark:text-primary-content/80'
                     : 'dark:text-gray-500 '
               }`}
            >
               {text}
            </span>
         </div>
         <span className='absolute top-[2px] right-2  text-[0.6rem]'>
            {time}
         </span>
      </Link>
   )
}
export default ChatLink
