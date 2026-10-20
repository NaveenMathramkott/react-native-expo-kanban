import { siteConfig } from "@/lib/site";

export type RepoStats = {
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  version: string;
  monthlyDownloads: number | null;
  totalDownloads: number | null;
  updatedAt: string;
};

type GitHubRepo = {
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
};

type NpmPoint = {
  downloads?: number;
};

const FALLBACK: RepoStats = {
  stars: null,
  forks: null,
  openIssues: null,
  version: siteConfig.version,
  monthlyDownloads: null,
  totalDownloads: null,
  updatedAt: new Date().toISOString(),
};

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "react-native-expo-kanban-docs",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getStats(): Promise<RepoStats> {
  const repo = "NaveenMathramkott/react-native-expo-kanban";

  const [github, monthly, total] = await Promise.all([
    safeJson<GitHubRepo>(`https://api.github.com/repos/${repo}`),
    safeJson<NpmPoint>(
      `https://api.npmjs.org/downloads/point/last-month/${siteConfig.npmPackage}`
    ),
    safeJson<NpmPoint>(
      `https://api.npmjs.org/downloads/point/2015-01-10:${new Date()
        .toISOString()
        .slice(0, 10)}/${siteConfig.npmPackage}`
    ),
  ]);

  return {
    stars: github?.stargazers_count ?? null,
    forks: github?.forks_count ?? null,
    openIssues: github?.open_issues_count ?? null,
    version: siteConfig.version,
    monthlyDownloads: monthly?.downloads ?? null,
    totalDownloads: total?.downloads ?? null,
    updatedAt: new Date().toISOString(),
  };
}

export { FALLBACK as fallbackStats };
