import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky z-100 top-0 h-16 w-full bg-zinc-800">
      <nav className="w-full h-full" aria-label="main">
        <ul className="flex h-full items-center justify-center gap-8">
          <li className="cursor-pointer text-white hover:underline text-xl">
            <Link href="/">HOME</Link>
          </li>
          <li className="cursor-pointer text-white text-xl hover:underline">
            <Link href="/characters">CHARACTERS</Link>
          </li>
          <li className="cursor-pointer text-white text-xl hover:underline">
            <Link href="/episodes">EPISODES</Link>
          </li>
          <li className="cursor-pointer text-white text-xl hover:underline">
            <Link href="/locations">LOCATIONS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
