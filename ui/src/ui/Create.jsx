import {Link, Outlet, useLocation} from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function Create() {
  const {pathname} = useLocation()
  const path = pathname.split("/").slice(-1).toString()

  return (
    <main className="flex flex-col bg-zinc-900">
      <Breadcrumb className="px-10 py-4">
        <BreadcrumbList>
          <Link to="/new">New</Link>
          <BreadcrumbSeparator />
          {(path === "channel" || path === "group") && (
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <Outlet context={{type: path}} />
    </main>
  )
}
export default Create
