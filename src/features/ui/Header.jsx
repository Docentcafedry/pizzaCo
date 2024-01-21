import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  function handleForm(e) {
    e.preventDefault();
  }
  return (
    <>
      <header className="alig font-pizza flex items-center justify-between border-b-4 border-stone-800 bg-yellow-500 p-[15px]">
        <Link to="/" className="font-semibold uppercase">
          Pizza Co
        </Link>
        <div>
          <form onSubmit={handleForm}>
            <input
              type="text"
              value={query}
              placeholder="Input order id"
              className="duration-30 h-6 w-32 rounded-full bg-stone-100 text-sm font-semibold transition-all placeholder:px-2 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-2"
              onChange={(e) => setQuery(e.target.value)}
            ></input>
          </form>
        </div>
      </header>
    </>
  );
}
