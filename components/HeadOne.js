export default function Header({ title, className = '' }) {
  return (
    <h1 className={`my-2 text-center font-bold uppercase ${className}`}>
      {title}
    </h1>
  )
}
