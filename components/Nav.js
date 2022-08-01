import { useEffect, useRef } from 'react'
import Link from 'next/link'

const NAV = [
  {
    href: '/',
    label: 'Lam Do',
  },
  [
    {
      href: '/blogs',
      label: 'Blogs',
    },
  ],
]

function RedirectLink({ href, label, className }) {
  return (
    <Link key={label} href={href}>
      <p className={`cursor-pointer ${className}`}>{label}</p>
    </Link>
  )
}

function NavList(nav) {
  if (Array.isArray(nav)) {
    return (
      <ul className="flex" key={nav}>
        {nav.map((value) => (
          <li key={value.label} className="mx-2">
            <RedirectLink href={value.href} label={value.label} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <RedirectLink
      key={nav.label}
      href={nav.href}
      label={nav.label}
      className="text-4xl font-bold uppercase"
    />
  )
}

export default function Nav({ page = {} }) {
  const isPage = Object.keys(page).length > 0
  const navRef = useRef()

  useEffect(() => {
    if (isPage) {
      const handleScroll = () => {
        const hasOverScreenHeight = window.scrollY > window.screen.availHeight

        navRef.current.classList.toggle('absolute', !hasOverScreenHeight)
        navRef.current.classList.toggle('bg-transparent', !hasOverScreenHeight)
        navRef.current.classList.toggle('text-white', !hasOverScreenHeight)
        navRef.current.classList.toggle('fixed', hasOverScreenHeight)
        navRef.current.classList.toggle('bg-white', hasOverScreenHeight)
        navRef.current.classList.toggle('shadow', hasOverScreenHeight)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <nav
      className={`${
        isPage
          ? 'absolute top-0 z-10 w-full bg-transparent text-white'
          : 'shadow'
      } flex items-center justify-between py-4 px-20 `}
      ref={navRef}
    >
      {NAV.map((nav) => NavList(nav))}
    </nav>
  )
}
