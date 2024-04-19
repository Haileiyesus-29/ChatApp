import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import AuthContainer from '@/ui/AuthContainer'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuth from '@/store/useAuth'

const schema = z.object({
   email: z.string().email().trim(),
   password: z.string(),
})

function Login() {
   const { login } = useAuth()
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
   } = useForm({
      resolver: zodResolver(schema),
   })

   return (
      <AuthContainer>
         <form
            onSubmit={handleSubmit(data => login(data, setError))}
            className='flex flex-col gap-4 bg-zinc-900 px-4 py-6 w-full max-w-sm'
         >
            <h2 className='font-semibold text-2xl text-center'>Login</h2>
            {errors.root && (
               <p className='bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm'>
                  {errors.root?.message}
               </p>
            )}
            <FormItem>
               <Label htmlFor='email'>Email</Label>
               <Input
                  {...register('email')}
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Name'
                  className='focus-visible:border-zinc-300'
               />
               {errors.email && (
                  <p className='bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm'>
                     {errors.email?.message}
                  </p>
               )}
            </FormItem>
            <FormItem>
               <Label htmlFor='password'>Password</Label>
               <Input
                  {...register('password')}
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
               {errors.password && (
                  <p className='bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm'>
                     {errors.password?.message}
                  </p>
               )}
            </FormItem>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
               {isSubmitting ? 'Loading...' : 'Login'}
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
