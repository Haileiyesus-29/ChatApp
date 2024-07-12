import {createBrowserRouter} from "react-router-dom"
import Container from "@/ui/Container"
import ChatList from "@/ui/ChatList"
import Messages from "@/ui/Messages"
import CreateForm from "@/ui/CreateForm"
import Create from "@/ui/Create"
import CreateChoose from "@/components/CreateChoose"
import Profile from "@/ui/Profile"
import About from "@/ui/About"
import Home from "@/pages/Home"
import Chat from "@/pages/Chat"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Group from "@/pages/Group"
import Channel from "@/pages/Channel"
import Setting from "@/pages/Setting"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <ChatList />,
          },
          {
            path: ":id",
            element: <Messages />,
          },
          {
            path: "about/:id",
            element: <About />,
          },
        ],
      },
      {
        path: "/chat",
        element: <Chat />,
        children: [
          {
            index: true,
            element: <ChatList />,
          },
          {
            path: ":id",
            element: <Messages />,
          },
          {
            path: "about/:id",
            element: <About />,
          },
        ],
      },
      {
        path: "/group",
        element: <Group />,
        children: [
          {
            index: true,
            element: <ChatList />,
          },
          {
            path: ":id",
            element: <Messages />,
          },
          {
            path: "about/:id",
            element: <About />,
          },
        ],
      },
      {
        path: "/channel",
        element: <Channel />,
        children: [
          {
            index: true,
            element: <ChatList />,
          },
          {
            path: ":id",
            element: <Messages />,
          },
          {
            path: "about/:id",
            element: <About />,
          },
        ],
      },
      {
        path: "/new",
        element: <Create />,
        children: [
          {
            index: true,
            element: <CreateChoose />,
          },
          {
            path: "channel",
            element: <CreateForm />,
          },
          {
            path: "group",
            element: <CreateForm />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
])

export default routes
