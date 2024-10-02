import { NodeData } from "@/node";
import { GameConfig, HeaderInfoData, NodeDataWithStatus } from "@/types";
import { StatusCofigType } from "@/app/config";
import { getConfig } from "@/app/config";

export const getLatestTipHeight = ({header_infos}: {header_infos: HeaderInfoData[] | []}) => {
  const latestTipHeight = Math.max(...header_infos.map((item) => item?.height ?? 0));

  return { latestTipHeight };
};

export const organiseNodesIntoTeams = <K>({nodes, teams, formatNode}: {nodes: NodeData[], teams: GameConfig["teams"], formatNode: (teamNode: NodeData) => K}) => {
  const nodeGroups: Record<string, K[]> = {};

  for (const team of teams) {
    const group = team.name;

    if (!nodeGroups[group]) {
      nodeGroups[group] = [] as K[];
    }

    team.nodes.forEach((nodeName) => {
      const teamNodeExists = nodes.find((item) => item.name === nodeName);
      if (!teamNodeExists) return;
      const compiledNode = formatNode(teamNodeExists);
      nodeGroups[group].push(compiledNode);
    });
  }

  return { nodeGroups };
};

export const compileTeamNode = (teamNode: NodeData, latestTipHeight: number): NodeDataWithStatus => {
  const { points_config, config } = getConfig();
  const { reachable, tips, version } = teamNode;
    const extraStats: {
      status: StatusCofigType;
      score: number;
    } = {
      status: "reachable",
      score: 0,
    }

    if (!reachable) {
      extraStats.status = "unreachable";
      extraStats.score = points_config.points_per_unreachable_node;
    } else {
      const isLagging = isNodeLagging(tips[0].height, latestTipHeight, config);
      if (isLagging) {
        extraStats.status = "lagging";
        extraStats.score = points_config.points_per_lagging_node;
      }
    }

    const versionNumberString = getVersionNumber(version);
    if (versionNumberString) {
      const score_for_version = points_config.core_version[version] ?? 0 ;
        if (score_for_version) {
          extraStats.score += score_for_version;
        }
    }
    return {...teamNode, ...extraStats};
};

export const getVersionNumber = (version: string) => {
  return version.split(":")[1].split("/")[0] ?? false;
}

export const isNodeLagging = (nodeHeight: number, latestTipHeight: number, config: GameConfig["config"]) => {
  return nodeHeight <= latestTipHeight - config.blocks_behind_before_considered_lagging;
}

type RelativeTimeUnit = Intl.RelativeTimeFormatUnit;
interface TimeUnit {
  unit: RelativeTimeUnit;
  seconds: number;
}

export const getRelativeTimeString = (() => {
  // Check if Intl.RelativeTimeFormat is supported
  const isRelativeTimeFormatSupported = typeof Intl !== 'undefined' && 
    Intl.RelativeTimeFormat;

  if (isRelativeTimeFormatSupported) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    
    return (date: Date | string) => {
      const timeMs = date instanceof Date ? date.getTime() : new Date(date).getTime();
      const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
      
      // Convert to largest appropriate unit
      const units: TimeUnit[] = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2628000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
      ];
      
      for (const { unit, seconds } of units) {
        if (Math.abs(deltaSeconds) >= seconds || unit === 'second') {
          return rtf.format(Math.round(deltaSeconds / seconds), unit);
        }
      }
      return rtf.format(0, 'second')
    };
  } else {
    // Fallback implementation
    return (date: Date | string) => {
      const timeMs = date instanceof Date ? date.getTime() : new Date(date).getTime();
      const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
      const deltaMinutes = Math.round(deltaSeconds / 60);
      const deltaHours = Math.round(deltaMinutes / 60);
      const deltaDays = Math.round(deltaHours / 24);
      const deltaWeeks = Math.round(deltaDays / 7);
      const deltaMonths = Math.round(deltaDays / 30);
      const deltaYears = Math.round(deltaDays / 365);

      const absoluteSeconds = Math.abs(deltaSeconds);
      const absoluteMinutes = Math.abs(deltaMinutes);
      const absoluteHours = Math.abs(deltaHours);
      const absoluteDays = Math.abs(deltaDays);
      const absoluteWeeks = Math.abs(deltaWeeks);
      const absoluteMonths = Math.abs(deltaMonths);
      const absoluteYears = Math.abs(deltaYears);

      if (absoluteSeconds < 5) {
        return 'just now';
      } else if (absoluteSeconds < 60) {
        return `${absoluteSeconds} seconds ${deltaSeconds <= 0 ? 'ago' : 'from now'}`;
      } else if (absoluteMinutes < 60) {
        return `${absoluteMinutes} ${absoluteMinutes === 1 ? 'minute' : 'minutes'} ${deltaMinutes <= 0 ? 'ago' : 'from now'}`;
      } else if (absoluteHours < 24) {
        return `${absoluteHours} ${absoluteHours === 1 ? 'hour' : 'hours'} ${deltaHours <= 0 ? 'ago' : 'from now'}`;
      } else if (absoluteDays < 7) {
        return `${absoluteDays} ${absoluteDays === 1 ? 'day' : 'days'} ${deltaDays <= 0 ? 'ago' : 'from now'}`;
      } else if (absoluteWeeks < 4) {
        return `${absoluteWeeks} ${absoluteWeeks === 1 ? 'week' : 'weeks'} ${deltaWeeks <= 0 ? 'ago' : 'from now'}`;
      } else if (absoluteMonths < 12) {
        return `${absoluteMonths} ${absoluteMonths === 1 ? 'month' : 'months'} ${deltaMonths <= 0 ? 'ago' : 'from now'}`;
      } else {
        return `${absoluteYears} ${absoluteYears === 1 ? 'year' : 'years'} ${deltaYears <= 0 ? 'ago' : 'from now'}`;
      }
    };
  }
})();
