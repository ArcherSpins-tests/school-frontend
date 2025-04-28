import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'classnames'
import {
  ChevronDown,
  Home,
  Book,
  Users,
  Calendar,
  MessageSquare,
  ClipboardList,
  Info,
  Star,
  User,
  LayoutList,
  BookAudio,
} from 'lucide-react'

interface RouteItem {
  label: string
  path?: string
  icon?: React.ElementType
  children?: { label: string; path: string; icon?: React.ElementType }[]
}

const routes: RouteItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Teachers', path: '/teachers', icon: Book },
  {
    label: 'Students',
    icon: Users,
    children: [
      { label: 'Students', path: '/students', icon: User },
      { label: 'Top Students', path: '/top-students', icon: Star },
    ],
  },
  {
    label: 'Lessons',
    icon: LayoutList,
    children: [
      { label: 'Schedule', path: '/schedule', icon: Calendar },
      { label: 'Classes', path: '/classes', icon: Book },
    ],
  },
  {
    label: 'Chats',
    icon: MessageSquare,
    children: [
      { label: 'Students', path: '/chats', icon: User },
      { label: 'Teachers', path: '/teachers-chats', icon: Book },
    ],
  },
  { label: 'Homeworks', path: '/homeworks', icon: ClipboardList },
  { label: 'Courses', path: '/courses', icon: BookAudio },
  { label: 'About', path: '/about', icon: Info },
]

export const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const location = useLocation()

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const isAnyChildActive = (children: { path: string }[]) =>
    children.some((child) => location.pathname.startsWith(child.path))

  return (
    <div className="h-full max-w-[240px] min-w-[240px] rounded-lg bg-white px-3 py-4 shadow-md">
      <div className="mb-6 pl-3 text-lg font-bold">Logo</div>
      <ul className="flex flex-col gap-2">
        {routes.map((route) => {
          const groupIsActive = route.children && isAnyChildActive(route.children)
          const Icon = route.icon

          return route.children ? (
            <li key={route.label}>
              <button
                onClick={() => toggleGroup(route.label)}
                className={clsx(
                  'flex w-full items-center justify-between rounded-lg px-4 py-2 text-left transition-colors',
                  groupIsActive ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-100'
                )}
              >
                <span className="flex items-center gap-2">
                  {Icon && (
                    <Icon
                      className={clsx(
                        'h-4 w-4 shrink-0',
                        groupIsActive ? 'text-white' : 'text-gray-500'
                      )}
                    />
                  )}
                  {route.label}
                </span>
                <ChevronDown
                  className={clsx(
                    'h-4 w-4 transition-transform',
                    openGroups[route.label] || groupIsActive ? 'rotate-180' : 'rotate-0'
                  )}
                />
              </button>
              <div
                className={clsx(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openGroups[route.label] || groupIsActive
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                )}
              >
                <ul className="mt-1 ml-4 flex flex-col gap-1 border-l border-gray-200 pl-3">
                  {route.children.map((child) => {
                    const ChildIcon = child.icon
                    return (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            clsx(
                              'inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors',
                              isActive
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-blue-800 hover:bg-blue-50'
                            )
                          }
                        >
                          {ChildIcon && (
                            <ChildIcon
                              className={clsx(
                                'h-4 w-4 shrink-0',
                                child.path && location.pathname.startsWith(child.path)
                                  ? 'text-blue-800'
                                  : 'text-gray-400'
                              )}
                            />
                          )}
                          {child.label}
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          ) : (
            <li key={route.path}>
              <NavLink
                to={route.path!}
                className={({ isActive }) =>
                  clsx(
                    'inline-flex w-full items-center gap-2 rounded-lg px-4 py-2 transition-colors',
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-100'
                  )
                }
              >
                {Icon && (
                  <Icon
                    className={clsx(
                      'h-4 w-4 shrink-0',
                      (route.path &&
                        location.pathname.startsWith(route.path) &&
                        route.path !== '/') ||
                        route.path === location.pathname
                        ? 'text-white'
                        : 'text-gray-500'
                    )}
                  />
                )}
                {route.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
