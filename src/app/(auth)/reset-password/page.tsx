"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { PasswordInput } from "~components/ui/password-input";
import { useSupabase } from "~lib/supabase/client";

const ResetPasswordPage = () => {
  const router = useRouter();

  const { supabase } = useSupabase();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col text-center">
        <p className="text-xl font-bold">Зміна пароля</p>
        <p className="text-sm text-neutral-500">Введіть новий пароль</p>
      </div>

      <form
        className="flex flex-col space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!loading) {
            setLoading(true);

            const { password } = Object.fromEntries(new FormData(event.currentTarget).entries()) as {
              password: string;
            };

            const { error } = await supabase.auth.updateUser({
              password,
            });

            if (error) {
              setLoading(false);

              console.error(error);
            } else {
              router.push("/settings");
            }
          }
        }}
      >
        <PasswordInput
          name="password"
          placeholder="Новий пароль"
        />

        <Button
          className="w-full"
          type="submit"
          size="sm"
          disabled={loading}
        >
          Змінити пароль
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
