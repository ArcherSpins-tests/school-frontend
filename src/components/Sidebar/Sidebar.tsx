import { NavLink } from 'react-router-dom'
import clsx from 'classnames'

export const Sidebar = () => {
  return (
    <div className="h-full max-w-[240px] min-w-[240px] rounded-lg bg-white px-3 py-4 shadow-md">
      <div className="mb-6 pl-3 text-lg font-bold">Logo</div>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/students"
          >
            Students
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/teachers"
          >
            Teachers
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/schedule"
          >
            Schedule
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/chats"
          >
            Chats
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/classes"
          >
            Classes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'inline-block w-full rounded-lg px-4 py-2',
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )
            }
            to="/top-students"
          >
            Top Students
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
