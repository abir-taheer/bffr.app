import { ReactNode } from "react";

export default function FlexCenter({
  children,
  fullPage,
}: {
  children: ReactNode;
  fullPage?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: fullPage ? "100vh" : "auto",
        width: fullPage ? "100vw" : "auto",
      }}
    >
      {children}
    </div>
  );
}
