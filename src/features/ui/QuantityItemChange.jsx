import { useDispatch } from "react-redux";
import Button from "./Button";
import { increaseQuantity, decreaseQuantity } from "../cart/cartSlice";

export default function QuantityItemChange({ id }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => dispatch(increaseQuantity(id))} type="small">
        +
      </Button>
      <Button onClick={() => dispatch(decreaseQuantity(id))} type="small">
        -
      </Button>
    </div>
  );
}
