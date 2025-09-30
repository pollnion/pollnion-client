'use client'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {Menu, SearchIcon} from 'lucide-react'
import BaseNavCta from './base-nav-cta'
import BaseNavAvatar from './base-nav-avatar'
import {IMAGE_LOGO} from '@/constants/images'
import {useLayout} from '@/hooks/layout/useLayout'
import {Separator} from '@/components/ui/separator'
import {BaseIcon} from '@/components/base/icons/base-icon'
import BaseInput from '@/components/base/inputs/base-input'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyMuted} from '@/components/base/typography/base-typography'

export default function BaseNav() {
  const useLayoutProps = useLayout()

  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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
      className={`px-2 lg:container lg:mx-auto flex justify-between py-3 items-center sticky top-0 h-fit bg-background z-50 space-x-2 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex align-items-center">
        <div className="block xl:hidden">
          <BaseButton variant="ghost" onClick={useLayoutProps.toggleOpen}>
            <Menu />
          </BaseButton>
        </div>

        <BaseButton
          href="/"
          variant="ghost"
          className="p-0"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="relative w-24 h-12">
            <Image
              src={IMAGE_LOGO}
              alt="image_logo"
              fill
              sizes="(max-width: 768px) 120px, 200px"
              className="object-contain"
            />
          </div>
        </BaseButton>
      </div>

      <div className="flex space-x-2 items-center">
        <BaseInput
          size={20}
          type="text"
          icon={SearchIcon}
          placeholder="Search..."
          inputClassName="md:w-[315px]"
        />

        <div className="hidden md:block">
          <Separator orientation="vertical" className="!h-4 w-px bg-muted" />
        </div>

        <div className="hidden md:block">
          <BaseButton variant="ghost">
            <BaseIcon nameIcon="AiOutlineGithub" propsIcon={{size: 24}} />
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
