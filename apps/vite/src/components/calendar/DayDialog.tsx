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

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto min-w-[500px]">
          <SheetHeader>
            <SheetTitle>आजको विवरण</SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>आजको विवरण</DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
