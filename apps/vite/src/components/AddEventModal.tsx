import { ReactNode, useEffect, useState } from "react"
import colors from "../constants/colors"
import NepaliDatePicker from "./NepaliDatePicker"
import { useQueryClient } from "@tanstack/react-query"
import { CalendarEvent } from "@miti/types"
import { apiBaseUrl } from "../helper/api"
import DropDown from "./DropDown"
import Spinner from "./Spinner"
import { useCalendarList } from "@miti/query/calendar"
import { useCreateEvent } from "@miti/query/event"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useMediaQuery from "@/hooks/useMediaQuery"
import { Calendar, MapIcon, Pencil, SwatchBook, Text } from "lucide-react"

function getCombinedDateTime(date: Date, time: string) {
  const timeParts = time.split(":")
  date.setHours(parseInt(timeParts[0] ?? "", 10))
  date.setMinutes(parseInt(timeParts[1] ?? "", 10))
  return date.toISOString()
}

export type CalendarPayload = Partial<CalendarEvent> & { calendarId: string }

function AddEventModal({
  startDate,
  children,
}: {
  startDate: Date
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [isAllDayEvent, setIsAllDayEvent] = useState(false)
  const [eventStartDate, setEventStartDate] = useState(startDate)
  const [eventEndDate, setEventEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
  )
  const [selectedCalendar, setSelectedCalendar] = useState<string | number>("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries(["events"])
    setOpen(false)
  }

  const { mutateAsync, isPending } = useCreateEvent(apiBaseUrl, handleSuccess)

  const { data: calendarList, isLoading: isCalendarListLoading } =
    useCalendarList(apiBaseUrl)

  useEffect(() => {
    if (!calendarList) return
    setSelectedCalendar(calendarList[0]?.value || "")
  }, [calendarList])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const startEndDates = isAllDayEvent
      ? {
          start: {
            date: new Date(eventStartDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
          end: {
            date: new Date(eventEndDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
        }
      : {
          start: {
            dateTime: getCombinedDateTime(
              startDate,
              e.currentTarget.startTime.value
            ),
          },
          end: {
            dateTime: getCombinedDateTime(
              eventEndDate,
              e.currentTarget.endTime.value
            ),
          },
        }

    const eventData = {
      ...startEndDates,
      summary: e.currentTarget.summary.value,
      location: e.currentTarget.location.value,
      description: e.currentTarget.description.value,
      colorId: e.currentTarget.colorId.value || null,
      calendarId: `${selectedCalendar}` || "personal",
    }
    await mutateAsync(eventData)
  }

  const EventForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 px-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="all-day" className="font-medium">
            All day event
          </Label>
          <Switch
            id="all-day"
            checked={isAllDayEvent}
            onCheckedChange={() => {
              setIsAllDayEvent(!isAllDayEvent)
              setEventStartDate(new Date(eventStartDate))
              setEventEndDate(new Date(eventEndDate))
            }}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label className="font-medium">From</Label>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <NepaliDatePicker
                  setDate={setEventStartDate}
                  date={eventStartDate}
                />
              </div>
              {!isAllDayEvent && (
                <input
                  required
                  type="time"
                  name="startTime"
                  className="w-24 border p-1.5 rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label className="font-medium">To</Label>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <NepaliDatePicker
                  setDate={setEventEndDate}
                  date={eventEndDate}
                />
              </div>
              {!isAllDayEvent && (
                <input
                  required
                  type="time"
                  name="endTime"
                  className="w-24 border p-1.5 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </Label>
          {!isCalendarListLoading ? (
            <DropDown
              items={calendarList}
              selected={selectedCalendar}
              setSelected={setSelectedCalendar}
              className="w-full"
            />
          ) : (
            <Spinner />
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="summary"
            className="font-medium flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Summary
          </Label>
          <Input
            id="summary"
            name="summary"
            placeholder="Add event title"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="font-medium flex items-center gap-2"
          >
            <MapIcon className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="Add location"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="font-medium flex items-center gap-2"
          >
            <Text className="h-4 w-4" />
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Add description"
            className="w-full resize-none min-h-24"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium flex items-center gap-2">
            <SwatchBook className="h-4 w-4" />
            Color
          </Label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(colors).map((color, idx) => (
              <div key={idx} className="relative">
                <input
                  type="radio"
                  id={`color-${color}`}
                  name="colorId"
                  value={color}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`color-${color}`}
                  style={{ backgroundColor: colors[color] }}
                  className="block h-8 w-8 rounded-full border-2 border-transparent cursor-pointer transition-all duration-200 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-indigo-600"
                ></label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-800"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  )

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="h-[90vh] rounded-t-xl border-0">
          <DrawerHeader className="text-left">
            <DrawerTitle>Create Event</DrawerTitle>
          </DrawerHeader>
          <div className="py-6 overflow-y-auto max-h-[calc(90vh-60px)]">
            <EventForm />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <DialogTitle className="text-xl font-semibold">
            Create Event
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-60px)]">
          <EventForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventModal
