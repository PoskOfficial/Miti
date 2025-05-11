import { useContext } from "react"
import { DarkModeContext } from "./DarkModeProvider"
import { useTranslation } from "react-i18next"
import { apiBaseUrl } from "../helper/api"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, LogOut, Settings } from "lucide-react"

const UserSettings = ({
  userData,
  status,
}: {
  userData?: any
  status: "LOGGED_IN" | "NOT_LOGGED_IN" | "OFFLINE"
}) => {
  const { t, i18n } = useTranslation()
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext)

  const isLoggedIn = status === "LOGGED_IN"
  const isOffline = status === "OFFLINE"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 p-0 border-2"
        >
          {isLoggedIn ? (
            <Avatar className="h-full w-full">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={
                  userData?.profilePictureUrl ??
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="User"
              />
              <AvatarFallback>
                {userData?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Settings className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {!isOffline && (
          <>
            <DropdownMenuItem asChild className="p-0">
              <a
                href={
                  isLoggedIn
                    ? `${apiBaseUrl}/auth/logout`
                    : `${apiBaseUrl}/auth/google?redirect=${window.location.origin}`
                }
                target="_self"
                className="cursor-pointer"
              >
                {isLoggedIn ? (
                  <div className="p-2 flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("navbar.Sign_out")}</span>
                  </div>
                ) : (
                  <img
                    src={
                      darkMode
                        ? "/icons/btn_google_signin_dark_normal_web@2x.png"
                        : "/icons/btn_google_signin_light_normal_web@2x.png"
                    }
                    className="!p-0"
                    alt="Google"
                  />
                )}
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ne" : "en")
          }
        >
          <img
            src={i18n.language === "en" ? "/icons/np.png" : "/icons/en.png"}
            alt={i18n.language === "en" ? "Nepali" : "English"}
            className="mr-2 h-4 "
          />
          <span>{i18n.language === "en" ? "नेपाली" : "English"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light mode</span>
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark mode</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserSettings
