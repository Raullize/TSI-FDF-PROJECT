type Props = {
    title: string
}

const Header = ({ title }: Props) => {
  return (
    <div className="text-3xl font-bold text-center">{title}</div>
  )
}

export default Header