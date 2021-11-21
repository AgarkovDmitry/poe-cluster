import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './Text.module.css'

interface TextProps {
  fontSize?: 'big' | 'medium'
  italic?: boolean
  bold?: boolean
  color?: 'title' | 'hint'
  children?: ReactNode
  className?: string
}

export default function Text({
  fontSize,
  italic,
  bold,
  color,
  children,
  className,
}: TextProps) {
  return (
    <div
      className={classNames(
        {
          [styles.big]: fontSize === 'big',
          [styles.medium]: fontSize === 'medium',
          [styles.italic]: italic,
          [styles.bold]: bold,
          [styles.title]: color === 'title',
          [styles.hint]: color === 'hint',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
