import React from "react";
import { LeaderBoardCards } from "./node-group-cards";

type LeaderboardProps = {
  teamPoints: Record<string, number>;
  awardedPoints: Record<string, number>;
};

const Leaderboard = ({ teamPoints, awardedPoints }: LeaderboardProps) => {
  const pointsByTeam = Object.entries(teamPoints).map(([key, value]) => ({
    team: key,
    points: value,
    awardedPoints: awardedPoints[key] ?? 0,
    totalPoints: value + (awardedPoints[key] ?? 0),
  }));
  const sortedByPoints = pointsByTeam.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  return (
    <section className="flex flex-col gap-4 rounded-lg w-full text-black dark:text-white">
      <h2 className="font-medium text-2xl text-white">Leaderboard</h2>
      <section className="flex flex-col gap-6 p-4 rounded-lg overflow-scroll border border-neutral-800 bg-zinc-800/30 from-inherit bg-gradient-to-b backdrop-blur-2xl h-full">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-200">
            <tr>
              <th className="py-1 text-gray-400">Rank</th>
              <th className="px-6 py-1">Name</th>
              <th className="px-6 py-1 text-center">Earned</th>
              <th className="px-6 py-1 text-center">Bonus</th>
              <th className="px-6 py-1 text-center">Total</th>
              <th className="px-6 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {sortedByPoints.map(({ team, points, awardedPoints, totalPoints }, index) => (
              <LeaderBoardCards
                key={`${team}-${index}`}
                teamName={team}
                index={index}
                earnedPoints={points}
                awardedPoints={awardedPoints}
                totalPoints={totalPoints}
              />
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Leaderboard;
