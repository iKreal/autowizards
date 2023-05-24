"use client";

import { ChevronRightIcon, ClipboardDocumentListIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import { acceptOrderAction, declineOrderAction } from "~lib/api";
import { useServerAction } from "~lib/use-server-action";
import { cn } from "~lib/utils";
import type { Database } from "~types/supabase";

import { Button } from "./ui/button";

export const OrdersList = ({
  orders,
  isRequest,
}: {
  orders: Database["public"]["Tables"]["orders"]["Row"][];
  isRequest?: boolean;
}) => {
  const declineOrder = useServerAction(declineOrderAction, {
    onComplete: (result) => {
      console.log(result);
    },
  });

  const acceptOrder = useServerAction(acceptOrderAction, {
    onComplete: (result) => {
      console.log(result);
    },
  });

  return (
    <div className="flex flex-col space-y-8">
      {orders.map((order) => (
        <div
          key={order.id}
          className="grid grid-cols-2 gap-2 rounded border border-neutral-200 p-6 shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <ClipboardDocumentListIcon className="h-6 w-6" />
            <p className="font-medium">Замовлення №{order.id.slice(0, 5)}</p>
          </div>

          {isRequest ? (
            <button
              className="ml-auto flex h-8 w-8 items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
              disabled={declineOrder.isPending}
              onClick={() => declineOrder.run(order.id)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          ) : (
            <p
              className={cn(
                "ml-auto flex h-fit w-fit items-center justify-center rounded-full px-3 py-1.5 text-sm",
                order.status === "Скасовано" && "bg-red-100 text-red-700",
                order.status === "Підтверджено" && "bg-green-100 text-green-700",
                order.status === "На розгляданні" && "bg-orange-100 text-orange-700"
              )}
            >
              {order.status}
            </p>
          )}

          <div>
            <p className="text-sm text-neutral-500">Замовник</p>
            <p className="font-medium">{order.customer}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Автомобіль</p>
            <p className="font-medium">{order.car}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Дата</p>
            <p className="font-medium first-letter:capitalize">
              {format(new Date(order.date), "PPPP", {
                locale: uk,
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Станція</p>
            <p className="font-medium">{order.address}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Послуги</p>
            {Object.entries(order.services as Record<string, any>).map(([label, items]) => (
              <div key={label}>
                <p className="font-medium">{label}</p>
                <div>
                  {Object.entries(items as Record<string, any>).map(([name, item]) => (
                    <div
                      key={name}
                      className="flex items-center space-x-1 text-sm font-medium text-primary-500"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                      <p>
                        {name} {item.price}₴ x {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm text-neutral-500">Загальна вартість</p>
            <p className="font-medium">{order.total_price}₴</p>
          </div>

          {isRequest ? (
            <Button
              className="col-span-2 ml-auto"
              size="sm"
              disabled={acceptOrder.isPending}
              onClick={() => acceptOrder.run(order.id)}
            >
              Підтвердити
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
