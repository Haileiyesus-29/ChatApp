import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function CreateForm() {
   return (
      <>
         <form className='flex flex-col gap-3 mx-auto py-10 min-w-[25rem] max-w-md'>
            <FormItem>
               <Label htmlFor='title'>Title</Label>
               <Input
                  id='title'
                  name='title'
                  type='text'
                  placeholder='Name'
                  className='focus-visible:border-zinc-300'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='username'>Username</Label>
               <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Username'
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='description'>Description</Label>
               <Textarea
                  id='description'
                  name='description'
                  type='text'
                  placeholder='Type description'
                  className='focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none max-h-56'
               />
            </FormItem>
            <FormItem>
               <Label htmlFor='image'>Image</Label>
               <Input
                  id='image'
                  name='image'
                  type='file'
                  placeholder='Image'
                  className='bg-zinc-950 border-none rounded-none w-64'
               />
            </FormItem>
            <Button type='submit' className='w-full'>
               Create Group
            </Button>
         </form>
      </>
   )
}
export default CreateForm
