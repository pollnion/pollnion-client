'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {Menu, SearchIcon} from 'lucide-react'
import {AiOutlineGithub} from 'react-icons/ai'
import {usePathname, useRouter} from 'next/navigation'

import BaseNavCta from './base-nav-cta'
import BaseNavAvatar from './base-nav-avatar'
import {useLayout} from '@/hooks/layout/use-layout'
import {Separator} from '@/components/ui/separator'
import BaseButton from '@/components/base/buttons/base-button'
import {IMAGE_LOGO_TEXT, IMAGE_LOGO} from '@/constants/images'
import {TypographyMuted} from '@/components/base/typography/base-typography'

export default function BaseNav() {
  const {push} = useRouter()
  const pathname = usePathname()
  const useLayoutProps = useLayout()

  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const isSearchPath = pathname.startsWith('/search')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShow(false)
      } else {
        // scrolling up
        setShow(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`px-2 lg:container lg:mx-auto lg:px-6 flex justify-between py-3 items-center sticky top-0 h-fit bg-background z-50 space-x-2 transition-transform duration-300
  ${show ? 'translate-y-0' : 'translate-y-[-100%] sm:translate-y-0'}`}
    >
      <div className="flex align-items-center space-x-2">
        <div className="block sm:hidden">
          <BaseButton variant="ghost" onClick={useLayoutProps.toggleOpen}>
            <Menu />
          </BaseButton>
        </div>

        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            alt="Pollnion logo icon"
            src={IMAGE_LOGO}
            className="object-contain hover:cursor-pointer max-w-[28px]"
            onClick={() => {
              push('/')
              window.scrollTo({top: 0, behavior: 'smooth'})
            }}
          />

          <BaseButton
            href="/"
            variant="ghost"
            className="p-0 hidden md:flex items-center"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="relative w-24 h-8 flex items-center">
              <Image
                src={IMAGE_LOGO_TEXT}
                alt="Pollnion text logo"
                fill
                sizes="(max-width: 768px) 120px, 200px"
                className="object-contain"
              />
            </div>
          </BaseButton>
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        {!isSearchPath && (
          <BaseButton
            asChild
            href="/search"
            variant="outline"
            icon={SearchIcon}
            className="sm:w-[200px] md:w-[280px] justify-start"
          >
            <div className="hidden sm:block text-muted-foreground">Search...</div>
          </BaseButton>
        )}

        <div className="hidden md:block">
          <Separator orientation="vertical" className="!h-4 w-px bg-muted" />
        </div>

        <div className="hidden md:block">
          <BaseButton variant="ghost">
            <AiOutlineGithub size={24} />
            <TypographyMuted className="text-xs">3.4k</TypographyMuted>
          </BaseButton>
        </div>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="!h-4 w-px bg-muted" />
        </div>

        <BaseNavCta />
        <BaseNavAvatar />
      </div>
    </nav>
  )
}
