import { formatCurrency } from "../utils/helpers";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import QuantityItemChange from "../ui/QuantityItemChange";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, name, quantity, totalPrice } = item;
  console.log(id);

  function handleDeletePizza() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex items-center justify-between px-3 py-4">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <QuantityItemChange id={id} />
        <Button onClick={() => handleDeletePizza()}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
