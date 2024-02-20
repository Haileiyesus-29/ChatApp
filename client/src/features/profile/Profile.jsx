import { useContext, useState } from 'react'
import authContext from '../auth/authContext'
import Image from '../../ui/common/Image'

function Profile() {
   const { account } = useContext(authContext)
   const [action, setAction] = useState('show')

   return (
      <dialog id='my_modal_3' className='modal'>
         <div className='modal-box rounded-md'>
            <form method='dialog'>
               <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                  ✕
               </button>
            </form>
            {action === 'show' && (
               <div className='flex flex-col gap-6'>
                  <h3 className='font-bold text-lg text-center'>Profile</h3>
                  <p className='w-24 h-24 rounded-full overflow-hidden mx-auto'>
                     <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
                  </p>
                  <div className='inline-flex flex-col gap-2 mx-auto'>
                     <div className='flex'>
                        <div className='w-32'>Name</div>
                        <div className='grow'>{account.name}</div>
                     </div>
                     <div className='flex'>
                        <div className='w-32'>Email</div>
                        <div className='grow'>{account.email}</div>
                     </div>
                     <div className='flex'>
                        <div className='w-32'>Username</div>
                        <div className='grow'>{account.username}</div>
                     </div>
                     <button
                        className='btn btn-sm my-4 capitalize'
                        onClick={() => setAction('update')}
                     >
                        edit profile
                     </button>
                  </div>
               </div>
            )}
            {action === 'update' && (
               <div className='flex flex-col gap-6'>
                  <h3 className='font-bold text-lg text-center'>
                     Edit Profile
                  </h3>

                  <div className='inline-flex flex-col gap-2 mx-auto'>
                     <div className='flex'>
                        <div className='w-32'>Name</div>
                        <div className='grow'>
                           <input
                              type='text'
                              className='input input-bordered input-sm'
                              defaultValue={account.name}
                           />
                        </div>
                     </div>
                     <div className='flex'>
                        <div className='w-32'>Email</div>
                        <div className='grow'>{account.email}</div>
                     </div>
                     <div className='flex'>
                        <div className='w-32'>Username</div>
                        <div className='grow'>
                           <input
                              type='text'
                              className='input input-bordered input-sm'
                              defaultValue={account.username}
                           />
                        </div>
                     </div>
                     <div className='flex'>
                        <div className='w-32'>Image</div>
                        <div className='grow'>
                           <input
                              type='file'
                              className='file-input file-input-sm w-full max-w-xs'
                           />
                        </div>
                     </div>
                     <button className='btn btn-primary btn-sm capitalize mt-3'>
                        Update profile
                     </button>
                     <button
                        className='btn btn-sm capitalize mb-3'
                        onClick={() => setAction('show')}
                     >
                        get back
                     </button>
                  </div>
               </div>
            )}
         </div>
      </dialog>
   )
}
export default Profile
