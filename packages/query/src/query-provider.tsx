import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { memo } from "react"

const queryClient = new QueryClient()

type QueryProviderProps = {
  children: React.ReactNode
}

type QueryProviderExtendedProps = QueryProviderProps & {
  client?: QueryClient
}

export const QueryProvider = memo(
  ({ children, client = queryClient }: QueryProviderExtendedProps) => {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
)
