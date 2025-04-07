import clsx from 'classnames'

interface AvatarProps {
  src: string
  alt?: string
  size?: 's' | 'm' | 'l' | 'xl'
}

export const Avatar = ({ src, size = 's', alt }: AvatarProps) => {
  const sizes: { [key: string]: string } = {
    s: 'size-6',
    m: 'size-8',
    l: 'size-10',
    xl: 'size-12',
  }

  return <img className={clsx('inline-block rounded-full', sizes[size])} src={src} alt={alt} />
}
