"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import { GoogleButton } from "~components/ui/google-button";
import { Input } from "~components/ui/input";
import { PasswordInput } from "~components/ui/password-input";
import { useSupabase } from "~lib/supabase/client";

const LoginPage = () => {
  const { supabase } = useSupabase();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <p className="text-center text-xl font-bold">Вхід до особистого кабінету</p>

      <GoogleButton
        className="w-full"
        disabled={loading}
        onClick={async () => {
          if (!loading) {
            setLoading(true);

            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
              },
            });

            if (error) {
              setLoading(false);

              console.error(error);
            }
          }
        }}
      >
        Вхід через Google
      </GoogleButton>

      <div className="relative flex items-center justify-center border-b-2 border-b-neutral-200">
        <p className="absolute bg-white p-2 text-neutral-500">або</p>
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!loading) {
            setLoading(true);

            const { email, password } = Object.fromEntries(new FormData(event.currentTarget).entries()) as {
              email: string;
              password: string;
            };

            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              setLoading(false);

              console.error(error);
            }
          }
        }}
      >
        <Input
          name="email"
          type="email"
          placeholder="Електронна пошта"
        />

        <PasswordInput
          name="password"
          placeholder="Пароль"
        />

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none"
            >
              Запам&apos;ятати мене
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-500 hover:underline"
          >
            Забули пароль?
          </Link>
        </div>

        <Button
          className="w-full"
          type="submit"
          size="sm"
          disabled={loading}
        >
          Увійти
        </Button>
      </form>
      <p className="text-center text-sm">
        Немає особистого кабінету?&nbsp;
        <Link
          href="/register"
          className="text-sm font-medium text-primary-500 hover:underline"
        >
          Зареєструватися
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
