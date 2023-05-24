import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import type { Database } from "~types/supabase";

import { transformSession } from "./session";

export const createServerComponentSupabase = () => {
  return createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
};

export const getServerComponentSession = async () => {
  const supabase = createServerComponentSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return transformSession(supabase, session);
};
