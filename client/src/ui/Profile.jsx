import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useAuth from '@/store/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
   name: z
      .string()
      .min(1, { message: 'name is required' })
      .max(32, { message: "name can't be more than 32 characters" }),
   username: z
      .string()
      .min(5, { message: 'username must be atleast 5 characters' })
      .max(32, { message: "username can't be more than 32 characters" }),
   bio: z.string().max(255),
})

function Profile() {
   const { account } = useAuth(store => store)
   const [disabled, setDisabled] = useState({
      name: true,
      username: true,
      email: true,
      bio: true,
   })
   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
   } = useForm({
      defaultValues: {
         name: account?.name,
         username: account?.username,
         email: account?.email,
         bio: account?.bio,
      },
      resolver: zodResolver(schema),
   })

   const onSubmit = data => {
      console.log(data)
   }

   return (
      <main className='flex gap-4 bg-zinc-900 p-4'>
         <form className='flex flex-col gap-2 basis-1/3'>
            <img
               src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
               alt='profile image'
            />
            <Input type='file' id='image' name='image' />
            <Button
               disabled={true}
               type='button'
               variant='secondary'
               className='w-full'
            >
               Change Image
            </Button>
         </form>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 grow'
         >
            <FormItem>
               <Label htmlFor='username'>Name</Label>
               <div className='flex items-center'>
                  <Input
                     {...register('name')}
                     id='name'
                     name='name'
                     type='text'
                     placeholder='Name'
                     disabled={disabled.name}
                     className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
                  />
                  <span
                     onClick={() =>
                        setDisabled(prev => ({
                           ...prev,
                           name: false,
                        }))
                     }
                     className='px-1 text-zinc-400 hover:text-zinc-50 transition cursor-pointer'
                  >
                     <Pencil size='20px' />
                  </span>
               </div>
               {errors.name && (
                  <span className='text-red-500'>{errors.name.message}</span>
               )}
            </FormItem>
            <FormItem>
               <Label htmlFor='username'>Username</Label>
               <div className='flex items-center'>
                  <Input
                     {...register('username')}
                     id='username'
                     name='username'
                     type='text'
                     placeholder='Username'
                     disabled={disabled.username}
                     className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
                  />
                  <span
                     onClick={() =>
                        setDisabled(prev => ({
                           ...prev,
                           username: false,
                        }))
                     }
                     className='px-1 text-zinc-400 hover:text-zinc-50 transition cursor-pointer'
                  >
                     <Pencil size='20px' />
                  </span>
               </div>
               {errors.username && (
                  <span className='text-red-500'>
                     {errors.username.message}
                  </span>
               )}
            </FormItem>
            <FormItem>
               <Label htmlFor='email'>Email</Label>
               <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={account?.email}
                  disabled={disabled.email}
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='bio'>Bio</Label>
               <div className='flex items-start'>
                  <Textarea
                     {...register('bio')}
                     id='bio'
                     name='bio'
                     placeholder='Bio'
                     disabled={disabled.bio}
                     className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
                  />
                  <span
                     onClick={() =>
                        setDisabled(prev => ({
                           ...prev,
                           bio: false,
                        }))
                     }
                     className='px-1 py-3 text-zinc-400 hover:text-zinc-50 transition cursor-pointer'
                  >
                     <Pencil size='20px' />
                  </span>
               </div>
            </FormItem>
            <div className='flex gap-4'>
               <Button
                  variant='secondary'
                  className='w-full'
                  type='button'
                  onClick={() =>
                     setDisabled({
                        bio: true,
                        name: true,
                        email: true,
                        username: true,
                     })
                  }
               >
                  Cancel
               </Button>
               <Button
                  disabled={!Object.values(disabled).includes(false)}
                  type='submit'
                  className='w-full'
               >
                  Update
               </Button>
            </div>
         </form>
      </main>
   )
}
export default Profile
