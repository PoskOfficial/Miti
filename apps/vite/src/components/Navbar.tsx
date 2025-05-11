import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUser } from "@miti/query/user"
import InstallPWA from "./InstallBtn"
import UserSettings from "./UserSettings"
import { cn } from "@/lib/utils"
import { apiBaseUrl } from "../helper/api"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Navbar() {
  const navigation = [
    { name: "navbar.Home", href: "/" },
    { name: "navbar.Events", href: "/events" },
    { name: "navbar.Date_Converter", href: "/converter" },
    { name: "navbar.About", href: "/about" },
  ]

  const location = useLocation()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { data, status } = useUser(apiBaseUrl)

  console.log({ data })

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="secondary" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="flex items-center px-4">
                  <img
                    src="/icons/icon-512x512.png"
                    alt="Miti"
                    className="h-8 w-auto mr-2"
                  />
                </Link>
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center py-3 px-4 rounded-md text-sm font-medium dark:text-accent-foreground transition-colors",
                          item.href === location.pathname
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {t(item.name)}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <InstallPWA>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm font-medium px-4"
                      >
                        Install
                      </Button>
                    </InstallPWA>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/icons/icon-512x512.png"
              alt="Miti"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors text-accent-foreground",
                item.href === location.pathname
                  ? "bg-accent"
                  : "text-muted-foreground hover:bg-accent "
              )}
              aria-current={
                item.href === location.pathname ? "page" : undefined
              }
            >
              {t(item.name)}
            </Link>
          ))}
          <InstallPWA>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-2 text-sm font-medium"
            >
              Install
            </Button>
          </InstallPWA>
        </nav>

        <div className="flex items-center gap-2">
          <UserSettings status={status} userData={data} />
        </div>
      </div>
    </header>
  )
}
