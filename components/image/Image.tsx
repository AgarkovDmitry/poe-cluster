import classNames from 'classnames'

import styles from './Image.module.css'

interface ImageProps {
  size?: 'big' | 'medium'
  src: string
  alt?: string
  className?: string
}

export default function Image({
  size,
  src,
  alt,
  className,
}: ImageProps) {
  return (
    <img
      className={classNames(
        {
          [styles.big]: size === 'big',
          [styles.medium]: size === 'medium',
        },
        className
      )}
      src={src}
      alt={alt}
    />
  )
}
