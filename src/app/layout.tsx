import "./globals.css";
import * as fs from "fs";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import CONFIG_DATA from "../../public/config.json";
import { AwardedPointsProvider } from "@/contexts/awarded-points-context";

const { teams } = CONFIG_DATA;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Warnet",
  description: "Warnet",
};

const initialiseTeamPoints = () => {
  const teamsJson: { [key: string]: number } = {};

  teams.forEach((team) => {
    teamsJson[team.name] = 0;
  });

  if (fs.existsSync("public/team-points.json")) {
    return;
  } else {
    fs.writeFileSync(
      "public/team-points.json",
      JSON.stringify(teamsJson, null, 2),
      "utf-8"
    );
    console.log("awarded points initialized");
  }
};

initialiseTeamPoints();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibm.variable} font-ibm`}>
        <AwardedPointsProvider>{children}</AwardedPointsProvider>
      </body>
    </html>
  );
}
