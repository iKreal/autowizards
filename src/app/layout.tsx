import "~styles/globals.css";

import type { ReactNode } from "react";

import { fontSans } from "~lib/fonts";
import { SupabaseProvider } from "~lib/supabase/client";
import { getServerComponentSession } from "~lib/supabase/server-component";
import { cn } from "~lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autowizards App",
  description: "Autowizards App"
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerComponentSession();

  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth border-neutral-200 bg-white font-sans text-neutral-900 antialiased",
        fontSans.variable
      )}
    >
      <body>
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
