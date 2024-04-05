import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import AuthContainer from '@/ui/AuthContainer'
import { Link } from 'react-router-dom'

function Login() {
   return (
      <AuthContainer>
         <form className='flex flex-col gap-4 bg-zinc-900 px-4 py-6 w-full max-w-sm'>
            <h2 className='font-semibold text-2xl text-center'>Login</h2>
            <FormItem>
               <Label htmlFor='title'>Email</Label>
               <Input
                  id='title'
                  name='title'
                  type='text'
                  placeholder='Name'
                  className='focus-visible:border-zinc-300'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='username'>Password</Label>
               <Input
                  id='username'
                  name='username'
                  type='password'
                  placeholder='Password'
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <Button type='submit' className='w-full'>
               Login
            </Button>
            <Separator />
            <Button type='button' className='flex gap-2 w-full'>
               <img
                  className='w-6 h-6'
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  loading='lazy'
                  alt='google logo'
               />
               <span className='text-center'>Login with Google</span>
            </Button>
            <p className='text-sm text-zinc-'>
               didn&apos;t have an account?
               <Link to='/signup' className='px-2 text-blue-700'>
                  Register
               </Link>
            </p>
         </form>
      </AuthContainer>
   )
}
export default Login