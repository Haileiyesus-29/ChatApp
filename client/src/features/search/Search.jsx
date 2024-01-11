import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Search() {
   return (
      <div className='relative mx-2'>
         <span className='absolute left-2 top-2 '>
            <FontAwesomeIcon
               icon={faMagnifyingGlass}
               style={{ fontSize: '1rem', color: '#cdcdcd99' }}
            />
         </span>
         <input className='dark:bg-gray-700/30 w-full py-2 rounded-md pl-10 focus:outline-gray-700 focus:outline-offset-1 focus:outline-double focus:outline-2' />
      </div>
   )
}
export default Search
