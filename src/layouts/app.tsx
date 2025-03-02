import { Link } from "@heroui/link";
import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { NavbarItem } from "@heroui/navbar";
import clsx from "clsx";
import { link as linkStyles } from "@heroui/theme";

export default function AppLayout({
  children,
  titleText,
  trailingContent,
}: {
  children: ReactNode;
  titleText?: String;
  trailingContent?: ReactNode;
}) {

  const navBarItems = siteConfig.appItems.map((item) => (
    <NavbarItem key={item.href}>
      <Link
        className={clsx(
          linkStyles({ color: "foreground" }),
          "data-[active=true]:text-primary data-[active=true]:font-medium",
        )}
        color="foreground"
        href={item.href}
      >
        {item.label}
      </Link>
    </NavbarItem>
  ));

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar items={navBarItems}/>

      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-10">
        <section className="flex justify-between">
          {titleText && (
            <span className="text-3xl font-bold print:hidden">
              {titleText}&nbsp;
            </span>
          )}
          {trailingContent && (
            <span className="ml-auto">{trailingContent}</span>
          )}
        </section>

        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <span className="text-default-600 print:hidden">Powered by</span>
          <p className="text-primary print:hidden">HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
