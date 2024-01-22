import { getMenu } from "../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      <h1 className="mb-4 text-center text-xl font-semibold">Menu</h1>
      <ul className="border- divide-y border-b-4 border-stone-200">
        {menu.map((dish) => (
          <MenuItem pizza={dish} key={dish.id} />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  console.log(menu);
  return menu;
}

export default Menu;
