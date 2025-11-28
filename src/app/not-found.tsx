"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Box from "@/components/custom/layout/box";
import { Typography } from "@/components/custom/typography";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flow="col"
      className="min-h-screen items-center justify-center gap-6 px-4"
    >
      <Box
        display="flex"
        flow="col"
        className="items-center gap-4 text-center max-w-md"
      >
        {/* 404 Number */}
        <Typography className="text-8xl font-bold text-primary">404</Typography>

        {/* Error Message */}
        <Box display="flex" flow="col" className="gap-2">
          <Typography className="text-2xl font-semibold">
            Page Not Found
          </Typography>
          <Typography variant="muted" className="text-base">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or doesn&apos;t exist.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" className="gap-3 mt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="min-w-[120px]"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button className="min-w-[120px]">Go Home</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
