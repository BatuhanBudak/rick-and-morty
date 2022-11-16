type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Grid = ({ title, children, className }: Props) => {
  return (
    <div className={className}>
      <h2 className="text-3xl text-white font-bold pb-4 mx-auto text-center mt-10">
        {title}
      </h2>
      <div className="grid grid-cols-auto-fill gap-8">{children}</div>
    </div>
  );
};

export default Grid;
