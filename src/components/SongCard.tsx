interface Props {
  children: JSX.Element | string;
}

function SongCard({ children }: Props) {
  return <div>{children}</div>;
}

export default SongCard;
