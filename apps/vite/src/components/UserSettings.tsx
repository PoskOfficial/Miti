import { Fragment, useContext } from "react"
import { DarkModeContext } from "./DarkModeProvider"
import { useTranslation } from "react-i18next"
import { apiBaseUrl } from "../helper/api"
import { cn } from "@/lib/utils"

// Import shadcn/ui components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Moon, Sun, LogOut } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function LoginWithGoogle({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <img
        src={
          darkMode
            ? "/icons/btn_google_signin_dark_normal_web@2x.png"
            : "/icons/btn_google_signin_light_normal_web@2x.png"
        }
        alt="Sign in with Google"
        className="h-8"
      />
    </div>
  )
}

const UserSettings = ({
  photoUrl,
  status,
}: {
  photoUrl?: string | null
  status: string
}) => {
  const { t, i18n } = useTranslation()
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext)

  const isLoggedIn = status === "LOGGED_IN"
  const isOffline = status === "OFFLINE"
  console.log({ photoUrl })
  return (
    <TooltipProvider>
      <DropdownMenu>
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <div className="relative">
              <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={
                    photoUrl ??
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Badge
                className={cn(
                  "absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full p-0",
                  isLoggedIn ? "bg-green-500" : "bg-orange-500"
                )}
              />
            </div>
          )}

          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end" className="w-40">
          {!isOffline && (
            <>
              <DropdownMenuItem className="p-0" asChild>
                <a
                  href={
                    isLoggedIn
                      ? `${apiBaseUrl}/auth/logout`
                      : `${apiBaseUrl}/auth/google?redirect=${window.location.origin}`
                  }
                  target="_self"
                  className="flex w-full cursor-pointer items-center"
                >
                  {isLoggedIn ? (
                    <div className="p-2 flex items-center gap-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        {t("navbar.Sign_out")}
                      </span>
                    </div>
                  ) : (
                    <LoginWithGoogle darkMode={darkMode} />
                  )}
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={() =>
                    i18n.changeLanguage(i18n.language === "en" ? "ne" : "en")
                  }
                >
                  <img
                    src={
                      i18n.language === "en" ? "/icons/np.png" : "/icons/en.png"
                    }
                    alt={i18n.language === "en" ? "Nepali" : "English"}
                    className="h-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {i18n.language === "en"
                    ? "Switch to Nepali"
                    : "Switch to English"}
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{darkMode ? "Light mode" : "Dark mode"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export default UserSettings
