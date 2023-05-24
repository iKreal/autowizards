import { UserCircleIcon } from "@heroicons/react/24/outline";

import { getAllCustomers } from "~lib/api";

const CustomersPage = async () => {
  const customers = await getAllCustomers();

  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Клієнти</p>

      {customers.data && customers.data.length > 0 ? (
        customers.data.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center space-x-4 border border-neutral-200 px-4 py-2 text-start shadow-sm"
          >
            <UserCircleIcon className="h-12 w-12" />
            <div className="grid grow grid-cols-4 gap-2">
              <div>
                <p className="text-sm text-neutral-500">Ім&apos;я</p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-medium">
                  {customer.name.split(" ")[0]}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Прізвище</p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-medium">
                  {customer.name.split(" ")[1]}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Номер телефону</p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-medium">{customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Електронна пошта</p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-medium">{customer.email}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>На даний момент немає даних про клієнтів</p>
      )}
    </div>
  );
};

export default CustomersPage;
