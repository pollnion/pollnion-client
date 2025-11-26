"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Box from "@/components/custom/layout/box";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

export default function EmailVerificationPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Box
        className="w-full max-w-md space-y-6 p-8 text-center"
        color="background"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <Typography className="text-2xl font-bold">
            Check Your Email
          </Typography>
          <Typography variant="muted" className="text-base">
            We&apos;ve sent you a verification link to your email address.
            Please check your inbox and click the link to verify your account.
          </Typography>
        </div>

        <div className="space-y-3">
          <Typography variant="muted" className="text-sm">
            Didn&apos;t receive the email? Check your spam folder or try signing
            up again.
          </Typography>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <Typography variant="muted" className="text-xs">
            Once verified, you&apos;ll be able to sign in and access all
            features of Pollnion.
          </Typography>
        </div>
      </Box>
    </div>
  );
}
