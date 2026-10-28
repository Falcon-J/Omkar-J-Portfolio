"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, FileText, Mail, Wrench } from "lucide-react";
import { projects } from "@/lib/portfolio-projects";
import { ContactForm } from "@/components/portfolio/contact-form";
import { destinationScenes, personalCards, legacyInterests, milestones, toolkit } from "./destination-data";
import styles from "./destinations.module.css";
import type { MapPlace, MapDetail } from "./map-state";
export type { MapPlace, MapDetail } from "./map-state";

const selectedProjects = projects.filter((project) => project.id === "saathi" || project.id === "atlaspay");
type Project = (typeof selectedProjects)[number];
type Action = { id: MapDetail; label: string; x: number; y: number; kind?: "orb" | "folder" | "toolbox" };
const sceneActions: Record<MapPlace, Action[]> = {
  home: [{ id: "personal", label: "Discover more", x: 58, y: 64, kind: "orb" }],
  journey: [{ id: "journal", label: "Open the journal", x: 54, y: 74 }],
  workshop: [{ id: "saathi", label: "Saathi", x: 44, y: 60, kind: "folder" }, { id: "atlaspay", label: "AtlasPay", x: 57, y: 60, kind: "folder" }, { id: "toolkit", label: "Toolbox", x: 91, y: 34, kind: "toolbox" }],
  now: [{ id: "notebook", label: "Open notebook", x: 27, y: 72 }],
  contact: [{ id: "letter", label: "Write a message", x: 55, y: 73 }],
};

function PersonalCards({ initialIndex, onSelect }: { initialIndex: number; onSelect: (index: number) => void }) {
  const startIndex = useRef(initialIndex).current;
  const [viewport, carousel] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", startIndex });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [index, setIndex] = useState(initialIndex);
  useEffect(() => {
    if (!carousel) return;
    const update = () => {
      setCanPrev(carousel.canScrollPrev()); setCanNext(carousel.canScrollNext());
      setIndex(carousel.selectedScrollSnap()); onSelect(carousel.selectedScrollSnap());
    };
    update(); carousel.on("select", update); carousel.on("reInit", update);
    return () => { carousel.off("select", update); carousel.off("reInit", update); };
  }, [carousel, onSelect]);
  return <div className={styles.personalCollection} role="region" aria-label="Personal glimpses" aria-roledescription="carousel">
    <div ref={viewport} className={styles.cardViewport} tabIndex={0} aria-label={canPrev || canNext ? "Personal cards; use arrow keys to browse" : "Personal cards"} onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); carousel?.scrollNext(); }
      if (event.key === "ArrowLeft") { event.preventDefault(); carousel?.scrollPrev(); }
    }}><div className={styles.cardTrack}>{personalCards.map((card, cardIndex) => <article className={styles.personalCard} key={card.title} role="group" aria-roledescription="slide" aria-label={`${cardIndex + 1} of ${personalCards.length}`}>
      <div className={styles.cardArt}><Image src={`/living-map/${card.image}.png`} alt="" fill sizes="(max-width: 600px) 75vw, 320px" quality={65} style={{ objectPosition: card.position }} /></div>
      <div className={styles.cardCopy}><span className={styles.eyebrow}>{card.label}</span><h4>{card.title}</h4><p>{card.text}</p></div>
    </article>)}</div></div>
    {(canPrev || canNext) && <div className={styles.carouselControls}><button className={styles.roundButton} aria-label="Previous personal card" disabled={!canPrev} onClick={() => carousel?.scrollPrev()}><ArrowLeft size={18} /></button><button className={styles.roundButton} aria-label="Next personal card" disabled={!canNext} onClick={() => carousel?.scrollNext()}><ArrowRight size={18} /></button><span>Swipe or use the arrows</span><span className={styles.srOnly} aria-live="polite">Card {index + 1} of {personalCards.length}</span></div>}
  </div>;
}

function ProjectStory({ project }: { project: Project }) {
  const [chapter, setChapter] = useState("Overview");
  return <>
    <p className={styles.projectTagline}>{project.tagline}</p>
    <div className={styles.projectToolbar}>
      <div className={styles.chapterChoices} aria-label="Project story sections">{["Overview", "Decisions", "Evidence"].map((label) => <button type="button" key={label} aria-pressed={chapter === label} onClick={() => setChapter(label)}>{label}{chapter === label && <Check size={14} aria-hidden="true" />}</button>)}</div>
      <div className={styles.projectLinks}><a className={styles.primary} href={project.source} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={17} /></a>{"live" in project && <a className={styles.secondary} href={project.live} target="_blank" rel="noopener noreferrer">Open demo <ArrowUpRight size={17} /></a>}</div>
    </div>
    <div className={styles.projectChapter} aria-live="polite">
      {chapter === "Overview" && <><p className={styles.lead}>{project.description}</p><h4>The problem</h4><p>{project.problem}</p><p className={styles.technology}>{project.technologies}</p></>}
      {chapter === "Decisions" && <><h4>Engineering decisions</h4><ol className={styles.decisions}>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ol></>}
      {chapter === "Evidence" && <><h4>Evidence and limits</h4><p>{project.boundary}</p><p className={styles.muted}>The repository is the place to inspect the implementation and its checks.</p></>}
    </div>
  </>;
}

