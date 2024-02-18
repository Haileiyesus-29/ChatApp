import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalContainer from '../../ui/layout/ModalContainer'
import Input from '../../ui/common/Input'
import Avatar from '../../ui/common/Avatar'
import Button from '../../ui/common/Button'
import groupContext from './groupContext'
import api from '../../services/api'

function CreateGroup() {
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(false)
   const [form, setForm] = useState({ name: '', username: '' })
   const [action, setAction] = useState('search')
   const [search, setSearch] = useState('')
   const [result, setResult] = useState(null)
   const navigate = useNavigate()

   const { createGroup } = useContext(groupContext)

   const handleSubmit = () => {
      if (!form.name) return
      try {
         setLoading(true)
         createGroup(form)
         setOpenModal(false)
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const join = async id => {
      try {
         await api.post('group/join', { groupId: id })
         setOpenModal(false)
         navigate(`/group/${id}`)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      const abortController = new AbortController()
      let timeoutId

      const searchUser = async () => {
         try {
            const result = await api.get(`group/find/${search}`, {
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
            <span>New Group</span>
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
                  <div className='join'>
                     <input
                        className='join-item btn'
                        type='radio'
                        name='options'
                        aria-label='Search group'
                        defaultChecked
                        onChange={() => setAction('search')}
                     />
                     <input
                        className='join-item btn'
                        type='radio'
                        name='options'
                        aria-label='Create new group'
                        onChange={() => setAction('create')}
                     />
                  </div>
                  {action === 'create' && (
                     <div className='flex flex-col gap-2'>
                        <Input
                           type='text'
                           placeholder='Group name'
                           name='name'
                           onChange={e =>
                              setForm(prev => ({
                                 ...prev,
                                 name: e.target.value,
                              }))
                           }
                        />
                        <Input
                           type='text'
                           placeholder='Username'
                           name='username'
                           onChange={e =>
                              setForm(prev => ({
                                 ...prev,
                                 username: e.target.value,
                              }))
                           }
                        />
                        <div className='flex items-center gap-2'>
                           <input
                              type='file'
                              className='file-input file-input-bordered file-input-md w-full'
                           />
                           <p className='text-lg'>Image</p>
                        </div>
                        <Button
                           label={loading ? 'loading...' : 'Create Group'}
                           onClick={handleSubmit}
                        />
                     </div>
                  )}
                  {action === 'search' && (
                     <div className='flex flex-col gap-2'>
                        <Input
                           type='text'
                           placeholder='Username'
                           name='username'
                           onChange={e => setSearch(e.target.value)}
                        />
                        {result && (
                           <div
                              onClick={() => join(result.id)}
                              // to={`/group/${result.id}`}
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
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </ModalContainer>
         )}
      </>
   )
}
export default CreateGroup
