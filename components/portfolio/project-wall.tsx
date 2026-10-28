"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  Users,
  Workflow,
  Network,
} from "lucide-react";
import { projects } from "@/lib/portfolio-projects";
import { Companion } from "./companion";
import { useVisit } from "./visit-provider";
export function ProjectWall() {
  const { state, dispatch } = useVisit();
  const initialIndex = useRef(state.projectIndex).current;
  const [viewport, api] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: false,
    startIndex: initialIndex,
    breakpoints: {
      "(min-width: 1101px)": {
        align: (viewSize) => viewSize * 0.07,
      },
    },
  });
  const [selected, setSelected] = useState(initialIndex);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const update = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    dispatch({ type: "select-project", index: api.selectedScrollSnap() });
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api, dispatch]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api, update]);
  return (
    <div className="project-stage">
      <section
        className="project-wall"
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        <div
          className="wall-viewport"
          ref={viewport}
          tabIndex={0}
          aria-label="Project cards. Use left and right arrows to browse."
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowRight") {
              event.preventDefault();
              api?.scrollNext();
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              api?.scrollPrev();
            }
          }}
        >
          <div className="wall-track">
            {projects.map((project, index) => {
              const Icon =
                index === 0 ? Users : index === 1 ? Workflow : Network;
              return (
                <article
                  className={`project-slide ${project.cover} ${selected === index ? "active" : ""}`}
                  key={project.id}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                >
                  <span className="project-featured">
                    {index === 0 ? "Featured" : "Selected work"}
                  </span>
                  <h2>{project.title}</h2>
                  <p className="project-category">{project.category}</p>
                  <Icon
                    className="project-art-icon"
                    size={100}
                    strokeWidth={1.1}
                    aria-hidden="true"
                  />
                  <div className="project-card-bottom">
                    <p>
                      {index === 0
                        ? "Reconnect without losing updates. Resolve stale edits with version checks."
                        : index === 1
                          ? "Recover checkout after a restart. Handle duplicate payments and inventory rollback."
                          : "Trace agent contributions, recorded inputs, and live execution progress."}
                    </p>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          className="button primary"
                          onClick={() => api?.scrollTo(index)}
                        >
                          Open project <ArrowRight size={18} />
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="portfolio-overlay" />
                        <Dialog.Content className="portfolio-dialog project-dialog">
                          <p className="eyebrow">{project.category}</p>
                          <Dialog.Title>{project.title}</Dialog.Title>
                          <Dialog.Description>
                            {project.description}
                          </Dialog.Description>
                          <p className="project-tech">{project.technologies}</p>
                          <h3>The problem</h3>
                          <p>{project.problem}</p>
                          <h3>Engineering decisions</h3>
                          <ul>
                            {project.decisions.map((decision) => (
                              <li key={decision}>{decision}</li>
                            ))}
                          </ul>
                          <p className="source-note">{project.boundary}</p>
                          <div className="dialog-links">
                            <a
                              className="button primary"
                              href={project.source}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View source <ArrowUpRight size={17} />
                            </a>
                            {"live" in project && (
                              <a
                                className="text-button"
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Open demo ↗
                              </a>
                            )}
                            {project.id === "atlaspay" && (
                              <Link
                                className="button secondary"
                                href="/projects/workshop"
                              >
                                Try the workshop <ArrowRight size={17} />
                              </Link>
                            )}
                            <Dialog.Close className="text-button">
                              Back to the wall
                            </Dialog.Close>
                          </div>
                          <Dialog.Close
                            className="dialog-close"
                            aria-label={`Close ${project.title} details`}
                          >
                            <X size={22} />
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="wall-controls">
          <button
            className="icon-button wall-previous"
            aria-label="Previous project"
            disabled={!canPrev}
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft size={22} />
          </button>
          <div className="wall-pagination">
            <span aria-live="polite">
              {selected + 1} / {projects.length}
            </span>
            <div>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  aria-label={`Show ${project.title}`}
                  aria-current={selected === index ? "true" : undefined}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
          <button
            className="icon-button wall-next"
            aria-label="Next project"
            disabled={!canNext}
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight size={22} />
          </button>
        </div>

      </section>
      <Companion
        className="projects-guide"
        selection={selected}
        arrival={false}
      />
    </div>
  );
}
