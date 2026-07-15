import { useState, useEffect } from "react";
import { Star, GitFork } from "lucide-react";

interface RepoStats {
  stargazers_count: number;
  forks_count: number;
}

interface Project {
  name: string;
  url: string;
  description: string;
  language: string;
  repo?: string;
}

const projects: Project[] = [
  {
    name: "Bastion Research",
    url: "https://bastionresearch.in/",
    description:
      "Stocks and Brokerage suggestion and research application, which was migrated from wordpress to react from scratch.",
    language: "Typescript",
  },
  {
    name: "Trilok Wall",
    url: "https://www.trilokwall.com/",
    description:
      "Designed and developed the marketing website for Trilok Wall. Trilok Precast offers a wide range of RCC precast construction solutions used in residential, industrial, and commercial sites across India.",
    language: "Typescript",
  },
  {
    name: "ThemeSwitch.nvim",
    url: "https://github.com/nishu-murmu/ThemeSwitch.nvim",
    description: "Light weight colorscheme switcher for neovim.",
    language: "Lua",
    repo: "ThemeSwitch.nvim",
  },
  {
    name: "cursor-inline",
    url: "https://github.com/nishu-murmu/cursor-inline",
    description: "Cursor style Inline editing plugin for neovim.",
    language: "Lua",
    repo: "cursor-inline",
  },
  {
    name: "Youtube-Video-Scheduler",
    url: "https://github.com/nishu-murmu/Youtube-Video-Scheduler",
    description:
      "A browser extension to schedule videos on youtube, incase you want to watch something later",
    language: "TypeScript",
    repo: "Youtube-Video-Scheduler",
  },
  {
    name: "WhatsApp-Toggle",
    url: "https://github.com/nishu-murmu/WhatsApp-Toggle",
    description: "Small chrome extension to toggle whatsApp left sidebar chats.",
    language: "JavaScript",
  },
];

const Projects = () => {
  const [stats, setStats] = useState<Record<string, RepoStats>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const repos = projects.filter((p) => p.repo);
      const results = await Promise.allSettled(
        repos.map(async (p) => {
          const res = await fetch(
            `https://api.github.com/repos/nishu-murmu/${p.repo}`
          );
          if (!res.ok) throw new Error("Failed");
          const data: RepoStats = await res.json();
          return { repo: p.repo!, data };
        })
      );

      const map: Record<string, RepoStats> = {};
      results.forEach((r) => {
        if (r.status === "fulfilled") {
          map[r.value.repo] = r.value.data;
        }
      });
      setStats(map);
    };

    fetchAll();
  }, []);

  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#1d1e20] dark:text-[#FFFDF6]">
          Projects
        </h2>
        <ul className="space-y-6 list-disc pl-6">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
              >
                {project.name}
              </a>
              <span className="block text-gray-600 dark:text-gray-300 ml-0">
                {project.description}
              </span>
              <span className="inline-block my-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs align-middle">
                {project.language}
              </span>
              {project.repo && stats[project.repo] && (
                <>
                  <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm align-middle ml-2">
                    <Star className="h-4 w-4" />
                    <span>{stats[project.repo].stargazers_count}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm align-middle ml-2">
                    <GitFork className="h-4 w-4" />
                    <span>{stats[project.repo].forks_count}</span>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
