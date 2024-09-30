import React from "react";
import styles from "@/components/styles.module.css";

export default function LeaderboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.adminWrapper}`}>
      <div
        className={`text-black min-h-screen max-w-[3000px] mx-auto overflow-hidden p-6`}
      >
        {children}

        {/* Include shared UI here e.g. a header or sidebar */}
      </div>
    </div>
  );
}
