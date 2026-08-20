export type ExperienceMilestone = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  z: number;
  side: "left" | "right";
  color: string;
};

export const experienceMilestones: ExperienceMilestone[] = [
  {
    id: "foundation",
    year: "2024",
    title: "FOUNDATION",
    subtitle: "Programming & Development",
    description:
      "Building strong foundations in programming, problem solving and software development.",
    z: -472,
    side: "left",
    color: "#8b5cf6",
  },

  {
    id: "building",
    year: "2025",
    title: "BUILDING",
    subtitle: "Projects & Exploration",
    description:
      "Moving from learning concepts to building complete applications and exploring different technologies.",
    z: -515,
    side: "right",
    color: "#22d3ee",
  },

  {
    id: "current",
    year: "2026",
    title: "NEXT LEVEL",
    subtitle: "Competitions & Engineering",
    description:
      "Taking on larger engineering challenges, competitions and more advanced software projects.",
    z: -552,
    side: "left",
    color: "#a855f7",
  },
];