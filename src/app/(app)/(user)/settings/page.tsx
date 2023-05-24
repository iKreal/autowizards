"use client";

import { useSupabase } from "~lib/supabase/client";

const SettingsPage = () => {
  const { session } = useSupabase();

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <p className="text-4xl font-bold">Персональні дані</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-500">Ім&apos;я</p>
            <input
              className="w-full text-xl focus-visible:outline-none"
              type="text"
              aria-label="Ім'я"
              value={session?.user.first_name || "N/A"}
              readOnly
            />
          </div>
          <div>
            <p className="text-neutral-500">Прізвище</p>
            <input
              className="w-full text-xl focus-visible:outline-none"
              type="text"
              aria-label="Прізвище"
              value={session?.user.last_name || "N/A"}
              readOnly
            />
          </div>
          <div>
            <p className="text-neutral-500">Номер телефону</p>
            <input
              className="w-full text-xl focus-visible:outline-none"
              type="text"
              aria-label="Номер телефону"
              value={session?.user.phone || "N/A"}
              readOnly
            />
          </div>
          <div>
            <p className="text-neutral-500">Електронна пошта</p>
            <input
              className="w-full text-xl focus-visible:outline-none"
              type="email"
              aria-label="Електронна пошта"
              value={session?.user.email || "N/A"}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <p className="text-4xl font-bold">Пароль</p>
        <div>
          <p className="text-neutral-500">Змінити пароль</p>
          <input
            className="w-full text-xl focus-visible:outline-none"
            type="password"
            aria-label="Електронна пошта"
            value="123456789"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
