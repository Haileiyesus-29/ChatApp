import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

function About() {
   const [info, setInfo] = useState({})
   const [loading, setLoading] = useState(true)
   const { getInfo } = useOutletContext()
   const { id } = useParams()

   useEffect(() => {
      const loadChatData = async () => {
         const response = await getInfo(id)
         if (response) {
            setInfo(response)
         }
         setLoading(false)
      }
      loadChatData()
   }, [id, getInfo])

   if (loading) return <h1>Loading...</h1>
   return (
      <main className='flex items-center gap-2 bg-zinc-900 p-4 h-full overflow-y-auto'>
         <section className='flex flex-wrap bg-zinc-950 p-4 rounded h-full overflow-y-auto grow'>
            <div className='p-4 basis-1/3'>
               <img
                  src='https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE='
                  alt=''
               />
            </div>
            <div className='p-4 grow'>
               <h1 className='border-zinc-50 text-3xl'>{info.name}</h1>
               <ul className='flex flex-col gap-2 py-4 max-w-screen-sm'>
                  <li className='flex gap-4 bg-zinc-100/10 px-4 py-2 rounded'>
                     <span className='text-semibold basis-32 shrink-0'>
                        Name:
                     </span>
                     <span className='select-text'>{info.name}</span>
                  </li>
                  <li className='flex gap-4 bg-zinc-100/10 px-4 py-2 rounded'>
                     <span className='text-semibold basis-32 shrink-0'>
                        Username:
                     </span>
                     <span className='select-text'>{info.username}</span>
                  </li>

                  {info._count && (
                     <li className='flex gap-4 bg-zinc-100/10 px-4 py-2 rounded'>
                        <span className='text-semibold basis-32 shrink-0'>
                           Members:
                        </span>
                        <span className='select-text'>
                           {info._count?.members}
                        </span>
                     </li>
                  )}
                  {info._count && (
                     <li className='flex gap-4 bg-zinc-100/10 px-4 py-2 rounded'>
                        <span className='text-semibold basis-32 shrink-0'>
                           Total Messages:
                        </span>
                        <span className='select-text'>
                           {info._count?.messages}
                        </span>
                     </li>
                  )}
                  {(info.bio || info.desc) && (
                     <li className='flex gap-4 bg-zinc-100/10 px-4 py-2 rounded'>
                        <span className='text-semibold basis-32 shrink-0'>
                           {info.bio ? 'Bio:' : 'Description:'}
                        </span>
                        <span className='select-text'>
                           {' '}
                           {info.bio || info.desc}{' '}
                        </span>
                     </li>
                  )}
               </ul>
            </div>
            {/* <div className='bg-zinc-100/10 p-4 border'>
               <h2 className='text-xl'>About</h2>
               <p className='py-4'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  quae, voluptates, doloribus, quas quidem doloremque
                  necessitatibus et quia nemo consequuntur fugit. Quisquam
                  dolorum, voluptatem voluptate quidem cumque doloribus
                  aspernatur.
               </p>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  quae, voluptates, doloribus, quas quidem doloremque
                  necessitatibus et quia nemo consequuntur fugit. Quisquam
                  dolorum, voluptatem voluptate quidem cumque doloribus
                  aspernatur.
               </p>
            </div> */}
         </section>
      </main>
   )
}
export default About
