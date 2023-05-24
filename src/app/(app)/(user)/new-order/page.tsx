"use client";

import { InformationCircleIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { isAfter, sub } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import { DatePicker } from "~components/ui/date-picker";
import { Input } from "~components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import { addresses } from "~data/addresses";
import { cars } from "~data/cars";
import { services } from "~data/services";
import { createOrderAction } from "~lib/api";
import { useSupabase } from "~lib/supabase/client";
import { useServerAction } from "~lib/use-server-action";

const NewOrderPage = () => {
  const router = useRouter();

  const { session } = useSupabase();

  const createOrder = useServerAction(createOrderAction, {
    onComplete: ({ error }) => {
      if (error) {
        console.error(error);
      } else {
        router.push("/orders");
      }
    },
  });

  const [firstName, setFirstName] = useState<string>(session?.user.first_name || "");

  const [lastName, setLastName] = useState<string>(session?.user.last_name || "");

  const [phone, setPhone] = useState<string>(session?.user.phone || "");

  const [selectedCar, setSelectedCar] = useState<string | undefined>();

  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedServices, setSelectedServices] = useState<
    Record<string, Record<string, { price: number; count: number }>>
  >({});

  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Нова заявка</p>
      <div className="flex w-full flex-col space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Input
            type="text"
            placeholder="Ім'я"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />

          <Input
            type="text"
            placeholder="Прізвище"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />

          <Input
            type="text"
            placeholder="Номер телефону"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
          />

          <Select
            value={selectedCar}
            onValueChange={(value) => setSelectedCar(value)}
          >
            <SelectTrigger>
              <div className="flex items-center space-x-2.5">
                <SelectValue placeholder="Автомобіль" />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectGroup>
                {cars.map((car) => (
                  <SelectItem
                    key={car}
                    value={car}
                  >
                    {car}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedAddress}
            onValueChange={(value) => setSelectedAddress(value)}
          >
            <SelectTrigger>
              <div className="flex items-center space-x-2.5">
                <SelectValue placeholder="Автосервіс" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {addresses.map((address) => (
                  <SelectItem
                    key={address}
                    value={address}
                  >
                    {address}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DatePicker
            placeholder="День візиту"
            selected={selectedDate}
            onSelect={(value) => setSelectedDate(value)}
            disabled={(date) =>
              isAfter(
                sub(new Date(), {
                  days: 1,
                }),
                date
              )
            }
          />
        </div>

        <div className="flex flex-col space-y-6">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-4">
                <Image
                  priority
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={48}
                  height={48}
                />
                <p className="text-lg font-semibold">{service.label}</p>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-200 py-2 text-sm font-medium text-neutral-500">
                <p>Назва послуги</p>
                <p>Вартість</p>
              </div>

              <div className="flex flex-col space-y-2">
                {service.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={item.name}
                        onCheckedChange={(value) =>
                          value
                            ? setSelectedServices((selectedServices) => ({
                                ...selectedServices,
                                [service.label]: {
                                  ...selectedServices[service.label],
                                  [item.name]: {
                                    price: item.price,
                                    count: 1,
                                  },
                                },
                              }))
                            : setSelectedServices((selectedServices) => {
                                const cloned = structuredClone(selectedServices);

                                delete cloned[service.label][item.name];

                                if (Object.keys(cloned[service.label]).length === 0) {
                                  delete cloned[service.label];
                                }

                                return cloned;
                              })
                        }
                      />
                      {selectedServices[service.label]?.[item.name] ? (
                        <div className="flex items-center">
                          <button
                            className="-mr-[1px] flex h-5 w-5 items-center justify-center rounded rounded-r-none border border-neutral-200"
                            onClick={() =>
                              setSelectedServices((selectedServices) => {
                                const count = selectedServices[service.label][item.name].count;

                                return {
                                  ...selectedServices,
                                  [service.label]: {
                                    ...selectedServices[service.label],
                                    [item.name]: {
                                      ...selectedServices[service.label][item.name],
                                      count: count - 1 < 1 ? count : count - 1,
                                    },
                                  },
                                };
                              })
                            }
                          >
                            <MinusSmallIcon className="h-4 w-4" />
                          </button>
                          <p className="flex h-5 w-fit min-w-[1.25rem] items-center justify-center border border-neutral-200 text-xs font-medium">
                            {selectedServices[service.label][item.name].count}
                          </p>
                          <button
                            className="-ml-[1px] flex h-5 w-5 items-center justify-center rounded rounded-l-none border border-neutral-200"
                            onClick={() =>
                              setSelectedServices((selectedServices) => {
                                const count = selectedServices[service.label][item.name].count;

                                return {
                                  ...selectedServices,
                                  [service.label]: {
                                    ...selectedServices[service.label],
                                    [item.name]: {
                                      ...selectedServices[service.label][item.name],
                                      count: count + 1,
                                    },
                                  },
                                };
                              })
                            }
                          >
                            <PlusSmallIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : null}
                      <label
                        htmlFor={item.name}
                        className="font-medium leading-none"
                      >
                        {item.name}
                      </label>
                    </div>
                    <p className="text-primary-500">{item.price}₴</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <InformationCircleIcon className="h-5 w-5 text-primary-500" />
            <p className="text-sm font-medium text-neutral-500">
              Через декілька хвилин оператор передзвонить Вам для уточнення інформації
            </p>
          </div>
          <Button
            disabled={createOrder.isPending}
            onClick={async () => {
              if (!selectedCar || !selectedAddress || !selectedDate || Object.keys(selectedServices).length === 0) {
                return;
              }

              let totalPrice = 0;

              Object.values(selectedServices).forEach((service) =>
                Object.values(service).forEach((item) => {
                  totalPrice += item.price * item.count;
                })
              );

              const data = {
                status: "На розгляданні",
                customer: `${firstName} ${lastName}`,
                phone,
                car: selectedCar,
                address: selectedAddress,
                date: selectedDate.toISOString(),
                services: selectedServices,
                total_price: totalPrice,
              };

              createOrder.run(data);
            }}
          >
            Відправити заявку
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
