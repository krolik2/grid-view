import { ITile } from "../App";

interface DataProps {
    data: ITile[],
}
const Tiles = ({data}: DataProps) => {
  return (
    <div className="tiles-grid">
    {data.map((el, i) => (
      <div key={i}>
        <div className="tile">{el.title}</div>
        <img src={el.imagePath} alt={el.title} />
      </div>
    ))}
    </div>
  )
}

export default Tiles