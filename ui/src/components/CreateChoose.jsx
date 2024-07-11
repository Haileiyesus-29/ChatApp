import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function CreateChoose() {
   return (
      <section className='flex flex-col gap-3 py-10 min-w-80 self-center'>
         <Link className='' to='/new/group'>
            <Button className='w-full'>Create new Group</Button>
         </Link>
         <Link className='' to='/new/channel'>
            <Button className='w-full'>Create new Channel</Button>
         </Link>
      </section>
   )
}
export default CreateChoose
