import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800">
      <p className="flex items-center justify-between px-5 text-stone-100">
        <div>
          <span>23 pizzas</span>
          <br></br>
          <span>$23.45</span>
        </div>
        <Link to="/cart">To cart &rarr;</Link>
      </p>
    </div>
  );
}

export default CartOverview;
