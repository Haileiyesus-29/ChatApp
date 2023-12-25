import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Search() {
   return (
      <div className='relative mx-2'>
         <span className='absolute left-2 top-3 '>
            <FontAwesomeIcon
               icon={faMagnifyingGlass}
               style={{ fontSize: '1.5rem', color: '#cdcdcd99' }}
            />
         </span>
         <input className='dark:bg-neutral-content/10 w-full input input-md pl-10 text-xl' />
      </div>
   )
}
export default Search
