import { notify } from "@/lib/notify";
import { useState, useCallback } from "react";

export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // fallback
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }

        setCopied(true);
        notify.success("Copied!");
        setTimeout(() => setCopied(false), timeout);
      } catch (err) {
        console.error("Copy failed:", err);
        setCopied(false);
      }
    },
    [timeout]
  );

  return { copied, copy };
}
