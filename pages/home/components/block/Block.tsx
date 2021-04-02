import classNames from 'classnames'

import styles from './Block.module.css'

interface BlockProps {
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: unknown
}

export default function Block({
  children,
  onClick,
  className,
  selected,
}: BlockProps) {
  const clickable = !!onClick

  return (
    <div
      className={classNames(
        styles.block,
        {
          [styles.selected]: selected,
          [styles.clickable]: clickable,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