function SceneCanvas({ place, opened, active, motionActive, buttons, onOpen }: { place: MapPlace; opened: boolean; active: boolean; motionActive: boolean; buttons: RefObject<Record<string, HTMLButtonElement | null>>; onOpen: (detail: MapDetail) => void }) {
  const [failed, setFailed] = useState(false);
  const scene = destinationScenes[place];
  return <div className={styles.sceneCanvas} data-open={opened} data-active={active && motionActive} style={{ "--scene-ratio": scene.width / scene.height, "--mobile-focus": scene.focus, "--mobile-focus-number": parseFloat(scene.focus) / 100 } as CSSProperties}>
    <div className={styles.imagePlane}>
      {!failed && active && <Image src={`/living-map/${place}.png`} alt="" fill sizes="(max-width: 760px) 150vh, 100vw" quality={85} loading="eager" className={styles.sceneImage} onError={() => setFailed(true)} />}
      <div className={styles.sceneShade} />
    </div>
      {!opened && <div className={styles.sceneObjects} aria-label={`${scene.title} scene actions`}>{sceneActions[place].map((action) => <button type="button" key={action.id} ref={(node) => { buttons.current[action.id] = node; }} className={`${styles.objectAction} ${action.kind === "orb" ? styles.orbAction : action.kind === "folder" ? styles.folderAction : action.kind === "toolbox" ? styles.toolboxAction : styles.labelAction}`} style={{ "--object-x": action.x / 100, "--object-y": action.y / 100 } as CSSProperties} onClick={() => onOpen(action.id)}>
        {action.kind === "orb" && <span className={styles.orbAssembly} aria-hidden="true"><Image src="/living-map/crystal-ball.png" alt="" width={1295} height={1214} className={styles.orbArt} /></span>}
        {action.kind === "folder" && <Image src={`/living-map/project-folder-${action.id === "saathi" ? "burgundy" : "teal"}.png`} alt="" width={1619} height={971} className={styles.folderArt} onError={(event) => { event.currentTarget.hidden = true; }} />}
        <span className={styles.objectLabel}>{action.kind === "toolbox" ? <Wrench size={17} /> : action.kind === "folder" ? null : action.kind === "orb" ? null : place === "contact" ? <Mail size={18} /> : <BookOpen size={18} />}{action.label}{!action.kind && <ChevronRight size={16} />}</span>
      </button>)}</div>}
    {failed && <p className={styles.imageFallback}>The illustration couldn’t load. Every story is still available below.</p>}
  </div>;
}

