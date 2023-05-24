"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { useSupabase } from "~lib/supabase/client";

const ForgotPasswordPage = () => {
  const { supabase } = useSupabase();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col text-center">
        <p className="text-xl font-bold">Відновлення пароля</p>
        <p className="text-sm text-neutral-500">
          Для відновлення пароля введіть свою пошту, щоб ми змогли відправити вам код підтвердження
        </p>
      </div>

      <form
        className="flex flex-col space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!loading) {
            setLoading(true);

            const { email } = Object.fromEntries(new FormData(event.currentTarget).entries()) as {
              email: string;
            };

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
            });

            if (error) {
              console.error(error);
            }

            setLoading(false);
          }
        }}
      >
        <Input
          name="email"
          type="email"
          placeholder="Електронна пошта"
        />

        <Button
          className="w-full"
          type="submit"
          size="sm"
          disabled={loading}
        >
          Відновити пароль
        </Button>
      </form>

      <Link
        href="/login"
        className="flex w-fit items-center space-x-2 text-sm font-medium text-primary-500 hover:underline"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Повернутися до входу</span>
      </Link>
    </>
  );
};

export default ForgotPasswordPage;
