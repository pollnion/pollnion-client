'use client'
import {SearchIcon} from 'lucide-react'

import {Separator} from '@/components/ui/separator'
import {BaseIcon} from '@/components/base/icons/base-icon'
import BaseInput from '@/components/base/inputs/base-input'
import BaseButton from '@/components/base/buttons/base-button'
import {TypographyMuted} from '@/components/base/typography/base-typography'

export default function BaseNav() {
  const isAuth = false
  return (
    <nav className="px-2 lg:container lg:mx-auto flex justify-between py-3 items-center sticky top-0 h-fit bg-background z-50">
      <div className="flex align-items-center">
        <div className="block xl:hidden">
          <BaseButton variant="ghost">
            <BaseIcon nameIcon="AiOutlineMenu" propsIcon={{size: 24}} />
          </BaseButton>
        </div>

        <BaseButton href="/" variant="ghost">
          <div className="pb-1">P</div>
        </BaseButton>
      </div>
      <div className="flex space-x-2 items-center">
        <BaseInput
          size={20}
          type="text"
          icon={SearchIcon}
          placeholder="Search..."
          inputClassName="w-[10px] sm:w-full"
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

        {!isAuth && (
          <div className="flex space-x-2">
            <BaseButton variant="ghost">
              <span>Sign in</span>
            </BaseButton>
            <BaseButton>Join</BaseButton>
          </div>
        )}
      </div>
    </nav>
  )
}
