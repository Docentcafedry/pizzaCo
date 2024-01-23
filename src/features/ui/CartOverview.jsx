import { Link } from "react-router-dom";
import { getPizzasQuantity, getPizzasTotalPrice } from "../cart/cartSlice";
import { useSelector } from "react-redux";

function CartOverview() {
  const generalQuantity = useSelector(getPizzasQuantity);
  const generalPrice = useSelector(getPizzasTotalPrice);
  return (
    <div className="bg-stone-800">
      <p className="flex items-center justify-between px-5 text-stone-100">
        <div>
          <span>Pizzas:{generalQuantity}</span>
          <br></br>
          <span>${generalPrice}</span>
        </div>
        <Link to="/cart">To cart &rarr;</Link>
      </p>
    </div>
  );
}

export default CartOverview;
