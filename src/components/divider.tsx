import React from "react";

export default function Divider({
  title,
  titleAlign = "center",
}: {
  title: string;
  titleAlign?: "start" | "center" | "end";
}) {
  return (
    <div className="flex w-full items-center">
      {titleAlign === "start" && (
        <>
          <span className="text-foreground shrink-0 px-4">{title}</span>
          <span className="bg-border h-px flex-1"></span>
        </>
      )}

      {titleAlign === "center" && (
        <>
          <span className="to-border h-px flex-1 bg-gradient-to-r from-transparent"></span>
          <span className="text-foreground shrink-0 px-4 text-sm">{title}</span>
          <span className="to-border h-px flex-1 bg-gradient-to-l from-transparent"></span>
        </>
      )}

      {titleAlign === "end" && (
        <>
          <span className="bg-border h-px flex-1"></span>
          <span className="text-foreground shrink-0 px-4">{title}</span>
        </>
      )}
    </div>
  );
}
