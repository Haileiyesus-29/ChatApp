/* eslint-disable react/prop-types */
function Input({
   name = '',
   label,
   type,
   placeholder,
   secondary = false,
   defaultValue = '',
   disabled = false,
   onChange,
   onFocus,
   error,
}) {
   if (secondary)
      return (
         <>
            <input
               type={type}
               name={name}
               className='block py-2.5 px-0 w-full text-sm text-base-300 dark:text-neutral-content bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
               defaultValue={defaultValue}
               disabled={disabled}
               onChange={onChange}
               onFocus={onFocus}
            />
            <label
               htmlFor='floating_email'
               className='capitalize peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
               {label}
            </label>
         </>
      )

   return (
      <label className='form-control w-full '>
         <div className='label'>
            <span className='label-text capitalize'>{label}</span>
         </div>
         <input
            type={type}
            placeholder={placeholder}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            className='input input-bordered w-full '
            onChange={onChange}
            onFocus={onFocus}
         />
         {error && (
            <div className='label '>
               <span className='text-sm text-red-400/80'>{error}</span>
            </div>
         )}
      </label>
   )
}
export default Input
