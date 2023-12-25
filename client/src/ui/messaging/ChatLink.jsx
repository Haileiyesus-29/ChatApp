import Avatar from '../common/Avatar'

function ChatLink() {
   return (
      <div className=' flex gap-2 items-center p-1 dark:bg-base-content/10 rounded-md relative'>
         <div className='inline-flex items-center'>
            <Avatar
               image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
               status={'online'}
            />
         </div>
         <div className='flex flex-col justify-between'>
            <span className='text-lg font-bold  leading-tight pb-1'>
               John Doe
            </span>
            <span className='text-sm '>Lorem ipsum dolor sit amet cont.</span>
         </div>
         <span className='absolute top-1 right-2 dark:text-neutral-content/70'>
            14:21
         </span>
      </div>
   )
}
export default ChatLink
