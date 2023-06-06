import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  GlobeAltIcon,
  BookmarkSquareIcon,
  FilmIcon,
  CakeIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleLeftEllipsisIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import ActiveLink from './ActiveLink'
import { getContentByField, getStringBeforeCharacter } from '@lib/string'

const SIDEBAR = [
  [
    {
      icon: <GlobeAltIcon className="h-6 w-6" />,
      label: 'English',
    },
    {
      icon: <BookmarkSquareIcon className="h-6 w-6" />,
      label: 'Dictionary',
      href: '/cp/english/dictionary',
    },
    {
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      label: 'Topic',
      href: '/cp/english/topic',
    },
    {
      icon: <FilmIcon className="h-6 w-6" />,
      label: 'Youglish',
      href: '/cp/english/youglish',
    },
    {
      icon: <SpeakerWaveIcon className="h-6 w-6" />,
      label: 'Pronunciation',
      href: '/cp/english/pronunciation',
    },
    {
      icon: <DocumentMagnifyingGlassIcon className="h-6 w-6" />,
      label: 'Sentence',
      href: '/cp/english/sentence',
    },
  ],
  [
    {
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      label: 'Communication',
    },
    {
      icon: <UserIcon className="h-6 w-6" />,
      label: 'Body Language',
      href: '/cp/communication/body-language',
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      label: 'Improvisation',
      href: '/cp/communication/improvisation',
    },
  ],
  {
    icon: <CakeIcon className="h-6 w-6" />,
    label: 'Receipts',
    href: '/cp/receipts',
  },
  {
    icon: <PhotoIcon className="h-6 w-6" />,
    label: 'Fashion',
    href: '/cp/fashion',
  },
]

function ActiveLinkEl({ href, icon, label }) {
  return (
    <ActiveLink activeClassName="bg-gray-200" href={href}>
      <p className="flex cursor-pointer items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-300">
        {icon}
        {label}
      </p>
    </ActiveLink>
  )
}

function handleDropdown(e) {
  const target = e.target.closest('div')
  handleDropDownList(target)
}

function handleDropDownList(target) {
  const dropdownList = target.parentElement.querySelector(
    `#${target.dataset.label}`
  )
  const chevronUpIcon = target.querySelector('.up')
  const chevronDownIcon = target.querySelector('.down')

  dropdownList.classList.toggle('hidden')
  chevronDownIcon.classList.toggle('hidden')
  chevronUpIcon.classList.toggle('hidden')
}

function SidebarGroup(sidebar) {
  return (
    <>
      <div
        className="flex w-full items-center justify-center rounded-lg p-3 leading-6 hover:bg-gray-300"
        data-label={sidebar[0].label.toLowerCase()}
        onClick={handleDropdown}
      >
        {sidebar[0].icon}
        <span className="mx-2 text-gray-900">{sidebar[0].label}</span>
        <ChevronDownIcon className="down h-4 w-4" />
        <ChevronUpIcon className="up hidden h-4 w-4" />
      </div>
      <div className="mt-2 hidden" id={sidebar[0].label.toLowerCase()}>
        {sidebar.map((value, i) =>
          i !== 0 ? (
            <ActiveLinkEl
              key={value.label}
              href={value.href}
              label={value.label}
              icon={value.icon}
            />
          ) : null
        )}
      </div>
    </>
  )
}

function SideBarList(sidebar) {
  if (Array.isArray(sidebar)) {
    return (
      <div
        className="-mx-3 flex cursor-pointer flex-col text-sm font-medium"
        key={sidebar}
      >
        {SidebarGroup(sidebar)}
      </div>
    )
  }

  return (
    <ActiveLinkEl
      key={sidebar.label}
      href={sidebar.href}
      label={sidebar.label}
      icon={sidebar.icon}
    />
  )
}

export default function Sidebar() {
  const { pathname, push } = useRouter()
  const sidebarRef = useRef()

  useEffect(() => {
    let label = getContentByField(pathname, '/cp/', '/')
    if (label.includes('/')) {
      label = getStringBeforeCharacter(label, '/')
    }
    if (label) {
      const target = sidebarRef.current.querySelector(
        `div[data-label=${label}]`
      )
      handleDropDownList(target)
    }
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout')
    push('/login')
  }

  return (
    <div className="w-64 bg-stone-50 p-6" ref={sidebarRef}>
      <div className="my-2 flex items-center justify-center text-xl font-bold uppercase text-gray-700 underline underline-offset-4">
        Lam Do
        <ArrowRightOnRectangleIcon
          className="mx-2 h-6 w-6 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
      {SIDEBAR.map((sidebar) => SideBarList(sidebar))}
    </div>
  )
}
