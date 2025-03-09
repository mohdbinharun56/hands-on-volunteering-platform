import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const location = useLocation();

  const hideNav = ["/login", "/register"];
  const showNav = !hideNav.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f1f4]">
      <div className="absolute z-10">
        {
          showNav && <div className="shadow-md min-h-screen bg-violet-300 w-44">
            <Navbar></Navbar>
          </div>
        }
      </div>
      <div className=" mx-auto flex-grow mt-20">
        <Outlet></Outlet>
      </div>
      {
        showNav && <div className="bg-black text-white text-3xl font-bold z-10 text-center">
        <h1>Footer</h1>
      </div>
      }
    </div>
  )
}

export default App
