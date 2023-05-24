import { OrdersList } from "~components/orders-list";
import { getRequestedOrders } from "~lib/api";

const OrderRequests = async () => {
  const orders = await getRequestedOrders();

  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Заявки на запис</p>

      {orders.data && orders.data.length > 0 ? (
        <OrdersList
          isRequest
          orders={orders.data}
        />
      ) : (
        <p>На даний момент немає нових заявок на обробку</p>
      )}
    </div>
  );
};

export default OrderRequests;
