import React from 'react'
import {map} from 'lodash'
import {Plus} from 'lucide-react'
import {Vote} from 'lucide-react'
import {MessageCircleQuestionMark} from 'lucide-react'

import {useFeed} from '@/hooks/providers/use-feed'
import {Separator} from '@/components/ui/separator'
import BaseAvatar from '@/components/base/avatars/base-avatar'
import BaseButton from '@/components/base/buttons/base-button'

const FeedPost = () => {
  const feedProps = useFeed()

  const btn = {
    variant: 'secondary',
    className: 'flex-1 min-w-0',
    children: '💡 Got a question? Turn it into a poll!',
    onClick: feedProps.toggleOpen,
  }

  const btns = [
    {
      icon: Vote,
      children: 'Vote',
    },
    {
      children: 'Ask',
      icon: MessageCircleQuestionMark,
    },
    {
      icon: Plus,
      children: 'Create',
      onClick: feedProps.toggleOpen,
    },
  ].filter(Boolean)

  return (
    <React.Fragment>
      <div className="bg-card p-2 rounded-none sm:rounded-sm">
        <div className="flex items-center space-x-2">
          <BaseAvatar />
          {React.createElement(
            BaseButton,
            btn as React.ComponentProps<typeof BaseButton>
          )}
        </div>

        <Separator className="my-2" />

        <div className="flex justify-around items-center">
          {map(btns, (props: React.ComponentProps<typeof BaseButton>, i: number) => {
            return (
              <React.Fragment key={i}>
                {React.createElement(BaseButton, {
                  variant: 'secondary',
                  className: 'flex-1 min-w-0',
                  ...props,
                })}
                <Separator
                  orientation="vertical"
                  className="!h-6 mx-2 block last:hidden"
                />
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* will show for smaller devices */}
      <div className="fixed bottom-4 right-4 z-50 block md:hidden">
        <BaseButton
          onClick={feedProps.toggleOpen}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus />
        </BaseButton>
      </div>
    </React.Fragment>
  )
}

export default FeedPost
