import { OrdersList } from "~components/orders-list";
import { getAllUserOrders } from "~lib/api";

const OrdersPage = async () => {
  const orders = await getAllUserOrders();

  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Обслуговування</p>

      {orders.data && orders.data.length > 0 ? (
        <OrdersList orders={orders.data} />
      ) : (
        <p>Ми ще не робили технічне обслуговування вашого автомобіля</p>
      )}
    </div>
  );
};

export default OrdersPage;
