"use client";

import {
  useEffect,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  projects,
} from "@/data/projects";

import {
  useGameStore,
} from "@/store/useGameStore";

export default function ProjectsOverlay() {
  const sceneMode =
    useGameStore(
      (state) =>
        state.sceneMode
    );

  const selectedProject =
    useGameStore(
      (state) =>
        state.selectedProject
    );

  const selectProject =
    useGameStore(
      (state) =>
        state.selectProject
    );

  const continueFromProjects =
    useGameStore(
      (state) =>
        state.continueFromProjects
    );

  const project =
    projects.find(
      (item) =>
        item.id ===
        selectedProject
    ) ?? projects[0];

  useEffect(() => {
    if (
      sceneMode !==
      "projects"
    ) {
      return;
    }

    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Enter"
      ) {
        continueFromProjects();
      }

      if (
        event.key === "1"
      ) {
        selectProject(
          "edunexus"
        );
      }

      if (
        event.key === "2"
      ) {
        selectProject(
          "health-api"
        );
      }

      if (
        event.key === "3"
      ) {
        selectProject(
          "auth-system"
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [
    sceneMode,
    continueFromProjects,
    selectProject,
  ]);

  return (
    <AnimatePresence>
      {sceneMode ===
        "projects" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 text-white"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {/* Cinematic bars */}

          <motion.div
            className="absolute left-0 right-0 top-0 h-[5vh] bg-black"
            initial={{
              y: "-100%",
            }}
            animate={{
              y: 0,
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[5vh] bg-black"
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
          />

          {/* Main info */}

          <div className="absolute inset-0 flex items-center">

            <div className="ml-[5vw] w-[42vw] max-w-xl">

              <motion.p
                className="font-mono text-[10px] tracking-[0.45em] text-violet-300"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                03 / SELECTED WORK
              </motion.p>

              <motion.h1
                key={
                  project.id
                }
                className="mt-5 text-5xl font-semibold leading-none tracking-[-0.04em] md:text-7xl"
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                {
                  project.title
                }
              </motion.h1>

              <motion.p
                key={`${project.id}-type`}
                className="mt-3 font-mono text-[11px] tracking-[0.25em] text-cyan-300"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                {
                  project.type
                }
              </motion.p>

              <motion.p
                key={`${project.id}-description`}
                className="mt-7 max-w-lg text-sm leading-7 text-white/60"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {
                  project.description
                }
              </motion.p>

              <div className="mt-6">

                <p className="font-mono text-[9px] tracking-[0.3em] text-white/30">
                  ROLE
                </p>

                <p className="mt-2 text-sm text-white/75">
                  {
                    project.role
                  }
                </p>

              </div>

              <div className="mt-6">

                <p className="font-mono text-[9px] tracking-[0.3em] text-white/30">
                  TECHNOLOGY
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {project.stack.map(
                    (technology) => (
                      <span
                        key={
                          technology
                        }
                        className="border border-white/10 bg-black/35 px-3 py-2 font-mono text-[9px] tracking-wider text-white/60 backdrop-blur-lg"
                      >
                        {
                          technology
                        }
                      </span>
                    )
                  )}

                </div>
              </div>

              {/* Project selector */}

              <div className="pointer-events-auto mt-8 flex gap-2">

                {projects.map(
                  (
                    item,
                    index
                  ) => {
                    const active =
                      item.id ===
                      selectedProject;

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        onClick={() =>
                          selectProject(
                            item.id
                          )
                        }
                        className={`border px-4 py-3 font-mono text-[9px] tracking-[0.15em] transition ${
                          active
                            ? "border-violet-400 bg-violet-500/15 text-white"
                            : "border-white/10 bg-black/25 text-white/40 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        0
                        {index +
                          1}
                      </button>
                    );
                  }
                )}

              </div>

              <motion.button
                type="button"
                onClick={
                  continueFromProjects
                }
                className="pointer-events-auto mt-7 border border-cyan-400/30 bg-black/40 px-6 py-3 text-xs tracking-[0.22em] backdrop-blur-xl transition hover:border-cyan-300 hover:bg-cyan-400/10"
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                CONTINUE JOURNEY

                <span className="ml-4 text-white/35">
                  ENTER ↵
                </span>
              </motion.button>

            </div>
          </div>

          {/* Helper */}

          <motion.div
            className="absolute bottom-[8vh] right-[4vw] text-right"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
          >
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/25">
              SELECT PROJECT
            </p>

            <p className="mt-2 font-mono text-[10px] tracking-wider text-white/55">
              1 / 2 / 3
            </p>

            <p className="mt-4 font-mono text-[9px] tracking-[0.3em] text-violet-300">
              PROJECT CITY
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}