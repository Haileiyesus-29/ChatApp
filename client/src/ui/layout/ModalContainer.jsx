function ModalContainer({ children }) {
   return (
      <div className='fixed w-screen h-screen left-0 top-0 z-50 flex justify-center items-center backdrop-brightness-50'>
         {children}
      </div>
   )
}
export default ModalContainer
