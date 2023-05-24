"use client";

import { QueueListIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "~components/logo";
import { Button } from "~components/ui/button";
import { useSupabase } from "~lib/supabase/client";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  const { session } = useSupabase();

  return (
    <>
      <header className="fixed top-0 z-40 flex h-[112px] w-full items-center bg-white/80 pr-[var(--removed-body-scroll-bar-size)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-8">
          <div className="min-w-[20rem]">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            {[
              {
                label: "Головна",
                href: "/",
              },
              {
                label: "Адреса",
                href: "/#address",
              },
              {
                label: "Послуги",
                href: "/#services",
              },
              {
                label: "Персонал",
                href: "/#stuff",
              },
              {
                label: "Відгуки",
                href: "/#reviews",
              },
            ].map((link) => (
              <Link
                className="font-medium"
                key={link.href}
                href={link.href}
                prefetch={false}
                scroll={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-[20rem] items-center justify-end space-x-4">
            {session?.user.is_admin ? (
              <Button asChild>
                <Link href="/order-requests">
                  <QueueListIcon className="h-6 w-6" />
                  <span>Заявки</span>
                </Link>
              </Button>
            ) : session?.user ? (
              <>
                <Button
                  asChild
                  variant="text"
                >
                  <Link href="/settings">
                    <UserCircleIcon className="h-6 w-6" />
                    <span>{session.user.full_name}</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/orders">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span>Кошик</span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="text"
                >
                  <Link href="/login">Увійти</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Зареєструватися</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mt-[112px] flex min-h-screen flex-col space-y-8">{children}</main>

      <footer className="mt-16 flex w-full items-center bg-neutral-950 text-neutral-50">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-12">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Logo dark />
            </Link>
            {[
              {
                label: "Послуги",
                href: "/#services",
              },
              {
                label: "Персонал",
                href: "/#stuff",
              },
              {
                label: "Відгуки",
                href: "/#reviews",
              },
            ].map((link) => (
              <Link
                className="font-medium text-neutral-500"
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-end justify-between">
            <p className="text-sm font-medium text-neutral-500">
              © 2023 Вміст цього веб-сайту захищений авторським правом і належить Autowizards.com
            </p>
            <p className="text-sm font-medium text-neutral-500">Сайт розробив Kirill Nikolov</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MarketingLayout;
