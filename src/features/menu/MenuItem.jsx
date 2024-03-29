import { formatCurrency } from "../utils/helpers";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { setItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleAddPizza() {
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: 1 * unitPrice,
    };

    dispatch(setItem(newPizza));
  }

  return (
    <li className="mb-3 flex gap-4 font-pizza">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-25" : ""}`}
      />
      <div className="flex grow flex-col gap-2">
        <div>
          <p className="text-lg">{name}</p>
          <p className="capitalize">{ingredients.join(", ")}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          <Button onClick={() => handleAddPizza()}>Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
