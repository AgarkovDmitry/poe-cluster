import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './Grid.module.css'

interface GridProps {
  className?: string
  children?: ReactNode
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
