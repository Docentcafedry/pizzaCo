import { Link } from "react-router-dom";
import { useState } from "react";
import Username from "../user/Username";
import { useSelector } from "react-redux";

export default function Header() {
  const username = useSelector((state) => state.user.username);
  const [query, setQuery] = useState("");
  console.log(username);

  function handleForm(e) {
    e.preventDefault();
  }
  return (
    <>
      <header className="alig flex items-center justify-between border-b-4 border-stone-800 bg-yellow-500 p-[15px] font-pizza">
        <Link to="/" className="font-semibold uppercase">
          Pizza Co
        </Link>
        <div className="flex items-center gap-4">
          {username && <Username>{username}</Username>}
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
