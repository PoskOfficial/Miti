import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

type QueryProviderProps = {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
