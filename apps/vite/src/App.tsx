import "./i18next"
import { Toaster } from "react-hot-toast"
import { DarkModeProvider } from "./components/DarkModeProvider"
import { QueryProvider } from "@miti/query/provider"
import { BrowserRouter } from "react-router-dom"
import Body from "./Body"
import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider client={queryClient}>
        <DarkModeProvider>
          <Body />
          <Toaster position="bottom-center" />
        </DarkModeProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}

export default App
