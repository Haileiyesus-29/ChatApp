import { Outlet } from 'react-router-dom'

function Channel() {
   return <Outlet context={{ count: 3 }} />
}
export default Channel
