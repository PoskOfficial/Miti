import {
  Plus,
  User,
  Clock,
  MapPin,
  Users,
  Eye,
  Repeat,
  CalendarDays,
  FileText,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"
import AddEventModal from "../AddEventModal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUserEvents, deleteEvent } from "@/helper/api"
import { CalendarEvent } from "@miti/types"
import { add, startOfDay } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getEventColorInTwClasses } from "@/constants/colors"
import { useTranslation } from "react-i18next"

const UserEvents = ({ selectedDate }: { selectedDate: string }) => {
  console.log({ selectedDate })
  const baseDate = new Date(selectedDate)
  const { t } = useTranslation()

  const timeMin = startOfDay(baseDate).toISOString()
  const timeMax = add(baseDate, { days: 1 }).toISOString()

  const { data: dayUserEvents } = useQuery<{ events: CalendarEvent[] }>({
    queryKey: ["userEvents", selectedDate],
    queryFn: () => fetchUserEvents(timeMin, timeMax),
    enabled: !!selectedDate,
  })

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-indigo-600 dark:text-indigo-400">
            <User />
          </span>

          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {t("modal.User_Events")}
          </h3>
        </div>
        <div>
          <AddEventModal startDate={baseDate}>
            <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors text-white px-3 py-2 rounded-md flex items-center gap-1 text-xs shadow-sm">
              <Plus className="text-white text-sm" />
              Create Event
            </button>
          </AddEventModal>
        </div>
      </div>

      <div className="space-y-3">
        {dayUserEvents?.events && dayUserEvents.events.length > 0 ? (
          dayUserEvents.events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No events scheduled
          </p>
        )}
      </div>
    </div>
  )
}

const EventListItem = ({ event }: { event: CalendarEvent }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userEvents"] })
    },
  })

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate()
    setShowDeleteConfirmation(false)
  }

  const formatTime = (dateTimeString?: string, dateString?: string) => {
    if (dateTimeString) {
      const date = new Date(dateTimeString)
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (dateString) {
      return "All day"
    }
    return ""
  }

  const startTime = formatTime(event.start.dateTime, event.start.date)
  const endTime = formatTime(event.end.dateTime, event.end.date)

  const colorStyle = getEventColorInTwClasses(event.colorId)

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={event.id}
          className={`rounded-lg overflow-hidden shadow-sm ${colorStyle.border} border dark:border-opacity-20`}
        >
          <AccordionTrigger
            className={`p-3 hover:bg-opacity-80 transition-colors ${colorStyle.bg} dark:bg-opacity-20 !no-underline`}
          >
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 w-[320px] ">
                <h4
                  className={`font-medium text-sm ${colorStyle.text} dark:text-opacity-90 w-full truncate`}
                >
                  {event.summary}
                </h4>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1.5 gap-2 overflow-hidden">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Clock size={12} className="flex-shrink-0" />
                  <span>
                    {startTime}
                    {startTime !== "All day" ? ` - ${endTime}` : ""}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-4">
            {event.description && (
              <div className="mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <FileText
                    size={14}
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </span>
                </div>

                <div
                  className="text-sm text-gray-700 dark:text-gray-300 pl-6 break-words [&>a]:text-indigo-400 dark:[&>a]:text-indigo-300"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                ></div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {event.calendarId && (
                <div className="flex items-start gap-2">
                  <CalendarDays
                    size={14}
                    className="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Calendar
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                      {event.calendarId}
                    </p>
                  </div>
                </div>
              )}
              {event.location && (
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Location
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                      {event.location}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Users
                  size={14}
                  className="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Organizer
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                    {event.organizer.displayName || event.organizer.email}
                  </p>
                </div>
              </div>

              {event.visibility && (
                <div className="flex items-start gap-2">
                  <Eye
                    size={14}
                    className="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Visibility
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {event.visibility}
                    </p>
                  </div>
                </div>
              )}

              {event.recurrence && (
                <div className="flex items-start gap-2">
                  <Repeat
                    size={14}
                    className="mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                      Recurrence
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Recurring event
                    </p>
                  </div>
                </div>
              )}

              {(event.accessRole === "owner" ||
                event.accessRole === "writer") && (
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleDeleteClick}
                    variant="destructive"
                    className="flex items-center gap-2 text-sm"
                    size="sm"
                  >
                    <Trash2 size={16} />
                    Delete Event
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <AlertCircle className="text-red-500" size={20} />
              Delete Event
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete "
              <span className="font-medium">{event.summary}</span>"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserEvents
