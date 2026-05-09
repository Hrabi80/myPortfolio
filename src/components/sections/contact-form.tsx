"use client";

import { sendEmail } from "@/app/actions/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
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
          description:
            "Thanks for reaching out. I will respond within 24 hours.",
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

  return (
    <>
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
                <p className="text-xs text-red-300">{errors.email.message}</p>
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
              <p className="text-xs text-red-300">{errors.subject.message}</p>
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
              <p className="text-xs text-red-300">{errors.message.message}</p>
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
      <Toaster richColors />
    </>
  );
}
