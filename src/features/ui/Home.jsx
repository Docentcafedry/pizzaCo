import CreateUser from "../user/CreateUser";

function Home() {
  return (
    <div className="mx-10 my-10 text-center font-semibold">
      <h1>
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
