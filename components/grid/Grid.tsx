import classNames from 'classnames'

import styles from './Grid.module.css'

interface GridProps {
  className?: string
  children?: unknown
}

export default function Grid({ children, className }: GridProps) {
  return (
    <div
      className={classNames(
        styles.grid,
        className
      )}
    >
      {children}
    </div>
  )
}
