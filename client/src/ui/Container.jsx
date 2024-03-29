/* eslint-disable react/prop-types */
import Header from '@/components/Header'
import NavLinks from '@/components/NavLinks'
import Messages from '@/ui/Messages'

function Container({ children }) {
   return (
      <div className='gap-2 grid grid-cols-[minmax(4rem,_16rem),1fr] grid-rows-[min-content,1fr] bg-black mx-auto p-4 rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
         <Header />
         <NavLinks />
         {/* <main className='flex flex-col gap-2 px-4 py-2 h-full overflow-y-auto'>
            {Array.from({ length: 10 }).map((_, i) => (
               <ChatLink key={i} />
            ))}
         </main> */}
         <Messages />
      </div>
   )
}
export default Container
