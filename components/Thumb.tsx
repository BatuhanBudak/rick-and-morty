import Image from "next/image";

type Props = {
  imgUrl: string;
};

const Thumb = ({ imgUrl }: Props) => (
  <Image
    placeholder="blur"
    blurDataURL="/placeholder.jpg"
    className="rounded-lg object-cover "
    fill
    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    src={imgUrl}
    alt="thumb"
  />
);

export default Thumb;
