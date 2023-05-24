"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import { GoogleButton } from "~components/ui/google-button";
import { Input } from "~components/ui/input";
import { PasswordInput } from "~components/ui/password-input";
import { useSupabase } from "~lib/supabase/client";

const RegisterPage = () => {
  const router = useRouter();

  const { supabase } = useSupabase();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <p className="text-center text-xl font-bold">Реєстрація особистого кабінету</p>

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

            const { firstName, lastName, email, password } = Object.fromEntries(
              new FormData(event.currentTarget).entries()
            ) as {
              firstName: string;
              lastName: string;
              email: string;
              password: string;
            };

            const { error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
                data: {
                  name: `${firstName} ${lastName}`,
                },
              },
            });

            if (error) {
              setLoading(false);

              console.error(error);
            } else {
              router.push(`/register/${email}`);
            }
          }
        }}
      >
        <div className="flex space-x-4">
          <Input
            name="firstName"
            type="text"
            placeholder="Ім'я"
          />

          <Input
            name="lastName"
            type="text"
            placeholder="Прізвище"
          />
        </div>

        <Input
          name="email"
          type="email"
          placeholder="Електронна пошта"
        />

        <PasswordInput
          name="password"
          placeholder="Пароль"
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none"
          >
            Я згоден(на) із&nbsp;
            <Link
              href="/policy"
              className="font-medium text-primary-500 hover:underline"
            >
              політикою конфіденційності
            </Link>
          </label>
        </div>

        <Button
          className="w-full"
          type="submit"
          size="sm"
          disabled={loading}
        >
          Зареєструватися
        </Button>
      </form>

      <p className="text-center text-sm">
        Вже маєте обліковий запис?&nbsp;
        <Link
          href="/login"
          className="text-sm font-medium text-primary-500 hover:underline"
        >
          Увійти
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