export function DestinationContent({ place, detail, onDetailChange, onNavigate, active = true, motionActive = true }: {
  place: MapPlace; detail: MapDetail | null; onDetailChange: (detail: MapDetail | null) => void;
  onNavigate?: (place: MapPlace) => void; active?: boolean; onClose?: () => void; motionActive?: boolean;
}) {
  const [milestoneIndex, setMilestoneIndex] = useState(3);
  const [cardIndex, setCardIndex] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const sheet = useRef<HTMLElement>(null);
  const contactSheet = useRef<HTMLElement>(null);
  const sceneButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const previous = useRef<{ place: MapPlace; detail: MapDetail | null }>({ place, detail: null });
  const scene = destinationScenes[place];
  const milestone = milestones[milestoneIndex];
  const project = place === "workshop" ? selectedProjects.find((item) => item.id === detail) : undefined;
  const legacy = place === "home" && detail && detail in legacyInterests ? legacyInterests[detail as keyof typeof legacyInterests] : undefined;
  const contactOpen = place === "contact" && detail === "letter";
  const title = legacy?.title ?? (place === "home" ? "Beyond the work" : place === "journey" ? "My journey" : detail === "toolkit" ? "Technical toolkit" : project?.title ?? (place === "now" ? "From my notebook" : "Let’s start a conversation."));

  useEffect(() => {
    const old = previous.current;
    previous.current = { place, detail };
    if (!active) return;
    if (detail) {
      const surface = contactOpen ? contactSheet.current : sheet.current;
      if (surface) surface.scrollTop = 0;
      surface?.querySelector<HTMLElement>("[data-detail-heading]")?.focus({ preventScroll: true });
    } else if (old.place === place && old.detail) {
      const target = sceneButtons.current[old.detail] ?? sceneButtons.current[sceneActions[place][0].id];
      target?.focus({ preventScroll: true });
    }
  }, [place, detail, active, contactOpen]);

  return <div className={styles.destinations} data-place={place} data-open={Boolean(detail)} data-active={active}>
    <SceneCanvas key={place} place={place} opened={Boolean(detail)} active={active} motionActive={motionActive} buttons={sceneButtons} onOpen={onDetailChange} />
    {!detail && <>
      <div className={styles.sceneCaption}><h3>{scene.title}</h3><p>{scene.subtitle}</p></div>
    </>}
    {detail && !contactOpen && <section ref={sheet} className={styles.contentSheet} aria-labelledby="scene-detail-title">
      <div className={styles.sheetTop}><button type="button" className={styles.back} onClick={() => onDetailChange(null)}><ArrowLeft size={16} /> Back to scene</button><span className={styles.sheetContext}>{scene.title}</span></div>
      <div className={styles.sheetBody}><h3 id="scene-detail-title" data-detail-heading ref={heading} tabIndex={-1}>{title}</h3>
        {place === "home" && (legacy ? <><p className={styles.lead}>{legacy.text}</p>{onNavigate && <button className={styles.secondary} onClick={() => onNavigate("contact")}>Start a conversation <ArrowUpRight size={17} /></button>}</> : <PersonalCards initialIndex={cardIndex} onSelect={setCardIndex} />)}
        {place === "journey" && <div className={styles.journal}><ol className={styles.timeline}>{milestones.map((item, index) => <li key={item.label} data-future={Boolean(item.future)}><button type="button" aria-pressed={milestoneIndex === index} onClick={() => setMilestoneIndex(index)}><span className={styles.routeDot} aria-hidden="true" /><span><strong>{item.label}</strong><small>{item.short}</small></span>{milestoneIndex === index && <span className={styles.srOnly}>Selected</span>}</button></li>)}</ol><article className={styles.milestoneStory} aria-live="polite"><span className={styles.eyebrow}>{milestone.subtitle}</span><h4>{milestone.title}</h4><p>{milestone.text}</p></article></div>}
        {project && <ProjectStory key={project.id} project={project} />}
        {detail === "toolkit" && <><p className={styles.muted}>Tools and topics from my work and learning. The project stories show where I use them.</p><div className={styles.toolkit}>{toolkit.map(([label, content], index) => <details key={label} open={index === 0}><summary>{label}</summary><p>{content}</p></details>)}</div><div className={styles.actions}>{selectedProjects.map((item) => <button className={styles.secondary} key={item.id} onClick={() => onDetailChange(item.id)}>Explore {item.title} <ArrowRight size={16} /></button>)}</div></>}
        {place === "now" && <article className={styles.readingNote}><p className={styles.eyebrow}><time dateTime="2025-06-08">8 June 2025</time> · Medium</p><h4>Meet your digital pet, born with RL</h4><p>A reinforcement learning experiment, shared on Medium.</p><a className={styles.primary} href="https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef" target="_blank" rel="noopener noreferrer">Read on Medium <ArrowUpRight size={17} /></a></article>}
      </div>
    </section>}
    {/* Keep the form mounted so navigating between scenes never discards an unsent draft. */}
    <section ref={contactSheet} className={`${styles.contentSheet} ${styles.contactSheet}`} hidden={!contactOpen} aria-labelledby="contact-detail-title">
      <div className={styles.sheetTop}><button type="button" className={styles.back} onClick={() => onDetailChange(null)}><ArrowLeft size={16} /> Back to scene</button><span className={styles.sheetContext}>Mailbox</span></div>
      <div className={styles.sheetBody}><div className={styles.contactHeading}><div><span className={styles.eyebrow}>An open letter</span><h3 id="contact-detail-title" data-detail-heading tabIndex={-1}>Let’s start a conversation.</h3></div><div className={styles.signatureArt} aria-hidden="true"><Image src="/companions/omkar.png" alt="" width={70} height={100} /><Image src="/companions/stella.png" alt="" width={55} height={65} /></div></div>
        <div className={styles.contactLinks}><a href="mailto:omkarjawalikar04@gmail.com"><Mail size={16} />Email</a><a href="https://www.linkedin.com/in/omkar-jawalikar/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a href="https://github.com/Falcon-J" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a><a href="/Omkar-Jawalikar-Resume.pdf" target="_blank" rel="noopener noreferrer"><FileText size={16} />Résumé</a></div>
        <div className={styles.formWrapper}><ContactForm /></div>
      </div>
    </section>
  </div>;
}
