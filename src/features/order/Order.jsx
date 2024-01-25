import { useEffect } from "react";
import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
import { useLoaderData, useFetcher } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";
import OrderItem from "./OrderItem";
import SetPriority from "../ui/SetPriority";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    customer,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order {id} Status</h2>

        <div className="flex items-center gap-2">
          {priority && (
            <span className="space-x-1 rounded-full bg-red-400 px-3 py-2 capitalize text-stone-600 ">
              Priority
            </span>
          )}
          <span className="space-x-1 rounded-full bg-green-400 px-3 py-2 capitalize text-stone-600 ">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between bg-stone-300 px-4 py-4">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div className="mb-5">
        <ul className="divide-y border-b-2 border-t-2">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              ingredients={
                fetcher?.data?.find((el) => el.pizzaId === item.id)
                  ?.ingredients ?? []
              }
            />
          ))}
        </ul>
      </div>

      <div className="bg-stone-300 px-2 py-2">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-xl font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <SetPriority className="text-right"></SetPriority>}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
}

export default Order;
