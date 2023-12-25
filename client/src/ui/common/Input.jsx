function Input({ name = '', label, type, placeholder }) {
   return (
      <label className='form-control w-full '>
         <div className='label'>
            <span className='label-text'>
               {label
                  ?.toLowerCase()
                  .split('')
                  .map((char, i) => (i === 0 ? char.toUpperCase() : char))}
            </span>
         </div>
         <input
            type={type}
            placeholder={placeholder}
            name={name}
            className='input input-bordered w-full '
         />
         <div className='label hidden'>
            <span className='label-text-alt'>Bottom Left label</span>
         </div>
      </label>
   )
}
export default Input
