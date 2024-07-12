import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {ENDPOINT} from "@/endpoints"
import api from "@/services/api"
import useAuth from "@/store/useAuth"
import Search from "@/ui/Search"
import {useQueryClient} from "@tanstack/react-query"
import {useEffect, useState} from "react"

function Header() {
  const {account} = useAuth(state => state)
  const [searchInput, setSearchInput] = useState("")
  const queryClient = useQueryClient()

  const [searchResults, setSearchResults] = useState({
    users: [],
    groups: [],
    channels: [],
  })

  useEffect(() => {
    const fetchResults = async () => {
      await queryClient.prefetchQuery({
        queryKey: ["search", searchInput],
        queryFn: async () => {
          const res = await api.get(ENDPOINT.SEARCH(searchInput))
          setSearchResults(res.data)
          return res.data
        },
        staleTime: 1000 * 60 * 5,
      })
    }

    const timer = setTimeout(() => {
      if (searchInput) {
        fetchResults()
      } else {
        setSearchResults({users: [], groups: [], channels: []})
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput, queryClient])

  return (
    <header className="relative flex justify-between items-center gap-2 col-span-full px-3 py-2">
      <h1 className="flex items-center gap-2 rounded-md font shrink-0 text">
        <Avatar className="w-10 h-10">
          <AvatarImage src={account.image} alt={account.name} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        <p className="md:block hidden">{account.name}</p>
      </h1>
      <Input
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder="Search"
        className="focus-visible:outline-none order-1 focus:border-2 focus:border-zinc-500 mx-auto px-6 rounded-full max-w-80"
      />
      {searchInput && (
        <div className="top-full left-1/2 z-20 absolute w-11/12 max-w-md h-[90svh] transition-all -translate-x-1/2 md:-translate-x-28">
          <Search
            searchResults={searchResults}
            loading={queryClient.isFetching}
            setSearchInput={setSearchInput}
          />
        </div>
      )}
    </header>
  )
}
export default Header
