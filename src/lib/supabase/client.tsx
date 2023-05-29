"use client";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Database } from "~types/supabase";

import type { TransformedSession } from "./session";

export interface SupabaseContextValue {
  supabase: SupabaseClient<Database>;
  session: TransformedSession | null;
}

export const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export const SupabaseProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: TransformedSession | null;
}) => {
  const router = useRouter();

  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (session?.access_token !== newSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, session?.access_token]);

  const context = useMemo(
    () => ({
      supabase,
      session,
    }),
    [supabase, session]
  );

  return <SupabaseContext.Provider value={context}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("`useSupabase` must be used inside `SupabaseProvider`");
  }

  return context;
};
