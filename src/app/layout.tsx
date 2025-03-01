import type { Metadata } from "next";
import "./globals.css";
import { JobProvider } from "./Context/JobContext";
import { AuthProvider } from "./Context/AuthContext";


export const metadata: Metadata = {
  title: "Job-Match",
  description: "Job-Match-Dashboard",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=''
      >
        <AuthProvider>
          <JobProvider>
            {children}
          </JobProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
