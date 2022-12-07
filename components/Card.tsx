import Thumb from "../components/Thumb";

type Props = {
  imgUrl: string;
  title: string;
};

const Card = ({ imgUrl, title }: Props) => (
  <div className="h-80" data-testid="grid-child">
    <div className="relative h-full ">
      <Thumb imgUrl={imgUrl} />
      <div className="absolute w-full bottom-0 px-4 py-2  bg-zinc-800 ">
        <h2 className="text-cyan-200 text-center text-sm truncate">{title}</h2>
      </div>
    </div>
  </div>
);

export default Card;
