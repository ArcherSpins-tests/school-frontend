import { useState } from 'react'

interface SelectProps {
  fieldClassName?: string
}

export const Select = ({ fieldClassName }: SelectProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={fieldClassName}>
      <div className="relative">
        <button
          onClick={() => setOpen(!isOpen)}
          type="button"
          className="grid w-full cursor-default grid-cols-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">Tom Cook</span>
          </span>
          <svg
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        {isOpen ? (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            <li
              className="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
              id="listbox-option-0"
              role="option"
            >
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-5 shrink-0 rounded-full"
                />

                <span className="ml-3 block truncate font-normal">Wade Cooper</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  )
}
