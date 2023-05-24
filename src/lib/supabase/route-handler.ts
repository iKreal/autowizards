import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import type { Database } from "~types/supabase";

import { transformSession } from "./session";

export const createRouteHandlerSupabase = () => {
  return createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
};

export const getRouteHandlerSession = async () => {
  const supabase = createRouteHandlerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return transformSession(supabase, session);
};
