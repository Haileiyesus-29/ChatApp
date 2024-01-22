/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '../common/Image'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../common/Avatar'

function Info({ chatInfo, loading }) {
   return (
      <section className='flex-col flex dark:bg-base-100'>
         <div className='flex gap-2 p-3 dark:bg-neutral-content/10'>
            <Avatar
               size='md'
               image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
            />
            <div className='flex flex-col justify-center'>
               <h3 className='text-xl '>{chatInfo?.name}</h3>
               <span className='text-xs dark:text-gray-200/40 leading-tight'>
                  Last seen recently
               </span>
            </div>
         </div>
         <div className='grid grid-cols-[2rem,1fr] auto-rows-min gap-3 p-2 '>
            <span className='flex justify-center items-center row-span-full'>
               <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ fontSize: '1.5rem' }}
               />
            </span>
            <div className='flex flex-col justify-between gap-1'>
               <span className='text-xs dark:text-gray-200/40 leading-tight'>
                  Email
               </span>
               <a href='#' className='leading-tight text-sm'>
                  {chatInfo?.email}
               </a>
            </div>
            {chatInfo?.username && (
               <div className='flex flex-col justify-between gap-1'>
                  <span className='text-xs dark:text-gray-200/40 leading-tight'>
                     Username
                  </span>
                  <a href='#' className='leading-tight text-sm'>
                     @{chatInfo.username}
                  </a>
               </div>
            )}
            {chatInfo?.bio && (
               <div className='flex flex-col justify-between gap-1'>
                  <span className='text-xs dark:text-gray-200/40 leading-tight'>
                     Bio
                  </span>
                  <a href='#' className='leading-tight text-sm'>
                     {chatInfo.bio}
                  </a>
               </div>
            )}
         </div>
         <div className='overflow-y-auto'>
            <h3 className=' dark:bg-base-100 px-3 py-1'>shared medias</h3>
            <div className='grid grid-cols-4 auto-rows-auto gap-1 p-1'>
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
               <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
         </div>
      </section>
   )
}
export default Info
