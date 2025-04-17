import { Plus, User } from "lucide-react"
import AddEventModal from "../AddEventModal"

const UserEvents = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center  gap-2">
          <span className="text-orange-600">
            <User />
          </span>

          <h3 className="text-lg font-bold text-gray-800">User Events</h3>
        </div>
        <div>
          <AddEventModal startDate={new Date()}>
            <button className="bg-orange-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
              <Plus className="text-white text-sm" />
              Create Event
            </button>
          </AddEventModal>
        </div>
      </div>
    </div>
  )
}

export default UserEvents
