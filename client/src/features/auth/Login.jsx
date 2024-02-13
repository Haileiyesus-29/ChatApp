import { Link, useNavigate } from 'react-router-dom'
import Input from '../../ui/common/Input'
import Button from '../../ui/common/Button'
import { useContext, useState } from 'react'
import authContext from './authContext'

function Login() {
   const [info, setInfo] = useState({ email: '', password: '' })
   const { login, loading } = useContext(authContext)
   const navigate = useNavigate()

   const handleSubmit = async e => {
      e.preventDefault()
      await login(info, () => navigate('/'))
   }

   return (
      <main className='min-h-screen flex justify-center items-center p-2'>
         <form
            className='flex flex-col gap-4 dark:bg-neutral w-full max-w-md px-4 py-8 rounded-lg'
            onSubmit={handleSubmit}
         >
            <h2 className='text-3xl text-center leading-loose'>Login</h2>
            <Input
               name='email'
               type='email'
               key='email'
               label='email'
               placeholder='your email address'
               onChange={e =>
                  setInfo(prev => ({ ...prev, email: e.target.value }))
               }
            />
            <Input
               label='password'
               name='password'
               type='password'
               key='password'
               placeholder='your password'
               onChange={e =>
                  setInfo(prev => ({ ...prev, password: e.target.value }))
               }
            />

            <div className='flex flex-col gap-3'>
               <Button
                  label={loading ? 'loading...' : 'Login'}
                  disabled={!!loading}
               />
               <span className='text-sm'>
                  Didn't have an account ?{' '}
                  <Link to='/register' className='text-primary'>
                     Create one
                  </Link>
               </span>
               <Link className='text-sm text-primary'>Forgot password</Link>
            </div>
         </form>
      </main>
   )
}
export default Login
