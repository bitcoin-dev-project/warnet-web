import "./globals.css";
import * as fs from "fs";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import QueryProvider from "@/app/providers";
import { AwardedPointsProvider } from "@/contexts/awarded-points-context";
import { EVENT, InternalData } from "@/types";
import path from "path";
import { createTeamPoints } from "@/helpers";
import { getConfig } from "@/config/filesystem";

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

const initialiseTeamPoints = async () => {
  const config = await getConfig();
  if (config instanceof Error) {
    return ;
  }
  const {teams} = config;
  const teamPoints = createTeamPoints(teams);
  const teamPath = path.join(process.cwd(), "data", "team-points.json");
  if (fs.existsSync(teamPath)) {
    try {
      return JSON.parse(fs.readFileSync(teamPath, "utf-8"));
    } catch (error) {
      return teamPoints;
    }
  } else {
    fs.writeFileSync(
      teamPath,
      JSON.stringify(teamPoints, null, 2),
      "utf-8"
    );
    return teamPoints;
  }
};

const initialiseEvents = (): EVENT[] => {
  const defaultEventsJson: EVENT[] = [{ message: "initial event", date: "2024-09-25T12:00:00.000Z" }];

  const eventsPath = path.join(process.cwd(), "data", "events.json");
  if (fs.existsSync(eventsPath)) {
    try {
      const eventsJson = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
      return eventsJson;
    } catch (error) {
      return defaultEventsJson;
    }
  } else {
    fs.writeFileSync(
      eventsPath,
      JSON.stringify(defaultEventsJson, null, 2),
      "utf-8"
    );
    return defaultEventsJson
  }
};

// const internalData: InternalData = {
//   points: initialiseTeamPoints(),
//   events: initialiseEvents(),
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await initialiseTeamPoints();
  await initialiseEvents();
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibm.variable} font-ibm`}>
        <QueryProvider>
          <AwardedPointsProvider>{children}</AwardedPointsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
