function Button({ label, onClick }) {
   return (
      <button
         onClick={() => onClick?.()}
         className='btn btn-primary capitalize'
      >
         {label}
      </button>
   )
}
export default Button
