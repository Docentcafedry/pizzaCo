import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosition } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { position, address, loadingPosition, error } = useSelector(
    (state) => state.user,
  );
  const formErrors = useActionData();
  const customInput =
    "w-full rounded-full px-1 py-1 transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-200";

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-2 font-pizza">
          <label className="mb-1 inline-block">First Name</label>
          <input type="text" name="customer" required className={customInput} />
        </div>

        <div className="mb-2 font-pizza">
          <label className="mb-1 inline-block">Phone number</label>
          <div>
            <input type="tel" name="phone" className={customInput} required />
          </div>
          {formErrors?.phone && (
            <p className="w-40 rounded-full bg-red-300 text-center text-sm font-normal">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-2 font-pizza">
          <label className="mb-1 inline-block">Address</label>
          <div className="relative flex">
            <div className="relative grow">
              <input
                type="text"
                name="address"
                className={customInput}
                defaultValue={address}
                required
              />
            </div>
            <span className="absolute bottom-[2px] right-0">
              <Button
                type="input"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchPosition());
                }}
              >
                Get Position
              </Button>
            </span>
          </div>
          {error && (
            <p className="w-40 rounded-full bg-red-300 text-center text-sm font-normal">
              {error}
            </p>
          )}
        </div>

        <div className="text-sm font-semibold">
          <input
            type="checkbox"
            name="priority"
            className="mb-5 mt-2 inline-block h-4 w-4 accent-yellow-200"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* <button className="rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200">
            Order now
          </button> */}
          <button className="rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200">
            Order Now
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);
  const errors = {};
  if (!isValidPhone(form.phone)) {
    errors.phone = "Wrong phone number";
  }

  if (Object.keys(errors).length > 0) return errors;
  const order = {
    ...form,
    cart: JSON.parse(form.cart),
    priority: form.priority === "true",
  };
  console.log(order);

  const newOrder = await createOrder(order);
  console.log(newOrder.id);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
