import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest, NextResponse } from "next/server";

import type { Database } from "~types/supabase";

import { transformSession } from "./session";

export const createMiddlewareSupabase = (context: { req: NextRequest; res: NextResponse }) => {
  return createMiddlewareSupabaseClient<Database>(context);
};

export const getMiddlewareSession = async (context: { req: NextRequest; res: NextResponse }) => {
  const supabase = createMiddlewareSupabase(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return transformSession(supabase, session);
};
