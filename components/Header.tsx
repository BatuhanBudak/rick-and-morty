import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed z-50 top-0 h-16 w-full bg-zinc-800">
      <nav className="w-full h-full" aria-label="main">
        <ul className="flex h-full items-center justify-center gap-3 md:gap-8">
          <li className="cursor-pointer text-white text-l md:text-xl hover:underline">
            <Link href="/">CHARACTERS</Link>
          </li>
          <li className="cursor-pointer text-white text-l md:text-xl hover:underline">
            <Link href="/episodes">EPISODES</Link>
          </li>
          <li className="cursor-pointer text-white text-l md:text-xl hover:underline">
            <Link href="/locations">LOCATIONS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
