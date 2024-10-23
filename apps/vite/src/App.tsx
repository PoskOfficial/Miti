import "./i18next"
import { Toaster } from "react-hot-toast"
import { DarkModeProvider } from "./components/DarkModeProvider"
import { QueryProvider } from "@miti/query/provider"

import { BrowserRouter } from "react-router-dom"
import Body from "./Body"

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <DarkModeProvider>
          <Body />
          <Toaster position="bottom-center" />
        </DarkModeProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}

export default App
