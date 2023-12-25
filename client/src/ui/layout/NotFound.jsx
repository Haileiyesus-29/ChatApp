import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'

function NotFound() {
   const navigate = useNavigate()
   return (
      <main className='min-h-screen flex items-center justify-center p-2'>
         <div className='max-w-md flex flex-col justif-center gap-6'>
            <h3 className='text-3xl font-bold text-center leading-relaxed'>
               The page you're looking for doesn't exist !
            </h3>
            <Button
               onClick={() => navigate('/', { replace: true })}
               label={'get back'}
            />
         </div>
      </main>
   )
}
export default NotFound
