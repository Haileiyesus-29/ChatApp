import {useEffect, useState} from "react"
import {useOutletContext, useParams} from "react-router-dom"
import Loader from "./Loader"

function About() {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const {getInfo} = useOutletContext()
  const {id} = useParams()

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

  if (loading) return <Loader />
  return (
    <main className="flex items-center gap-2 bg-zinc-900 p-2 h-full overflow-y-auto">
      <section className="flex md:flex-row flex-col bg-zinc-950 rounded h-full overflow-y-auto grow">
        <div className="p-4 max-w-xs basis-1/3">
          <img src={info.image || "default_profile.jpg"} alt={info.name} />
        </div>
        <div className="p-4 grow">
          <h1 className="border-zinc-50 text-3xl">{info.name}</h1>
          <ul className="flex flex-col gap-2 py-4 max-w-screen-sm">
            <li className="flex gap-4 bg-zinc-100/10 px-4 py-2 rounded">
              <span className="text-semibold basis-20 shrink-0">Name:</span>
              <span className="select-text">{info.name}</span>
            </li>
            <li className="flex gap-4 bg-zinc-100/10 px-4 py-2 rounded">
              <span className="text-semibold basis-20 shrink-0">Username:</span>
              <span className="select-text">{info.username}</span>
            </li>

            {info._count && (
              <li className="flex gap-4 bg-zinc-100/10 px-4 py-2 rounded">
                <span className="text-semibold basis-20 shrink-0">Members:</span>
                <span className="select-text">{info._count?.members}</span>
              </li>
            )}
            {info._count && (
              <li className="flex gap-4 bg-zinc-100/10 px-4 py-2 rounded">
                <span className="text-semibold basis-20 shrink-0">Total Messages:</span>
                <span className="select-text">{info._count?.messages}</span>
              </li>
            )}
            {(info.bio || info.desc) && (
              <li className="flex gap-4 bg-zinc-100/10 px-4 py-2 rounded">
                <span className="text-semibold basis-20 shrink-0">
                  {info.bio ? "Bio:" : "Description:"}
                </span>
                <span className="select-text">{info.bio || info.desc} </span>
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}
export default About
