import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'
import Message from '../../features/chat/Message'
import { useEffect, useState } from 'react'
import Info from '../messaging/Info'
import Profile from '../../features/profile/Profile'

function Container() {
   const location = useLocation()
   const path = location.pathname.split('/')?.at(1)

   const [screenWidth, setScreenWidth] = useState(() => window.innerWidth)
   const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth)
   }

   useEffect(() => {
      window.addEventListener('resize', updateScreenWidth)
      return () => {
         window.removeEventListener('resize', updateScreenWidth)
      }
   }, [])

   if (path === 'profile')
      return (
         <div className='containerEl max-w-screen-2xl mx-auto'>
            <Sidebar />
            <Profile />
         </div>
      )

   if (screenWidth < 768) {
      if (!path)
         return (
            <div className='containerEl'>
               <Sidebar />
               <Home />
            </div>
         )
      else if (path === 'chat' || path === 'group' || path === 'channel')
         return (
            <div className='containerEl'>
               <Sidebar />
               <Message />
            </div>
         )
      else if (path === 'info')
         return (
            <div className='containerEl'>
               <Sidebar />
               <Info />
            </div>
         )
   }

   if (screenWidth < 1280) {
      if (!path)
         return (
            <div className='containerEl'>
               <Sidebar />
               <Home />
               <Message />
            </div>
         )
      else if (path === 'chat' || path === 'group' || path === 'channel')
         return (
            <div className='containerEl'>
               <Sidebar />
               <Home />
               <Message />
            </div>
         )
      else if (path === 'info')
         return (
            <div className='containerEl'>
               <Sidebar />
               <Home />
               <Info />
            </div>
         )
   }

   return (
      <div className='containerEl max-w-screen-2xl mx-auto'>
         <Sidebar />
         <Home />
         <Message />
         <Info />
      </div>
   )
}
export default Container
