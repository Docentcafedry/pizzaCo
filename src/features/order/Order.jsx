// Test ID: II

import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";
import OrderItem from "./OrderItem";

const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
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
  console.log(id, customer);

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order {id} Status</h2>

        <div className="space-x-1 rounded-full bg-green-400 px-3 py-2 text-stone-600">
          {priority && <span>Priority</span>}
          <span className="capitalize">{status} order</span>
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
            <OrderItem item={item} key={item.pizzaId} />
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
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
}

export default Order;
