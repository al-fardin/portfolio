export type AchievementMilestone = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  z: number;
  side: "left" | "right";
  color: string;
};

export const achievementMilestones: AchievementMilestone[] = [
  {
    id: "competition",
    number: "01",
    title: "COMPETITION",
    subtitle: "Build Under Pressure",
    description:
      "Taking on competitive challenges where problem solving, experimentation and fast decision making matter.",
    z: -642,
    side: "left",
    color: "#f59e0b",
  },

  {
    id: "innovation",
    number: "02",
    title: "INNOVATION",
    subtitle: "Ideas Into Systems",
    description:
      "Transforming ideas into working software through development, iteration and technical exploration.",
    z: -686,
    side: "right",
    color: "#22d3ee",
  },

  {
    id: "growth",
    number: "03",
    title: "GROWTH",
    subtitle: "Always Moving Forward",
    description:
      "Continuously improving engineering skills, learning new technologies and tackling harder problems.",
    z: -726,
    side: "left",
    color: "#a855f7",
  },
];