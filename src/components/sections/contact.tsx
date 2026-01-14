"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormspreeAdapter } from "@/infra/message/formspree.adapter";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

import { BlockWrapper } from "@/components/layout/block-wrapper";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const adapter = new FormspreeAdapter();
      await adapter.send(values);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BlockWrapper size="medium" id="contact" className="bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center opacity-0 animate-fade-up">
          <p className="mb-2 font-medium text-primary">Get In Touch</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Let&apos;s Create Together
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-up stagger-1">
            <img
              src="/assets/contact-illustration.png"
              alt="Contact illustration"
              className="mx-auto mb-8 w-full max-w-xs animate-float"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">hello@hrabi.dev</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+216 27 797 784</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">Remote / Tunisia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-0 animate-fade-up stagger-2">
            {isSuccess ? (
              <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-soft">
                <h3 className="mb-2 text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <Button
                  variant="hero-outline"
                  className="mt-6"
                  onClick={() => setIsSuccess(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="min-h-[160px] resize-none bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="hero" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
}
