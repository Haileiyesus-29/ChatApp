import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '../../ui/common/Image'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Input from '../../ui/common/Input'
import Button from '../../ui/common/Button'

function Profile() {
   return (
      <div className='flex flex-col md:flex-row p-2 gap-2 col-start-2 col-end-5 md:items-start overflow-y-scroll'>
         <div className='flex flex-col gap-4 sm:max-w-80 grow-0 dark:bg-base-300 px-2 py-8 rounded-lg'>
            <Image image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            <span className='btn btn-sm btn-primary btn-outline'>
               <FontAwesomeIcon icon={faImage} />
               Choose Profile Picture
            </span>
         </div>
         <div className='dark:bg-base-300 px-2 py-8 rounded-lg grow md:max-w-md'>
            <form className='max-w-md mx-auto'>
               <div className='relative z-0 w-full mb-5 group'>
                  <Input
                     name='email'
                     label='email address'
                     type='email'
                     disabled={true}
                     defaultValue='john@email.com'
                     secondary={false}
                  />
               </div>
               <div className='relative z-0 w-full mb-5 group'>
                  <Input
                     name='username'
                     label='username'
                     type='text'
                     disabled={true}
                     defaultValue='@john123'
                     secondary={false}
                  />
               </div>

               <div className='grid md:grid-cols-2 md:gap-6'>
                  <div className='relative z-0 w-full mb-5 group'>
                     <Input
                        name='fname'
                        label='first name'
                        type='text'
                        disabled={true}
                        defaultValue='John'
                        secondary={false}
                     />
                  </div>
                  <div className='relative z-0 w-full mb-5 group'>
                     <Input
                        name='lname'
                        label='last name'
                        type='text'
                        disabled={true}
                        defaultValue='@john123'
                        secondary={false}
                     />
                  </div>
               </div>

               <label className='form-control w-full my-2'>
                  <div className='label'>
                     <span className='label-text capitalize'>bio</span>
                  </div>
                  <textarea
                     name='floating_phone'
                     id='floating_phone'
                     className='block min-h-12 h-32 max-h-44 w-full  textarea'
                     placeholder='Write your bio here..'
                     defaultValue=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, excepturi! Repellat labore cum necessitatibus architecto, nulla culpa vitae sapiente dicta?'
                     disabled={true}
                     spellCheck={false}
                  ></textarea>
                  <div className='label hidden'>
                     <span className='label-text-alt'>Bottom Left label</span>
                  </div>
               </label>
               <div className='w-full btn btn-primary btn-sm'>Save changes</div>
            </form>
         </div>
      </div>
   )
}
export default Profile
