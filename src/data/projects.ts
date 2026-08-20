export type ProjectId =
  | "edunexus"
  | "health-api"
  | "auth-system";

export type PortfolioProject = {
  id: ProjectId;
  number: string;
  title: string;
  type: string;
  description: string;
  role: string;
  stack: string[];
};

export const projects: PortfolioProject[] = [
  {
    id: "edunexus",
    number: "01",
    title: "EDUNEXUS",
    type: "FULL-STACK PLATFORM",
    description:
      "A full-stack web platform focused on delivering a modern and interactive learning experience.",
    role: "Full Stack Development",
    stack: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
    ],
  },

  {
    id: "health-api",
    number: "02",
    title: "HEALTH API",
    type: "GO BACKEND",
    description:
      "A lightweight backend health-check API that returns structured service status and HTTP response information.",
    role: "Backend Development",
    stack: [
      "Go",
      "HTTP",
      "REST API",
      "JSON",
    ],
  },

  {
    id: "auth-system",
    number: "03",
    title: "AUTH SYSTEM",
    type: "SECURE BACKEND",
    description:
      "An authentication system with registration, login, token verification and protected application routes.",
    role: "Backend Development",
    stack: [
      "Node.js",
      "Express",
      "JWT",
      "MongoDB",
    ],
  },
];