/* eslint-disable react/prop-types */
import Avatar from '../common/Avatar'

function Info({ chatInfo, view }) {
   return (
      <section
         className={`lg:flex flex-col  ${view === 'info' ? 'flex' : 'hidden'}`}
      >
         <div className='flex gap-2 p-3'>
            <Avatar size='md' image={chatInfo?.image} />
            <div className='flex flex-col justify-center'>
               <h3 className='text-xl'>{chatInfo?.name}</h3>
               <span className='text-gray-900 text-xs dark:text-gray-200/40 leading-tight'>
                  Last seen recently
               </span>
            </div>
         </div>
         <div className='flex flex-col gap-3 px-8 py-4'>
            {chatInfo?.email && (
               <div className='flex flex-col justify-between gap-1'>
                  <span className='text-primary text-xs leading-tight'>
                     Email
                  </span>
                  <span className='text-sm leading-tight'>
                     {chatInfo.email}
                  </span>
               </div>
            )}
            {chatInfo?.username && (
               <div className='flex flex-col justify-between gap-1'>
                  <span className='text-primary text-xs leading-tight'>
                     Username
                  </span>
                  <span className='text-sm leading-tight'>
                     @{chatInfo.username}
                  </span>
               </div>
            )}
            {chatInfo?.bio && (
               <div className='flex flex-col justify-between gap-1'>
                  <span className='text-primary text-xs leading-tight'>
                     Bio
                  </span>
                  <span className='text-sm leading-tight'>{chatInfo.bio}</span>
               </div>
            )}
         </div>
         {/* <div className='overflow-y-auto'>
            <h3 className='dark:bg-base-100 px-3 py-1'>shared medias</h3>
            <div className='gap-1 grid grid-cols-4 auto-rows-auto p-1'>
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
         </div> */}
      </section>
   )
}
export default Info
