import React from 'react'
import {cn} from '@/lib/utils'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import BaseButton from '../buttons/base-button'

const BaseInput = ({
  type = 'text',
  size,
  label,
  withLabel,
  withButton,
  placeholder,
  icon: Icon,
  iconDirection = 'left',
  wrapperClassName,
  inputClassName,
}: React.ComponentProps<typeof Input> & {
  label?: string
  withLabel?: boolean
  withButton?: boolean
  iconDirection?: 'left' | 'right'
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  wrapperClassName?: string
  inputClassName?: string
}) => {
  return (
    <div className={cn('flex items-center gap-2 w-full', wrapperClassName)}>
      {withLabel && <Label htmlFor={label}>{label}</Label>}
      <div className="relative flex-1">
        <Input
          size={size}
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full text-sm placeholder:text-sm',
            inputClassName,
            Icon && iconDirection === 'left' && 'pl-9',
            Icon && iconDirection === 'right' && 'pr-9'
          )}
        />

        {Icon && (
          <Icon
            className={cn('absolute top-2.5', {
              'left-3': iconDirection === 'left',
              'right-3': iconDirection === 'right',
            })}
            width={16}
            height={16}
          />
        )}
      </div>
      {withButton && (
        <BaseButton type="submit" variant="outline">
          Subscribe
        </BaseButton>
      )}
    </div>
  )
}

export default BaseInput
