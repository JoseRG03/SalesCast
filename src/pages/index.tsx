import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Planifica&nbsp;</span>
          <span className={title({ color: "violet" })}>hoy&nbsp;</span>
          <br />
          <span className={title()}>Vende mejor&nbsp;</span>
          <span className={title({ color: "violet" })}>mañana&nbsp;</span>
          <div className={subtitle({ class: "mt-4" })}>
            Anticipa las necesidades de tus clientes.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.login}
          >
            Iniciar Sesión
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            Código Fuente
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
