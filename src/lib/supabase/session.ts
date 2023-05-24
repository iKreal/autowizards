import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const transformSession = async (supabase: SupabaseClient, session: Session | null) => {
  if (!session) {
    return null;
  }

  const full_name = (session.user.user_metadata.name || "") as string;

  const [first_name, last_name] = full_name.split(" ");

  const is_admin = await supabase.from("admins").select("*").eq("id", session.user.id);

  return {
    ...session,
    user: {
      ...session.user,
      full_name,
      first_name,
      last_name,
      is_admin: Boolean(is_admin.data?.length),
    },
  };
};

export type TransformedSession = Awaited<ReturnType<typeof transformSession>>;
