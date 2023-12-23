/* eslint-disable react/prop-types */
function ChatBubble({ type, content, details }) {
   return (
      <div
         className={`flex items-end gap-2.5 m-2 max-w-screen-sm ${
            type === 'sent' && 'justify-end ml-auto'
         }`}
      >
         {details && type === 'received' && (
            <img
               className={`w-8 h-8 rounded-full ${
                  type === 'sent' && 'order-2'
               }`}
               src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
               alt='Jese image'
            />
         )}
         <div className='flex flex-col gap-1 w-full max-w-[70%]'>
            {details && type === 'received' && (
               <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                  <span className='text-sm font-semibold text-gray-900 dark:text-primary'>
                     Bonnie Green
                  </span>
               </div>
            )}
            <div
               className={`flex flex-col gap-2  leading-1.5 p-4 ${
                  type === 'sent'
                     ? 'rounded-s-xl rounded-se-xl dark:bg-primary dark:text-primary-content items-end'
                     : 'rounded-e-xl rounded-ss-xl dark:bg-base-300  items-start'
               } `}
            >
               <p className='text-md font-normal'>
                  That's awesome. I think our users will really appreciate the
                  improvements.
               </p>
               <span className='rounded-lg overflow-hidden max-w-sm'>
                  <img
                     src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                     alt=''
                     className='object-contain'
                  />
               </span>
            </div>
            <div className='flex justify-between'>
               <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                  11:46
               </span>
               {type === 'sent' && (
                  <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                     seen
                  </span>
               )}
            </div>
         </div>
      </div>
   )
}
export default ChatBubble
