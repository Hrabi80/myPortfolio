"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { sendEmail } from "@/app/actions/send-email";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    try {
      const result = await sendEmail({}, formData);

      if (result.success) {
        toast.success("Message sent", {
          description: "Thanks for reaching out. I will respond within 24 hours.",
        });
        reset();
      } else {
        toast.error("Error sending message", {
          description: result.message || "Please try again later.",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border border-border surface-2 p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-elevate-2)" }}
          >
            <h3 className="font-display text-2xl text-foreground">
              Send a message
            </h3>

            <div className="mt-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="John Doe"
                    className="h-12 rounded-md border-border/70 bg-background/70"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-300">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 rounded-md border-border/70 bg-background/70"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  {...register("subject")}
                  placeholder="Project inquiry"
                  className="h-12 rounded-md border-border/70 bg-background/70"
                />
                {errors.subject && (
                  <p className="text-xs text-red-300">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="resize-none rounded-md border-border/70 bg-background/70"
                />
                {errors.message && (
                  <p className="text-xs text-red-300">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="h-12 w-full"
                disabled={isSubmitting}
              >
                <Send className="size-4" aria-hidden="true" />
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
