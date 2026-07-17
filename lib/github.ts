const GITHUB_REPO = process.env.GITHUB_REPO ?? "DevStackBox/DevStackBox";
const API = "https://api.github.com";

export type GitHubRelease = {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
};

export type RepoStats = {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
};

async function ghFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "DevStackBox-Website",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`${API}${path}`, {
    headers,
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getLatestRelease(): Promise<GitHubRelease | null> {
  try {
    return await ghFetch<GitHubRelease>(`/repos/${GITHUB_REPO}/releases/latest`);
  } catch {
    return null;
  }
}

export async function getReleases(limit = 20): Promise<GitHubRelease[]> {
  try {
    return await ghFetch<GitHubRelease[]>(
      `/repos/${GITHUB_REPO}/releases?per_page=${limit}`,
    );
  } catch {
    return [];
  }
}

export async function getRepoStats(): Promise<RepoStats | null> {
  try {
    return await ghFetch<RepoStats>(`/repos/${GITHUB_REPO}`);
  } catch {
    return null;
  }
}

export function findWindowsInstaller(release: GitHubRelease) {
  return (
    release.assets.find((a) =>
      /\.exe$/i.test(a.name) && /setup|installer/i.test(a.name),
    ) ??
    release.assets.find((a) => /\.exe$/i.test(a.name)) ??
    release.assets[0]
  );
}

export function formatReleaseDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function parseReleaseSections(body: string) {
  const sections: Record<string, string[]> = {};
  let current = "Other";
  for (const line of body.split("\n")) {
    const h = line.match(/^###?\s+(Added|Changed|Fixed|Removed|Security)/i);
    if (h) {
      current = h[1];
      sections[current] = sections[current] ?? [];
      continue;
    }
    if (line.startsWith("- ") && sections[current]) {
      sections[current].push(line.slice(2).trim());
    }
  }
  return sections;
}
