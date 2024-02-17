/* eslint-disable react/prop-types */

const ChatBubble = ({ type, details, text, images, createdAt, name }) => {
   const isSent = type === 'sent'
   const isReceived = type === 'received'

   const messageClass = `flex flex-col gap-1 w-full  ${
      isReceived ? 'items-start' : 'items-end'
   }`
   const mainContainerClass = `flex items-end gap-2.5 m-2 max-w-screen-sm ${
      isSent && 'justify-end ml-auto'
   }`
   const imageClass = `w-8 h-8 rounded-full ${isSent && 'order-2'}`
   const nameContainerClass = 'flex items-center space-x-2 rtl:space-x-reverse'
   const messageContainerClass = `gap-2 leading-1.5 p-2 ${
      isSent
         ? 'rounded-s-xl rounded-se-xl dark:bg-primary dark:text-primary-content items-end'
         : 'rounded-e-xl rounded-ss-xl dark:bg-base-300 items-start'
   }`
   const timestampClass =
      'px-2 text-[0.6rem] font-normal text-gray-500 dark:text-gray-400'

   return (
      <div className={mainContainerClass}>
         {details && isReceived && (
            <img
               className={imageClass}
               src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
               alt='Jese image'
            />
         )}
         <div className={messageClass}>
            {details && isReceived && (
               <div className={nameContainerClass}>
                  <span className='text-sm font-semibold text-gray-900 dark:text-primary'>
                     {name}
                  </span>
               </div>
            )}
            <div className={messageContainerClass}>
               <p className='text-sm'>{text}</p>
               {!!images?.length && (
                  <div className='rounded-lg overflow-hidden max-w-60 '>
                     <img
                        src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        alt=''
                        className='object-contain w-full h-full'
                     />
                  </div>
               )}
            </div>
            <div className='flex justify-between'>
               <span className={timestampClass}>
                  {new Date(createdAt).toLocaleString()}
               </span>
               {isSent && (
                  <span className='text-[0.7rem] font-normal text-gray-500 dark:text-gray-400'>
                     seen
                  </span>
               )}
            </div>
         </div>
      </div>
   )
}

export default ChatBubble
