import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const customInput =
    "w-full rounded-full px-1 py-1 transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-200";

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className={customInput} />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" className={customInput} required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              className={customInput}
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            className="mb-5 mt-2 inline-block h-4 w-4 accent-yellow-200"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* <button className="rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200">
            Order now
          </button> */}
          <Button>Order Now</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);
  const order = { ...form, cart: JSON.parse(form.cart) };

  const newOrder = await createOrder(order);
  console.log(newOrder.id);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
