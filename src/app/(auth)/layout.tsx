import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "~components/logo";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="flex w-full max-w-sm flex-col items-center space-y-8">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex w-full flex-col space-y-8">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
