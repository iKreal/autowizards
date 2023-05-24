import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~components/ui/dialog";
import { services } from "~data/services";

const IndexPage = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-12 space-y-4">
          <div className="col-span-7 flex flex-col space-y-8 py-40">
            <p className="text-5xl font-bold">
              Швидкий та якісний ремонт <br /> Вашого автомобіля <br />
              будь-якої складності
            </p>
            <p className="text-lg font-medium">
              Довірте свій автомобіль професіоналам! Ми - ваш автосервіс №1,
              <br /> готові вирішити всі проблеми на шляху до бездоганної автоподорожі!
            </p>

            <div className="flex items-center space-x-6">
              <Button asChild>
                <Link href="/new-order">Записатися на техогляд</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Онлайн-консультація</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Контактна інформація</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Адреса:</p>
                        <p>
                          м.Харків, <br /> Проспект Перемоги, буд. 55Е
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Графік роботи:</p>
                        <p>
                          10:00 - 19:00 <br /> Без вихідних
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Телефон:</p>
                        <p>
                          +38 (050) 111-11-11 <br /> +38 (063) 222-22-22
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p className="font-semibold">Інші контакти:</p>
                        <div>
                          {[
                            {
                              value: "autowizards@gmail.com",
                              imageSrc: "/gmail-icon.svg",
                              imageAlt: "Gmail",
                            },
                            {
                              value: "@autowizards_service",
                              imageSrc: "/telegram-icon.svg",
                              imageAlt: "Telegram",
                            },
                          ].map((social, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Image
                                priority
                                src={social.imageSrc}
                                alt={social.imageAlt}
                                width={24}
                                height={24}
                              />
                              <p>{social.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      asChild
                      size="sm"
                    >
                      <Link href="/new-order">Записатися на техогляд</Link>
                    </Button>
                    <p className="text-sm font-medium text-neutral-500">
                      Якщо оператор не прийняв дзвінок, він зателефонує Вам через декілька хвилин
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="relative col-span-5 h-fit w-full">
            <Image
              className="bg-cover bg-center"
              priority
              src="/mechanic-1.png"
              alt="Mechanic"
              width={2280}
              height={2800}
            />
            <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-white" />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-8"
      >
        <div className="flex flex-col justify-center space-y-4 text-center">
          <p className="text-5xl font-bold">Послуги</p>
          <p className="text-lg font-medium">
            Довірте свій автомобіль професіоналам – ми повернемо йому життя на дорозі!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex flex-col items-center justify-between space-y-4 rounded border p-8 text-center shadow-sm"
            >
              <div className="flex flex-col items-center space-y-4">
                <Image
                  priority
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={120}
                  height={120}
                />
                <p className="text-2xl font-bold">{service.label}</p>
                <p>{service.description}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Детальніше</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{service.label}</DialogTitle>
                  </DialogHeader>
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
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-we-work"
        className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-8"
      >
        <div className="flex flex-col justify-center space-y-4 text-center">
          <p className="text-5xl font-bold">Як ми працюємо</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-8">
            {[
              {
                number: "01",
                label: "Заявка",
                description: "Відправте нам Вашу заявку, заповнивши форму на сайті, або через мобільний телефон",
              },
              {
                number: "02",
                label: "Запис",
                description:
                  "Консультуємо клієнтів, визначаємо дату та час обслуговування Вашого автомобіля, а також приблизну вартість послуг",
              },
              {
                number: "03",
                label: "Обслуговування",
                description: "Виконуємо діагностику або ремонт Вашого автомобіля в нашому автосервісі",
              },
              {
                number: "04",
                label: "Перевірка роботи",
                description:
                  "Майстер повідомляє про виконання послуги, клієнт оглядає автомобіль та оцінює проведену роботу",
              },
              {
                number: "05",
                label: "Оплата",
                description: "Після огляду автомобіля клієнт оплачує послугу готівковим чи безготівковим способом",
              },
            ].map((step) => (
              <div
                key={step.label}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-4">
                  <p className="text-5xl font-extrabold text-primary-500">{step.number}</p>
                  <p className="text-3xl font-bold">{step.label}</p>
                </div>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <Image
            priority
            src="/how-we-work-car.png"
            alt="Red car top view"
            width={380}
            height={890}
          />
        </div>
      </section>

      <section
        id="stuff"
        className="flex w-full flex-col items-center justify-center overflow-hidden bg-neutral-100"
      >
        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-16">
          <Image
            priority
            className="absolute -left-[310px] bottom-0"
            src="/mechanic-2.png"
            alt=""
            width={480}
            height={3012}
          />

          <Image
            priority
            className="absolute -right-[310px] bottom-0 -scale-x-100"
            src="/mechanic-1.png"
            alt=""
            width={550}
            height={2800}
          />

          <div className="z-10 flex flex-col justify-center space-y-4 text-center">
            <p className="text-5xl font-bold">Персонал</p>
            <p className="text-lg font-medium">В наших майстернях працюють досвідчені та перевірені спеціалісти</p>
          </div>

          <div className="z-10 grid grid-cols-3 gap-8">
            {[
              {
                name: "Олександр",
                role: "Автомеханік",
                experience: "10 років",
                specialization:
                  "технічне обслуговування та ремонт різних систем автомобіля, таких як двигун, підвіска, гальмівна система, електрична система та ін. Діагностика, ремонт та заміна несправних деталей, налаштування та регулювання систем.",
              },
              {
                name: "Антон",
                role: "Автоелектрик",
                experience: "8 років",
                specialization:
                  "діагностика та ремонт електричних систем автомобіля, таких як система запалювання, система зарядки, система пуску, системи освітлення та інші електричні компоненти.",
              },
              {
                name: "Роман",
                role: "Кузовник",
                experience: "6 років",
                specialization:
                  "ремонт кузова автомобіля, включаючи видалення вм'ятин, фарбування, заміна деталей кузова та скла, а також відновлення зовнішнього вигляду автомобіля після аварій та пошкоджень.",
              },
              {
                name: "Микола",
                role: "Фахівець з діагностики",
                experience: "9 років",
                specialization:
                  "діагностика з використанням сучасних діагностичних інструментів та обладнання, а також ремонт електронних систем та компонентів автомобіля, таких як системи упорскування палива, системи керування двигуном, антиблокувальні системи та ін.",
              },
              {
                name: "Петро",
                role: "Шиномонтажник",
                experience: "5 років",
                specialization:
                  "заміна, ремонт та балансування шин, встановлення нових шин на автомобіль, а також сезонне зберігання коліс.",
              },
              {
                name: "Анастасія",
                role: "Менеджер",
                experience: "5 років",
                specialization:
                  "прийом та оформлення замовлень від клієнтів, координація та організація роботи майстрів та інших фахівців на СТО, контроль за якістю виконання ремонтних робіт, проведення контрольних перевірок та тестування автомобілів перед здаванням клієнтам.",
              },
            ].map((person, index) => (
              <div
                key={index}
                className="flex flex-col justify-between space-y-4 rounded border bg-white p-8 shadow-sm"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <p className="text-2xl font-bold">{person.name}</p>
                    <p className="text-sm font-medium text-neutral-500">{person.role}</p>
                  </div>
                  <p>
                    <span className="font-bold">Стаж: </span>
                    {person.experience}
                  </p>
                  <p>
                    <span className="font-bold">Спеціалізація: </span>
                    {person.specialization}
                  </p>
                </div>

                <Button
                  asChild
                  className="self-end"
                  variant="ghost"
                >
                  <Link href="/new-order">Записатися онлайн</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="reviews"
        className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-8"
      >
        <div className="flex flex-col justify-center space-y-4 text-center">
          <p className="text-5xl font-bold"> Відгуки клієнтів</p>
          <p className="text-lg font-medium">Допоможіть нам покращити якість обслуговування</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {[
            {
              customer: {
                avatarSrc: "/roman-goslenko-avatar.png",
                avatarFallback: "РГ",
                name: "Роман Госленко",
                car: "Toyota Camry",
              },
              rating: 5,
              feedback:
                "«Відремонтував машину на автосервісі, і залишився задоволений! Хлопці на сто були професійними та оперативно виправили поломку. Обслуговування було доброзичливим, а ціна ремонту була розумною. Моя машина знову на дорозі і їде як нова. Велике спасибі автосервісу за їхню відмінну роботу!",
              type: "Ремонт підвіски та гальмівної системи",
            },
            {
              customer: {
                avatarSrc: "/petro-yakubov-avatar.png",
                avatarFallback: "ПЯ",
                name: "Петро Якубов",
                car: "Mercedes-Benz C-Class",
              },
              rating: 5,
              feedback:
                "«Робив ремонт двигуна, і результат мене приємно здивував! Майстри професійно та швидко усунули поломку, ціна була адекватною. Обслуговування на високому рівні, персонал доброзичливий та уважний. Радий, що вибрав їх для ремонту мого автомобіля. Велике спасибі!»",
              type: "Діагностика та ремонт двигуна",
            },
            {
              customer: {
                avatarSrc: "/olena-duda-avatar.png",
                avatarFallback: "ОД",
                name: "Олена Дуда",
                car: "Nissan Pathfinder",
              },
              rating: 5,
              feedback:
                "«Дуже задоволена ремонтом моєї машини! Роман професійно та швидко впорався з не маленькою подряпиною на машині. Особливо приємно, що менеджер врахував мої питання та надав докладні пояснення про виконану роботу. Обслуговування було привітним і ціна ремонту виявилася в межах розумного. Тепер моя машина знову у відмінному стані, дякую автосервісу!»",
              type: "Кузовний ремонт",
            },
            {
              customer: {
                avatarSrc: "/glib-michalenko-avatar.png",
                avatarFallback: "ГМ",
                name: "Гліб Михаленко",
                car: "Audi Q5",
              },
              rating: 5,
              feedback:
                "«Змінював колеса на цьому автосервісі і залишився задоволеним! Обслуговування було швидким та професійним, хлопці шиномонтажники оперативно впоралися з роботою. Шини були встановлені акуратно, а балансування виконане якісно. Обслуговування клієнтів на високому рівні, персонал був ввічливим та доброзичливим. Рекомендую робити шиномонтаж тут усім, кому потрібна заміна коліс на автомобілі!»",
              type: "Шиномонтажні послуги",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 rounded border bg-white p-8 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={review.customer.avatarSrc}
                      alt={review.customer.name}
                    />
                    <AvatarFallback>{review.customer.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold">{review.customer.name}</p>
                    <p className="text-sm font-medium text-neutral-500">{review.customer.car}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    {Array(review.rating)
                      .fill(null)
                      .map((_, index) => (
                        <StarIcon
                          className="h-5 w-5 text-yellow-500"
                          key={index}
                        />
                      ))}
                  </div>
                  <p className="text-sm font-medium text-neutral-500">{review.type}</p>
                </div>
              </div>

              <p>{review.feedback}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="address"
        className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-8"
      >
        <p className="text-5xl font-bold">Контактна інформація</p>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-7 flex flex-col space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-bold">Адреса:</p>
                <p>
                  м.Харків, <br /> Проспект Перемоги, буд. 55Е
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-bold">Графік роботи:</p>
                <p>
                  10:00 - 19:00 <br /> Без вихідних
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-bold">Телефон:</p>
                <p>
                  +38 (050) 111-11-11 <br /> +38 (063) 222-22-22
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-bold">Інші контакти:</p>
                <div>
                  {[
                    {
                      value: "autowizards@gmail.com",
                      imageSrc: "/gmail-icon.svg",
                      imageAlt: "Gmail",
                    },
                    {
                      value: "@autowizards_service",
                      imageSrc: "/telegram-icon.svg",
                      imageAlt: "Telegram",
                    },
                  ].map((social, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <Image
                        priority
                        src={social.imageSrc}
                        alt={social.imageAlt}
                        width={24}
                        height={24}
                      />
                      <p>{social.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href="/new-order">Записатися на техогляд</Link>
            </Button>
            <p className="text-sm font-medium text-neutral-500">
              Якщо оператор не прийняв дзвінок, він зателефонує Вам через декілька хвилин
            </p>
          </div>

          <div className="relative col-span-5">
            <Image
              className="absolute -right-[20px] -top-[80px]"
              priority
              src="/map.png"
              alt="Map"
              width={3024}
              height={3004}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
