import { formatCurrency } from "../utils/helpers";
import Button from "../ui/Button";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between px-3 py-4">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
