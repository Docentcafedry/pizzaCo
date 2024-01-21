import { useState } from "react";
import Button from "../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
          <Button to="order/new">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
