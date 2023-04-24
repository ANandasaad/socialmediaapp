import { BrowserRouter } from "react-router-dom"
import AppContext from "./compontent/AppContext/AppContext"
import Layout from "./compontent/Layout"



function App() {
  

  return (
    <>
      <BrowserRouter>
      <AppContext>
        <Layout/>
      </AppContext>
      </BrowserRouter>
    </>
  )
}

export default App
