import Image from 'next/image'

export default function Images({ className, src, width = 200, height = 200 }) {
  return (
    <Image
      className={className}
      src={src ?? '/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg'}
      width={width}
      height={height}
    />
  )
}
