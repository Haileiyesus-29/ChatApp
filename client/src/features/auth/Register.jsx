import { Link } from 'react-router-dom'
import Input from '../../ui/common/Input'
import Button from '../../ui/common/Button'

function Register() {
   return (
      <main className='min-h-screen flex justify-center items-center p-2'>
         <form className='flex flex-col gap-4 dark:bg-neutral w-full max-w-md px-4 py-8 rounded-lg'>
            <h2 className='text-3xl text-center leading-loose'>Register</h2>

            <Input
               name='fname'
               placeholder='Your first name'
               type='text'
               label='First Name'
            />
            <Input
               name='lname'
               placeholder='Your last name'
               type='text'
               label='Last Name'
            />
            <Input
               placeholder='e.g, John@example.com'
               type='email'
               name='email'
               label='email'
            />
            <Input
               label='password'
               name='password'
               type='password'
               key='password'
               placeholder='your password'
            />

            <div className='flex flex-col gap-3'>
               <Button label='Create my account' />
               <span className='text-sm'>
                  Already have an account ? &nbsp;
                  <Link to='/login' className='text-primary'>
                     Login
                  </Link>
               </span>
            </div>
         </form>
      </main>
   )
}
export default Register
