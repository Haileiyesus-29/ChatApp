import { useContext, useState } from 'react'
import authContext from '../auth/authContext'
import Image from '../../ui/common/Image'

function Profile() {
   const { account, update } = useContext(authContext)
   const [action, setAction] = useState('show')

   const handleUpdate = e => {
      e.preventDefault()
      const formData = new FormData(e.target)
      update(Object.fromEntries(formData), () => setAction('show'))
   }

   return (
      <dialog id='my_modal_3' className='modal'>
         <div className='rounded-md modal-box'>
            <form method='dialog'>
               <button className='top-2 right-2 absolute btn btn-circle btn-ghost btn-sm'>
                  ✕
               </button>
            </form>
            {action === 'show' && (
               <div className='flex flex-col gap-6'>
                  <h3 className='font-bold text-center text-lg'>Profile</h3>
                  <p className='mx-auto rounded-full w-24 h-24 overflow-hidden'>
                     <Image image={account.image} />
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
                        className='my-4 capitalize btn btn-sm'
                        onClick={() => setAction('update')}
                     >
                        edit profile
                     </button>
                  </div>
               </div>
            )}
            {action === 'update' && (
               <form onSubmit={handleUpdate} encType='multipart/form-data'>
                  <div className='flex flex-col gap-6'>
                     <h3 className='font-bold text-center text-lg'>
                        Edit Profile
                     </h3>

                     <div className='inline-flex flex-col gap-2 mx-auto'>
                        <div className='flex'>
                           <div className='w-32'>Name</div>
                           <div className='grow'>
                              <input
                                 name='name'
                                 type='text'
                                 className='input-bordered input input-sm'
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
                                 name='username'
                                 type='text'
                                 className='input-bordered input input-sm'
                                 defaultValue={account.username}
                              />
                           </div>
                        </div>
                        <div className='flex'>
                           <div className='w-32'>Image</div>
                           <div className='grow'>
                              <input
                                 name='image'
                                 type='file'
                                 className='w-full max-w-xs file-input file-input-sm'
                              />
                           </div>
                        </div>
                        <button className='mt-3 capitalize btn btn-primary btn-sm'>
                           Update profile
                        </button>
                        <button
                           className='mb-3 capitalize btn btn-sm'
                           onClick={() => setAction('show')}
                        >
                           get back
                        </button>
                     </div>
                  </div>
               </form>
            )}
         </div>
      </dialog>
   )
}
export default Profile
