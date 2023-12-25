/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Icon({ icon, bg = true, size = 1, width = 12, onClick }) {
   return (
      <span
         onClick={() => onClick?.()}
         className={`
         ${bg && 'dark:bg-neutral-content/10'}
         ${`w-${width}`}
          aspect-square  rounded-lg inline-flex items-center justify-center`}
      >
         <FontAwesomeIcon icon={icon} style={{ fontSize: `${size}rem` }} />
      </span>
   )
}

export default Icon
