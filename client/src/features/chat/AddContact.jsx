import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ModalContainer from '../../ui/layout/ModalContainer'
import Input from '../../ui/common/Input'
import Avatar from '../../ui/common/Avatar'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function AddContact() {
   const [openModal, setOpenModal] = useState(false)
   const [search, setSearch] = useState('')
   const [result, setResult] = useState(null)

   useEffect(() => {
      const abortController = new AbortController()
      let timeoutId

      const searchUser = async () => {
         try {
            const result = await api.get(`user/find/${search}`, {
               signal: abortController.signal,
            })
            setResult(result?.data || null)
         } catch (error) {
            if (error.name === 'AbortError') return
            setResult(null)
         }
      }

      const handleSearch = () => {
         clearTimeout(timeoutId)
         timeoutId = setTimeout(() => {
            searchUser()
         }, 1000)
      }

      search && handleSearch()

      return () => {
         abortController.abort()
         clearTimeout(timeoutId)
      }
   }, [search])

   return (
      <>
         <div
            onClick={() => setOpenModal(true)}
            className='bg-base-200 p-2 rounded-md mx-1 text-lg flex justify-center cursor-pointer active:scale-95 active:transition items-center gap-3'
         >
            <FontAwesomeIcon icon={faPlus} />
            <span>add contact</span>
         </div>
         {openModal && (
            <ModalContainer>
               <div className='bg-base-100 p-4 rounded-lg w-96 flex flex-col gap-2 relative'>
                  <span
                     className='absolute right-3 top-3 cursor-pointer'
                     onClick={() => setOpenModal(false)}
                  >
                     <FontAwesomeIcon
                        icon={faXmark}
                        style={{ fontSize: '30px' }}
                     />
                  </span>
                  <p className='text-semibold text-lg text-center'>
                     Add Contact
                  </p>
                  <Input
                     type='text'
                     name='username'
                     placeholder='username'
                     onChange={e => setSearch(e.target.value)}
                  />
                  {!!result && (
                     <Link
                        onClick={() => setOpenModal(false)}
                        to={`/chat/${result.id}`}
                        className='bg-slate-100/10 flex items-center rounded-md overflow-clip'
                     >
                        <div className='flex items-center px-2 py-1 gap-3'>
                           {result.image && (
                              <Avatar image='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
                           )}
                           <div className='text-lg'>{result.name}</div>
                        </div>
                        <button className='self-stretch py-2 px-4 bg-primary/70 ml-auto text-gray-800'>
                           <FontAwesomeIcon
                              icon={faPlus}
                              style={{ fontSize: '30px' }}
                           />
                        </button>
                     </Link>
                  )}
               </div>
            </ModalContainer>
         )}
      </>
   )
}

export default AddContact
