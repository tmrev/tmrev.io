import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

import { SearchTopic } from '../navSearch'

interface ChipProps extends SearchTopic {
  onClick: () => void
  compact?: boolean
}

const NavSearchChip: FunctionComponent<ChipProps> = (
  {
    label, 
    icon, 
    onClick, 
    compact
  }: ChipProps) => (
  <button 
    className={
      clsx(
        'rounded-full border border-tmrev-gray-dark hover:bg-tmrev-gray-dark',
        'flex space-x-1 items-center justify-center mr-2',
        compact ? 'w-max px-2' : 'w-24'
      )
    }
    type='button' 
    onClick={onClick}>
    <span className='text-sm material-icons'>
      {icon}
    </span>
    {!compact && (
      <span className='text-xs'>
        {label}
      </span>
    )}

  </button>
)

NavSearchChip.defaultProps = {
  compact: false,
}

export default NavSearchChip