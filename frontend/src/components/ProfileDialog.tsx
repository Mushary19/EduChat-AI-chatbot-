import { BookUser, Mail, User, X } from "lucide-react"
import * as React from "react"
import type { IUser } from "../lib/types/user"

interface Props {
  open: boolean
  onClose: VoidFunction
  user: IUser
}

const ProfileDialog: React.FC<Props> = ({ open, onClose, user }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 md:p-8 text-gray-800 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-700">User Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p className="text-lg font-semibold text-gray-700">
                {user.first_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <BookUser className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p className="text-lg font-semibold text-gray-700">
                {user.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-700 break-all">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDialog
