import { OrdersList } from "~components/orders-list";
import { getAllOrders } from "~lib/api";

const OrdersHistory = async () => {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Історія замовлень</p>

      {orders.data && orders.data.length > 0 ? (
        <OrdersList orders={orders.data} />
      ) : (
        <p>На даний момент немає даних для формування історії</p>
      )}
    </div>
  );
};

export default OrdersHistory;
