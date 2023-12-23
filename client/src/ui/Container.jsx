/* eslint-disable react/prop-types */
function Container({ children }) {
   return (
      <div className='h-screen dark:bg-base-100 grid grid-cols-[4rem_1fr] grid-rows-1 '>
         {children}
      </div>
   )
}
export default Container
