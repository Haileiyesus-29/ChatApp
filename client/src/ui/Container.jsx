import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'

function Container() {
   return (
      <div className='h-screen dark:bg-base-100 grid grid-rows-1  grid-cols-[4rem_1fr] md:grid-cols-[4rem_minmax(0,min-content)_1fr]'>
         <Sidebar />
         <Home />
         <Outlet />
      </div>
   )
}
export default Container
