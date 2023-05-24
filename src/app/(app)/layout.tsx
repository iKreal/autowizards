"use client";

import {
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  PlusIcon,
  QueueListIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Logo } from "~components/logo";
import { Button } from "~components/ui/button";
import { useSupabase } from "~lib/supabase/client";
import { cn } from "~lib/utils";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const { supabase, session } = useSupabase();

  return (
    <>
      <header className="fixed top-0 z-40 flex h-[112px] w-full items-center bg-neutral-950 pr-[var(--removed-body-scroll-bar-size)]">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-8">
          <div className="min-w-[20rem]">
            <Logo dark />
          </div>

          {session?.user.is_admin ? null : (
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="text"
                className="text-white"
              >
                <Link href="/settings">
                  <UserCircleIcon className="h-6 w-6" />
                  <span>{session?.user.full_name}</span>
                </Link>
              </Button>
              <Button asChild>
                <Link href="/new-order">
                  <PlusIcon className="h-6 w-6" />
                  <span>Нова заявка</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="mt-[112px] min-h-screen">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 gap-16 px-4 py-8">
          <div className="flex flex-col">
            {(session?.user.is_admin
              ? [
                  {
                    label: "Мій акаунт",
                    href: "/settings",
                    icon: UserIcon,
                  },
                  {
                    label: "Заявки на запис",
                    href: "/order-requests",
                    icon: QueueListIcon,
                  },
                  {
                    label: "Історія замовлень",
                    href: "/orders-history",
                    icon: ClipboardDocumentListIcon,
                  },
                  {
                    label: "Клієнти",
                    href: "/customers",
                    icon: UsersIcon,
                  },
                ]
              : [
                  {
                    label: "Мій акаунт",
                    href: "/settings",
                    icon: UserIcon,
                  },
                  {
                    label: "Мої обслуговування",
                    href: "/orders",
                    icon: ShoppingCartIcon,
                  },
                  {
                    label: "Прайс-лист",
                    href: "/prices",
                    icon: CurrencyDollarIcon,
                  },
                  {
                    label: "Нова заявка",
                    href: "/new-order",
                    icon: PlusCircleIcon,
                  },
                ]
            ).map((link) => (
              <Link
                className={cn(
                  "-ml-4 flex items-center space-x-2 rounded px-4 py-2 font-medium",
                  pathname === link.href && "bg-primary-100"
                )}
                key={link.href}
                href={link.href}
              >
                <link.icon className="h-5 w-5 text-primary-500" />
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="h-8" />
            <button
              className="-ml-4 flex items-center space-x-2 rounded px-4 py-2 font-medium"
              onClick={() => supabase.auth.signOut()}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-primary-500" />
              <span>Вийти</span>
            </button>
          </div>

          <div className="col-span-2">{children}</div>
        </div>
      </main>

      <footer className="mt-16 flex w-full items-center bg-neutral-950 text-neutral-50">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 px-4 py-12">
          <div className="flex items-center space-x-8">
            <Logo dark />
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

export default AppLayout;
