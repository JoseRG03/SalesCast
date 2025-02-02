export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SalesCast",
  description: "Anticipa las necesidades de tus clientes.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  appItems: [
    {
      label: "Calendario Futuro",
      href: "/calendar",
    },
    {
      label: "Ordenes Previas",
      href: "/history",
    },
    {
      label: "Cerrar Sesión",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/JoseRG03/SalesCast",
    login: "/login",
  },
};
