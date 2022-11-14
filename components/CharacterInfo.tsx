import Image from "next/image";
import Thumb from "../components/Thumb";

type Props = {
  thumbUrl: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
};

const CharacterInfo = ({
  thumbUrl,
  name,
  status,
  species,
  type,
  gender,
  origin,
  location,
}: Props) => (
  <div className="relative w-full h-auto p-4 ">
    <div className="relative h-full min-h-128 flex flex-col md:flex-row max-w-7xl px-4 py-10 m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90">
      <div className="relative w-full h-96  md:w-1/3">
        <Thumb imgUrl={thumbUrl} />
      </div>
      <div className="text-white px-0 py-4 md:py-0 text-center md:px-8 w-full md:w-2/3">
        <ul className="flex flex-col flex-wrap h-full justify-between gap-4">
          <li className="text-base md:text-xl">Name: {name}</li>
          <li className="text-base md:text-xl">Gender: {gender}</li>
          <li className="text-base md:text-xl capitalize">
            Status: {status}
            <span
              className={`inline-block ml-2 w-2 h-2 rounded-full  ${
                status === "Alive"
                  ? "bg-green-500"
                  : status === "unknown"
                  ? "bg-slate-500"
                  : "bg-red-600"
              } `}
            ></span>
          </li>
          <li className="text-base md:text-xl">Species: {species}</li>
          <li className="text-base md:text-xl ">Origin: {origin}</li>
          <li className="text-base md:text-xl">Location: {location}</li>
          {type ? <li className="text-base md:text-xl">Type: {type}</li> : null}
        </ul>
      </div>
    </div>
  </div>
);

export default CharacterInfo;
