import { keepPreviousData, useQuery } from "@tanstack/react-query"
import useNavigatorOnLine from "./useNavigatorOnline"

export const useUser = (apiBaseUrl: string) => {
  const network = useNavigatorOnLine()
  const { data: user } = useQuery({
    queryKey: ["user", network],
    queryFn: () => checkIfUserIsLoggedInOrOffline(apiBaseUrl),
    initialData: { status: "OFFLINE" },
    _defaulted: true,
    networkMode: "offlineFirst",
    placeholderData: keepPreviousData,
  })
  return user
}

export async function checkIfUserIsLoggedInOrOffline(
  apiBaseUrl: string
): Promise<{
  status: "LOGGED_IN" | "NOT_LOGGED_IN" | "OFFLINE"
  data?: any
}> {
  const res = await fetch(`${apiBaseUrl}/user/profile`, {
    credentials: "include",
  })

  if (res.status === 200) {
    const data = await res.json()
    return { status: "LOGGED_IN", data }
  }
  if (res.status === 401) {
    return { status: "NOT_LOGGED_IN" }
  }
  return { status: "OFFLINE" }
}
