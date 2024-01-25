import { formatCurrency } from "../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="mb-2 mt-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold ">
            <span>{quantity}&times;</span> {name}
          </p>
          <p className="font-pizza text-sm capitalize">
            {ingredients.join(", ")}
          </p>
        </div>

        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
