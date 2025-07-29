import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyableTextProps {
  text: string;
  className?: string;
  withToast?: boolean;
}

export function CopyableText({
  text,
  className,
  withToast = true,
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (withToast)
        toast.success("Copied to clipboard", { position: "bottom-right" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      if (withToast)
        toast.error("Failed to copy", { position: "bottom-right" });
    }
  };

  return (
    <div
      className={clsx(
        "group flex cursor-pointer items-center gap-2",
        className,
      )}
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      <p className="text-sm hover:underline">{text}</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? (
            <Check className="text-success h-4 w-4" />
          ) : (
            <Copy className="text-muted-foreground h-4 w-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
