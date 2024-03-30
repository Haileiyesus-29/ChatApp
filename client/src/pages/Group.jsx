import { Outlet } from 'react-router-dom'

function Group() {
   return <Outlet context={{ count: 7 }} />
}
export default Group
