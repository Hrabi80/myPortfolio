"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { sendEmail } from "@/app/actions/send-email";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendEmail({}, formData);

      if (result.success) {
        toast.success("Message sent! 🎉", {
          description: "Thank you for reaching out. I'll respond within 24 hours!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Error sending message", {
          description: result.message || "Please try again later.",
        });
      }
    } catch (error) {
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
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/ahmed-hrabi" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/hrabi_dev" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <p className="text-primary font-medium mb-2">Get In Touch</p>
          <h2 className="font-display text-xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let&apos;s create something amazing together. 
            I&apos;m always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8 opacity-0 animate-fade-up stagger-1">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-foreground hover:text-primary transition-colors"
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

            {/* Social Links */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-card border border-border/50 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-600">Available for new projects</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 opacity-0 animate-fade-up stagger-2">
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 border border-border/50 shadow-soft"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input
                      name="name"
                      placeholder="John Doe"
                      required
                      className="bg-background border-border/50 focus:border-primary h-12 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="bg-background border-border/50 focus:border-primary h-12 rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    className="bg-background border-border/50 focus:border-primary h-12 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-background border-border/50 focus:border-primary resize-none rounded-md"
                  />
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full h-12 rounded-md" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
