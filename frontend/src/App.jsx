import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const location = useLocation();

  const hideNav = ["/login", "/register","/"];
  const showNav = !hideNav.includes(location.pathname);
  const hideFooter = ['/login','/register'];
  const showFooter = !hideFooter.includes(location.pathname)
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f1f4]">
      <div className="lg:w-1/6 lg:absolute z-10">
        {
          showNav && <div className="shadow-md lg:min-h-screen bg-violet-300 p-2">
            <Navbar></Navbar>
          </div>
        }
      </div>
      <div className="w-[100%] mx-auto flex-grow">
        <Outlet></Outlet>
      </div>
      {
        showFooter && <div className="p-10 mt-10 bg-black text-white text-3xl font-bold z-10 text-center">
        <h1>Footer</h1>
      </div>
      }
    </div>
  )
}

export default App
