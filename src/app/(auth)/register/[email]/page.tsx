"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "~components/ui/button";
import { useSupabase } from "~lib/supabase/client";

const VerifyPage = () => {
  const params = useParams();

  const email = decodeURIComponent(params.email);

  const { supabase } = useSupabase();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <p className="text-center text-xl font-bold">
        Підтвердження електронної пошти <span>{email}</span>
      </p>
      <Button
        className="mx-auto"
        size="sm"
        disabled={loading}
        onClick={async () => {
          if (!loading) {
            setLoading(true);

            const { error } = await supabase.auth.resend({
              type: "signup",
              email,
            });

            if (error) {
              console.error(error);
            }

            setLoading(false);
          }
        }}
      >
        Відправити знову
      </Button>
    </>
  );
};

export default VerifyPage;
