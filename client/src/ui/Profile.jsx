import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function Profile() {
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
         <form className='flex flex-col gap-4 grow'>
            <FormItem>
               <Label htmlFor='username'>Name</Label>
               <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Name'
                  defaultValue='John Doe'
                  disabled={true}
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='username'>Username</Label>
               <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Username'
                  defaultValue='johndoe'
                  disabled={true}
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='email'>Email</Label>
               <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  defaultValue='johndoe@email.com'
                  disabled={true}
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='bio'>Bio</Label>
               <Textarea
                  id='bio'
                  name='bio'
                  placeholder='Bio'
                  defaultValue='I am a software engineer'
                  disabled={true}
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            {/* confirm and cancel buttons */}
            <div className='flex gap-4'>
               <Button type='button' variant='secondary' className='w-full'>
                  Cancel
               </Button>
               <Button disabled={true} type='submit' className='w-full'>
                  Update
               </Button>
            </div>
         </form>
      </main>
   )
}
export default Profile
