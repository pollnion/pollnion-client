'use client'

import map from 'lodash/map'
import throttle from 'lodash/throttle'
import {Plus} from 'lucide-react'
import {House} from 'lucide-react'
import {Vote} from 'lucide-react'
import {MessageCircle} from 'lucide-react'
import React, {useEffect, useState, useRef} from 'react'

import BaseButton from '../buttons/base-button'
import BaseAvatar from '../avatars/base-avatar'
import {useFeed} from '@/hooks/providers/use-feed'

type BaseButtonProps = React.ComponentProps<typeof BaseButton>

const BaseFooter = () => {
  const [show, setShow] = useState(true)
  const lastScrollYRef = useRef(0)
  const feedProps = useFeed()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        // scrolling down
        setShow(false)
      } else {
        // scrolling up
        setShow(true)
      }
      lastScrollYRef.current = currentScrollY
    }, 100)

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => {
      handleScroll.cancel()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const buttons: BaseButtonProps[] = [
    {
      icon: House,
      onClick: () => console.log('House clicked!'),
    },
    {
      icon: Vote,
      onClick: () => console.log('Vote clicked!'),
    },
    {
      icon: Plus,
      variant: 'default',
      onClick: feedProps.toggleOpen,
      className: 'w-12 h-12 rounded-full',
    },
    {
      icon: MessageCircle,
      onClick: () => console.log('messages clicked!'),
    },
    {
      children: <BaseAvatar />,
      onClick: () => console.log('Profile clicked!'),
    },
  ]

  return (
    <footer
      className={`sm:hidden fixed bottom-0 left-0 right-0 px-4 py-3 flex justify-around items-center bg-background z-50 transition-transform duration-300
      ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      {map(buttons, ({className, ...items}, idx) => (
        <BaseButton
          key={idx}
          variant="ghost"
          className={className || 'w-12 h-12'}
          {...items}
        />
      ))}
    </footer>
  )
}

export default BaseFooter
