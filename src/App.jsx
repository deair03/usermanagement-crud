import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Error from "./components/Error";
import UserManagement from "./components/UserManagement";

function AppLayout() {
  return(<>
  <Outlet />
  </>)
} 

function App(){
  return  <RouterProvider router={appRouter}/>
  }

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children:[
      {
        path:"/",
        element:<Body />
      },
      {
        path:"/usermanagement",
        element: <UserManagement />
      
      }
    ]
  }
])



export default App;
