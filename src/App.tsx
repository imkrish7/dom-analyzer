import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./Components/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const routes = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />
  }
])


function App() {

  return <>
    <RouterProvider router={routes} />
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
}

export default App
