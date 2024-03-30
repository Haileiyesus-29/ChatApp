import { Outlet } from 'react-router-dom'

function Home() {
   return <Outlet context={{ count: 9 }} />
}
export default Home
