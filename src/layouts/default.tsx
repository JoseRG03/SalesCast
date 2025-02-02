import { Link } from "@heroui/link";
import { NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navBarItems = siteConfig.navItems.map((item) => (
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
      <Navbar items={navBarItems} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
