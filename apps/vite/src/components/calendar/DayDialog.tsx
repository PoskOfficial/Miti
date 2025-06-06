import * as React from "react"

import useMediaQuery from "@/hooks/useMediaQuery"

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { useTranslation } from "react-i18next"

export function DayDialog({
  open,
  setOpen,
  children,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { t } = useTranslation()

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="min-w-[500px] overflow-y-auto text-black dark:text-white">
          <SheetHeader>
            <SheetTitle>{t("modal.Day_Details")}</SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left text-black dark:text-white">
          <DrawerTitle>{t("modal.Day_Details")}</DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
