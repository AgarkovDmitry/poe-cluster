import classNames from 'classnames'

import styles from './Block.module.css'

interface BlockProps {
  className?: string
  selected?: boolean
  active?: boolean
  onClick?: () => void
  children?: unknown
}

export default function Block({
  children,
  onClick,
  className,
  selected,
  active,
}: BlockProps) {
  return (
    <div
      className={classNames(
        styles.block,
        {
          [styles.active]: active,
          [styles.selected]: selected,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
