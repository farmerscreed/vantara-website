"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PARTNERSHIPS, SITE } from "@/lib/constants";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  organization: z.string().min(2, "Please enter your organization"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  interestArea: z.string().min(1, "Please select an interest area"),
  message: z.string().min(10, "Please share a little more context (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "submitting" | "success" | "error";

export function PartnershipForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      organization: "",
      email: "",
      phone: "",
      interestArea: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setErrorMsg(null);

    if (!FORMSPREE_ID) {
      // Graceful fallback during local dev / before Formspree is configured.
      setErrorMsg(
        `Form endpoint is not configured. Please email ${SITE.email} directly.`,
      );
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          organization: values.organization,
          email: values.email,
          phone: values.phone || "",
          interestArea: values.interestArea,
          message: values.message,
          _subject: `[Vantara] Partnership inquiry — ${values.interestArea}`,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { errors?: Array<{ message: string }> } | null;
        const message = data?.errors?.[0]?.message ?? "Submission failed. Please try again.";
        throw new Error(message);
      }

      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-gold/5 p-10 text-center">
        <p className="font-display text-2xl italic text-gold">{PARTNERSHIPS.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2" noValidate>
      <Input
        label="Full Name"
        autoComplete="name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <Input
        label="Organization"
        autoComplete="organization"
        {...register("organization")}
        error={errors.organization?.message}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <div className="md:col-span-2">
        <Select
          label="Interest Area"
          options={PARTNERSHIPS.interestAreas}
          {...register("interestArea")}
          error={errors.interestArea?.message}
        />
      </div>
      <div className="md:col-span-2">
        <Textarea
          label="Message"
          {...register("message")}
          error={errors.message?.message}
        />
      </div>

      {errorMsg && (
        <p className="md:col-span-2 text-sm text-red-300" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="md:col-span-2">
        <Button type="submit" variant="gold" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : PARTNERSHIPS.submitLabel}
        </Button>
      </div>
    </form>
  );
}
