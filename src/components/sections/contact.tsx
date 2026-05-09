import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { ContactFormLoader } from "./contact-form-loader";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hrabi.ahmed8@gmail.com",
      href: "mailto:hrabi.ahmed8@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+216 27 797 784",
      href: "tel:+21627797784",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote / Tunisia",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Hrabi80" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ahmed-hrabi",
    },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/hrabi_dev" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 iso-grid opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center opacity-0 animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Get in touch
          </p>
          <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
            Let&apos;s build something{" "}
            <span className="text-gradient-primary">reliable</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Share the product, platform, or website you want to build. I am
            open to freelance and full-time opportunities with teams in Tunisia
            and remote-first companies.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 rounded-xl border border-border surface-2 p-4 transition-all hover:border-primary/40"
                  style={{ boxShadow: "var(--shadow-elevate-1)" }}
                >
                  <div className="grid size-11 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border surface-2 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Connect
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-11 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <social.icon className="size-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                Available for selected projects
              </span>
            </div>
          </div>

          <ContactFormLoader />
        </div>
      </div>
    </section>
  );
}
