import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto flex-grow flex justify-center items-center">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
