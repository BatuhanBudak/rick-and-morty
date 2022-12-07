import Link from "next/link";
import { useState, useEffect } from "react";
import { getCharacterByName } from "../apis/rickMorty";
import { CharacterResponse } from "../apis/types";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<CharacterResponse[][] | undefined>([]);
  const [loading, setLoading] = useState(0);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          width: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropdownClass}`}
      >
        {results?.map((result) => {
          return result.map((character: CharacterResponse) => {
            return (
              <Link key={character.id} href={`/characters/${character.id}`}>
                <li
                  className="dropdown-item"
                  key={character.id}
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  {character.name} ({character.species})
                </li>
              </Link>
            );
          });
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading((l) => l + 1);
      try {
        const data = await getCharacterByName(search);
        if (isMounted) {
          setResults(data);
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading((l) => l - 1);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="w-50 my-5 rounded mx-auto ">
      {loading ? <p className="text-white">Loading...</p> : null}
      <div className="form-floating dropdown">
        <input
          style={{
            backgroundColor: "rgba(145,158,171, 0.4",
          }}
          className="form-control"
          placeholder="Search Character"
          type="text"
          id="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
