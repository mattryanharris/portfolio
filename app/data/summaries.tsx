import { ReactNode } from "react";

/** Short-form case study content for projects that don't have a deep-dive
 *  yet. Each entry is a small React tree shown inside the project modal.
 *  Goal: enough context that the tile click feels like opening a real
 *  page, not a "coming soon" stub. */

function P({ children }: { children: ReactNode }) {
  return <p className="my-4 leading-7 text-[#222]">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export const summaries: Record<string, ReactNode> = {
  // ───────── favorited ─────────
  "favorited-games": (
    <>
      <P>
        Favorited is a livestream app where viewers play chat-driven minigames
        during a creator's stream — Trivia Night, Mafia, Confess, Meme Review,
        Draw It. The visual language is TikTok/IG Live × Jackbox × 80s arcade
        signage. Loud, chunky, immediate; everything floats over the creator's
        face.
      </P>
      <P>
        I work as the product manager and designer on the games surface — game
        mechanics, in-stream UI overlays, the chat-to-game bridge — partnering
        closely with the engineering team. Each game has its own visual brand
        (neon-pink &ldquo;TRIVIA NIGHT&rdquo;, red &ldquo;IMPOSTOR&rdquo; lower
        thirds, white speech-bubble confess cards) layered on top of the live
        video.
      </P>
    </>
  ),

  // ───────── personal ─────────
  "message-matt": (
    <>
      <P>
        A receipt printer hub for my apartment. I wired up an Epson TM-m30II
        thermal printer to a small web app so the household can drop physical
        printouts on demand. Built in two layers:
      </P>
      <Bullets
        items={[
          "Task Printer — the technical foundation. A web UI to compose receipts (alignment, size, bold, QR codes), a print queue, and a printer monitor that shows live status.",
          "Message Matt — the consumer hub on top. Three features: Task Master (household task tickets), Telegram Service (old-school telegrams printed to the receipt printer), and Fortune Teller (a mystical fortune on a strip of paper, on demand).",
        ]}
      />
      <P>
        The fun part is the form factor: digital things become physical, the
        printer chunks out a few inches of paper, you tear it off the roll, and
        suddenly &ldquo;don't forget to take out the recycling&rdquo; is a
        receipt sitting on the counter — much harder to ignore than a Slack
        message that scrolls away.
      </P>
    </>
  ),

  tidy: (
    <>
      <P>
        A smart-home cleaning system I'm building solo. Wyze cameras stream
        room footage into a small Supabase service that snapshots and feeds
        frames to Claude vision; Claude scores the room and surfaces specific
        &ldquo;tidy this&rdquo; tasks in a React/iOS app.
      </P>
      <P>
        The interesting part is the feedback loop: Tidy doesn't try to be a
        general-purpose home assistant. It learns each room's baseline
        &ldquo;clean&rdquo; from a few hand-tagged snapshots and only nudges
        when reality drifts. Light backend, heavy on prompting and a tight UI.
      </P>
    </>
  ),

  // ───────── Disney ─────────
  "natgeo-explorer": (
    <>
      <P>
        An interactive photo game built inside NatGeo's properties. The player
        is shown a NatGeo photograph and has five guesses to identify the
        country it was taken in. The mechanic plays well with NatGeo's deep
        photo library and turns scroll-fodder into a daily habit.
      </P>
      <P>
        I owned the product: scoping, working with editorial on the photo
        pipeline, designing the game flow, and coordinating engineering through
        launch. Held to COPPA / CCPA / GDPR compliance across NatGeo and NatGeo
        Kids as the underlying audience straddles both.
      </P>
    </>
  ),

  "natgeo-copy-ai": (
    <>
      <P>
        Push-notification scheduling for NatGeo used to take editors hours per
        week — writing variants, A/B testing, coordinating sends. I built an
        AI-powered tool that ingests a NatGeo article and emits 10+ on-brand
        push-notification options the editor can pick from or remix.
      </P>
      <P>
        Weekly scheduling went from hours to under a minute. The tool lives
        inside NatGeo's existing CMS, so adoption was immediate — editors did
        the same work, just on a Friday afternoon instead of a Monday morning.
      </P>
    </>
  ),

  "compliance-scanner": (
    <>
      <P>
        Disney's properties span dozens of business units, each with their own
        third-party vendors, analytics tags, and consent flows. Verifying
        COPPA / CCPA / GDPR compliance across all of them used to take a full
        day of manual auditing.
      </P>
      <P>
        I built a cross-BU scanner — Python on the backend crawling and
        analyzing pages, React on the front for a clear dashboard — that
        verifies the same surface in about five minutes. Compliance officers
        kept their existing process; the verification step just got 80×
        faster.
      </P>
    </>
  ),

  "deet-motion": (
    <>
      <P>
        DEET Motion was a generative-AI prototype I built exploring how ESPN
        sportscasters could create personalized audio rundowns at scale: feed
        the model a player, a game, a fan profile, and synthesize an
        on-brand-voice commentary clip in the sportscaster's actual voice.
      </P>
      <P>
        Built end to end as a concept — voice modeling pipeline, script
        templating, audio rendering, a small demo UI for ESPN leadership to
        play with. Sat in the bucket of &ldquo;not shipping today but
        absolutely worth a roadmap conversation.&rdquo;
      </P>
    </>
  ),

  "espn-draft-night": (
    <>
      <P>
        ESPN's Draft Night broadcast had a player-card metadata workflow that
        took editors about four hours per night, mostly waiting on data to
        ripen across multiple sources.
      </P>
      <P>
        I built a live data pipeline that pulls from the upstream sources in
        parallel, normalizes the player records, and generates the card
        metadata in under five minutes. The broadcast team got their evenings
        back during one of their busiest weeks of the year.
      </P>
    </>
  ),

  "screenplay-to-audio": (
    <>
      <P>
        Disney Studio Tech wanted a way for executives to consume screenplays
        on the go — most of them couldn't carve out the contiguous reading time
        a feature script demands. I prototyped a script-to-audio system that
        parses the screenplay structure (sluglines, character names, action,
        dialogue), assigns voices, and renders the whole thing as a narrated
        performance.
      </P>
      <P>
        Not just TTS over a PDF — actor-attributed dialogue, scene direction
        delivered in a different voice, pacing tuned to dramatic intent. A
        listening experience, not a workaround.
      </P>
    </>
  ),

  // ───────── Rebud ─────────
  "rebud-ios": (
    <>
      <P>
        Rebud is a California cannabis startup with a marketplace and delivery
        service. I oversaw development of their first native iOS app — one of
        the earliest consumer apps in the cannabis industry, navigating both
        Apple's policies and California compliance.
      </P>
      <P>
        Owned the product top to bottom: scoping, design, daily syncs with the
        overseas engineering team, weekly reports to the CTO, and milestone
        demos to the CEO. Ship velocity stayed high through a launch window
        most consumer-cannabis apps never reach.
      </P>
    </>
  ),

  "rebud-pos": (
    <>
      <P>
        Designed and shipped the POS + kiosk experience for Rebud's first
        retail dispensary. The product reach was both directions: budtenders
        using the POS to ring up orders, and customers using a kiosk to browse
        the menu without flagging staff down.
      </P>
      <P>
        Added a checkout upsell flow with dynamic product recommendations that
        meaningfully lifted average order value. Held nightly syncs with
        engineering to keep design and code in lockstep.
      </P>
    </>
  ),

  packerkit: (
    <>
      <P>
        PackerKit is an Android app I shipped for Rebud's warehouse operations
        team. It improved packing speed, reduced fulfillment errors, and gave
        warehouse leads a clear view of in-progress orders without leaving the
        floor.
      </P>
    </>
  ),

  // ───────── NASA JPL ─────────
  "europa-clipper": (
    <>
      <P>
        Europa Clipper is NASA's mission to study Jupiter's icy moon Europa,
        which scientists believe may harbor a subsurface ocean. I contributed
        to the Flight Software & Avionics team during integration and testing
        of the spacecraft's flight systems.
      </P>
      <P>
        My work focused on fault-injection and off-nominal testing on the
        flight hardware testbed — deliberately breaking things in the lab so
        they don't break in deep space. Surfaced several critical bugs ahead of
        the launch window and improved the reliability of the testing
        framework itself.
      </P>
    </>
  ),

  "jpl-telemetry": (
    <>
      <P>
        Adapted Python telemetry-parsing tools that had originally been built
        for the Mars 2020 mission so they could ingest Europa Clipper data
        streams. Reduced data processing time substantially and built custom
        data filters + automation scripts that produced real-time tracking
        dashboards for cross-team visibility into spacecraft test metrics.
      </P>
    </>
  ),

  // ───────── Apple ─────────
  "shortcuts-gallery": (
    <>
      <P>
        I interned on Apple's AI/ML Proactive team in summer 2019, contributing
        to the iOS 13 launch of Shortcuts as a default system app. Shipped
        Shortcuts that landed globally in the iOS 13 Shortcuts Gallery and
        owned the full lifecycle of an internal feature project — planning,
        roadmap, coordination with design + engineering — through ship.
      </P>
    </>
  ),

  // ───────── NAVSEA ─────────
  "smsmds-redesign": (
    <>
      <P>
        Modernized the portal for the Surface Missile System Maintenance Data
        System used across Navy operations. Built responsive layouts in
        Bootstrap, integrated them into an Angular application, and conducted
        user research with operators to identify and resolve interaction
        pain points.
      </P>
      <P>
        Continued from my NREIP internship into a longer engagement after
        college, with growing influence over the end product.
      </P>
    </>
  ),

  emeds: (
    <>
      <P>
        Led the redesign of NAVSEA's EMEDS application for NATO partners,
        improving cross-force interoperability and operational clarity. Met
        with NATO representatives directly during requirements gathering.
      </P>
    </>
  ),

  // ───────── YouTube ─────────
  "talent-management": (
    <>
      <P>
        Before software became the day job, I spent three years as a hands-on
        talent manager. Production, thumbnail design, ad-campaign negotiation,
        on-site representation, and media interviews — the whole stack for a
        creator.
      </P>
      <Bullets
        items={[
          "Developed licensed merchandise with Hot Topic, featured in retail stores across North America.",
          "Scaled creator channels from a few thousand to over a million subscribers.",
          "Negotiated multi-brand sponsorships across fashion, gaming, and entertainment.",
          "Secured platform verification (Twitter / Instagram / YouTube) for talent.",
        ]}
      />
    </>
  ),
};
