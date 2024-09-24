import './styles.css'

import React, { MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'label-extrasmall'

// If we ever introduce left and right spacers we
// can extend this out to include 4 spacers
type SpacerOption = 'top' | 'bottom'
export type Spacers = [SpacerOption?, SpacerOption?]

const textStyle: { [k in Variant]: string } = {
  'h1': twMerge(
    'text-5xl leading-[4.2rem] font-normal text-white',
  ),
  'h2': twMerge(
    'text-[2.5rem] leading-[4rem] font-normal text-white',
  ),
  'h3': twMerge(
    'text-[2.1rem] leading-[2.875rem] font-normal text-white',
  ),
  'h4': twMerge(
    'text-[1.75rem] leading-[2.45rem] font-normal text-white',
  ),
  'h5': twMerge(
    'text-[1.4375rem] leading-loose font-normal text-white',
  ),
  'label-large': twMerge(
    'text-[1.1875rem] leading-relaxed font-normal text-white',
  ),
  'label-medium': twMerge(
    'text-base leading-snug font-normal text-white',
  ),
  'label-small': twMerge(
    'text-[13px] leading-[1.1375rem] font-normal text-white',
  ),
  'label-extrasmall': twMerge(
    'text-[11px] leading-none font-normal text-white',
  )
}

const topSpacer: { [k in Variant]: string } = {
  'h1': 'pt-[2rem]',
  'h2': 'pt-[1.5rem]',
  'h3': 'pt-[0.75rem]',
  'h4': 'pt-[0.5rem]',
  'h5': 'pt-[0.5rem]',
  'label-large': 'pt-[0.5rem]',
  'label-medium': 'pt-[0.5rem]',
  'label-small': 'pt-[0.5rem]',
  'label-extrasmall': 'pt-[0.5rem]',
}

const bottomSpacer: { [k in Variant]: string } = {
  'h1': 'pb-[2rem]',
  'h2': 'pb-[1rem]',
  'h3': 'pb-[0.75rem]',
  'h4': 'pb-[0.5rem]',
  'h5': 'pb-[0.5rem]',
  'label-large': 'pb-[0.5rem]',
  'label-medium': 'pb-[0.5rem]',
  'label-small': 'pb-[0.5rem]',
  'label-extrasmall': 'pb-[0.5rem]',
}

export type Props = {
  variant: Variant
  spacers?: Spacers
  children: React.ReactNode
  tooltip?: string
  onClick?: (e?: MouseEvent<HTMLElement>) => void
  disabled?: boolean
  className?: string
}

export const Typography = (props: Props) => {
  // Create a component map
  const Component = {
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'label-large': 'p',
    'label-medium': 'p',
    'label-small': 'p',
    'label-extrasmall': 'p'
  }[props.variant]

  // Return the appropriate heading level with the class string applied
  return React.createElement(
    Component,
    {
      className: twMerge(
        textStyle[props.variant],
        Array.isArray(props.spacers) &&
          props.spacers.includes('top') &&
          topSpacer[props.variant],
        Array.isArray(props.spacers) &&
          props.spacers.includes('bottom') &&
          bottomSpacer[props.variant],
        props.className
      ),
      onClick: !props.disabled && props.onClick,
      disabled: props.disabled,
      title: props.tooltip ?? undefined,
    },
    props.children
  )
}
