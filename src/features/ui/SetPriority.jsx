import Button from "./Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../services/apiRestaurant";
export default function SetPriority() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <div className=" mt-2 text-right">
        <Button>Set Priority</Button>
      </div>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}
