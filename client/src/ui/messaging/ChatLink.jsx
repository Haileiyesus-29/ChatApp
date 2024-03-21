/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import Avatar from '../common/Avatar'

function ChatLink({ chat, linkTo }) {
   const { fname, lname, name, image, id, createdAt, text } = chat
   const time = formatDate(createdAt)
   const { '*': paramId } = useParams()
   return (
      <Link
         state={chat}
         to={linkTo}
         className={`flex gap-2 items-center p-1 rounded-md relative ${
            paramId === id
               ? 'dark:bg-primary dark:text-primary-content'
               : 'dark:bg-base-content/10'
         }`}
      >
         <div className='inline-flex items-center'>
            <Avatar image={image} status={'online'} />
         </div>
         <div className='flex flex-col justify-between gap-2'>
            <span className='leading-tight text'>
               {`${fname || name} ${lname ? lname : ''}`}
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
         <span className='top-[2px] right-2 absolute text-[0.6rem]'>
            {time}
         </span>
      </Link>
   )
}
export default ChatLink
