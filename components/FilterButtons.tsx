import Link from "next/link";
import React from "react";

export const FilterButtons = () => {
  return (
    <div className="flex flex-wrap md:flex-row md:flex-nowrap justify-center gap-3 md:gap-4">
      <Link
        href={`/?page=1&gender=male`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Male Characters
      </Link>
      <Link
        href={`/?page=1&gender=female`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Female Characters
      </Link>
      <Link
        href={`/?page=1&species=human`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Human Characters
      </Link>
      <Link
        href={`/?page=1&species=alien`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Alien Characters
      </Link>
      <Link
        href={`/?page=1&status=alive`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Alive Characters
      </Link>
      <Link
        href={`/?page=1&status=dead`}
        className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
      >
        Dead Characters
      </Link>
    </div>
  );
};
