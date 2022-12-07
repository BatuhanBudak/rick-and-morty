import Thumb from "../components/Thumb";

type Props = {
  thumbUrl: string;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender?: string;
  origin: string;
  location: string;
};

const CharacterInfo = ({
  thumbUrl,
  name,
  status,
  species,
  type,
  origin,
  location,
}: Props) => (
  <div className="relative h-auto  ">
    <div
      className="relative h-full min-h-128 flex flex-col md:flex-row max-w-2xl  m-auto z-10 rounded-xl bg-zinc-800 bg-opacity-90"
      style={{
        backgroundColor: "rgb(60, 62, 68)",
      }}
    >
      <div className="relative w-full h-96  md:w-1/2">
        <Thumb imgUrl={thumbUrl} />
      </div>
      <div className="text-white px-0 py-4  text-center md:px-8 w-full md:w-1/2">
        <ul className="flex flex-col justify-around h-full gap-4">
          <li className="text-2xl">{name}</li>
          <li className=" capitalize">
            {species} - {status}
            <span
              className={`inline-block ml-2 w-2 h-2 rounded-full  ${
                status === "Alive"
                  ? "bg-green-500"
                  : status === "unknown"
                  ? "bg-slate-500"
                  : "bg-red-600"
              } `}
              data-testid="status"
            ></span>
          </li>

          <li>
            Last known location: <span className="block">{location}</span>
          </li>
          <li>
            First seen in:
            <span className="block">{origin}</span>
          </li>
          {type ? <li>Type: {type}</li> : null}
        </ul>
      </div>
    </div>
  </div>
);

export default CharacterInfo;
