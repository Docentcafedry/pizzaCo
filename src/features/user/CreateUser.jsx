import { useState } from "react";
import Button from "../ui/Button";
import { setName } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    console.log(username);
    dispatch(setName(username));
    navigator("/menu");
  }

  return (
    <form className="my-10" onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        className="mb-4 mt-4 w-72"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <button className="rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
