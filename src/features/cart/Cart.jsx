import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import { useSelector } from "react-redux";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div>
      <Link to="/menu" className="mb-4 inline-block text-sm text-blue-500">
        &larr; Back to menu
      </Link>

      <h2 className="mb-3 font-semibold">Your cart, {username}</h2>

      <ul className="divide-y border-b-2 border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="my-3 space-x-3">
        <Button to="/order/new">Order Pizza</Button>
        <Button type="white">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
