import Image from "next/image";

import { services } from "~data/services";

const PricesPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <p className="text-4xl font-bold">Прайс-лист</p>

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
                  <p>{item.name}</p>
                  <p className="text-primary-500">{item.price}₴</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricesPage;
