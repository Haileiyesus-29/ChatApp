import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'

function Container() {
   return (
      <div className='flex h-screen max-w-screen-2xl mx-auto'>
         <Sidenav />
         <Outlet />
      </div>
   )
}
export default Container
