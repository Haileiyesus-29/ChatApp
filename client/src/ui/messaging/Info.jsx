import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '../common/Image'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../common/Avatar'

function Info() {
   return (
      <section className='flex-col flex dark:bg-base-300'>
         <div className='flex gap-2 p-3 dark:bg-neutral-content/10'>
            <Avatar
               size='lg'
               image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
            />
            <div className='flex flex-col justify-center'>
               <h3 className='text-lg font-bold'>Jane Do3</h3>
               <span className='text-sm'>Last seen recently</span>
            </div>
         </div>
         <div className='grid grid-cols-[5rem,1fr] auto-rows-min gap-3 p-2 '>
            <span className='flex justify-center items-center row-start-1 row-span-4'>
               <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ fontSize: '2rem' }}
               />
            </span>
            <div className='flex flex-col justify-between gap-1'>
               <a href='#' className='leading-tight'>
                  JohnSmith@gmail.com
               </a>
               <span className='text-xs'>Email</span>
            </div>
            <div className='flex flex-col justify-between gap-1'>
               <a href='#' className='leading-tight'>
                  @joh123
               </a>
               <span className='text-xs'>Username</span>
            </div>
            <div className='flex flex-col justify-between gap-1'>
               <a href='#' className='leading-tight'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Harum, corporis?
               </a>
               <span className='text-xs'>Bio</span>
            </div>
         </div>
         <div className=''>
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
