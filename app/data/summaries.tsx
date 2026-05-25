import { ReactNode } from "react";

/** Short-form case study content for projects that don't have a deep-dive
 *  yet. Each entry is a small React tree shown inside the project modal.
 *  Goal: enough context that the tile click feels like opening a real
 *  page, not a "coming soon" stub. */

function P({ children }: { children: ReactNode }) {
  return <p className="my-4 leading-7 text-[#222]">{children}</p>;
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-[#f6f7f8] px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight">{children}</h3>
  );
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
        A weekend project that got out of hand. I&rsquo;d been watching{" "}
        <em>The Bear</em> and got fixated on the kitchen ticket printers —
        the way orders just appear, physically, as paper. I wanted that
        energy on my desk. So I went to Facebook Marketplace, bought a used
        Epson TM-m30II thermal receipt printer, and figured I&rsquo;d wire it
        up in an afternoon.
      </P>
      <P>
        It took the better part of three days.
      </P>
      <P>
        The printer is from a world of point-of-sale systems, not consumer
        gadgets. Setup meant firmware updates, Epson network utilities that
        haven&rsquo;t been redesigned since 2009, and a default Web Config
        password that turns out to be the printer&rsquo;s serial number
        (helpfully printed on a sticker on the bottom). The breakthrough came
        from a manual buried on Epson&rsquo;s support site: a feature called{" "}
        <strong>Server Direct Print</strong>, which inverts the usual printer
        model. Instead of an app pushing jobs <em>to</em> the printer, the
        printer itself reaches out to your server every few seconds and asks
        if there&rsquo;s anything to print. If yes, the server responds with
        XML and the printer prints it. If no, the printer goes back to sleep.
      </P>
      <P>
        Inverted, but freeing — once I knew that, I could host the whole
        thing on Vercel and skip drivers entirely.
      </P>

      <H3>The architecture</H3>
      <P>
        A tiny Next.js service holds a queue of pending messages in memory
        and exposes two endpoints: one for humans (a web form to send a
        message), and one for the printer to poll. When the printer pings the
        poll endpoint, the server checks the queue and either returns a
        well-formed <Mono>PrintRequestInfo</Mono> XML document (Epson&rsquo;s
        ePOS-Print dialect, with the namespace and casing they require, or
        the printer silently ignores it) or an empty 200 OK to mean
        &ldquo;nothing right now.&rdquo; After printing, the printer POSTs
        back a result so the server can mark the job done.
      </P>
      <P>
        One surprise: the printer is functionally illiterate when it comes to
        modern typography. The first time I sent a message with curly quotes,
        every apostrophe came out as a <Mono>?</Mono>. Thermal printers
        speak code pages from the 1990s — CP437 by default — so the service
        now normalizes the text before sending: smart quotes become straight
        quotes, em dashes become hyphens, ellipses become three dots,
        non-breaking spaces become regular ones. The receipt looks the way it
        was written.
      </P>

      <H3>What it does</H3>
      <Bullets
        items={[
          "Telegrams — anyone with the link can send a short note via a public web form; it lands on my desk seconds later as a printed strip with the sender and timestamp.",
          "Fortune teller — single-tap mystical fortune. Pure novelty; the kind of thing that gets shared at a party.",
          "Task tickets — a small queue for household chores, printed kitchen-ticket style so they're hard to ignore.",
          "Reading mode — a Python script that prints exactly one minute of whatever book I'm reading (around 200 words, ending on a sentence boundary), then trims the printed portion from the source file so the next minute picks up cleanly.",
        ]}
      />

      <H3>What I learned</H3>
      <P>
        Every interesting consumer-grade thing has an industrial cousin that&rsquo;s
        cheaper, sturdier, and ten times more annoying to set up. The fun of
        this project was sitting on the wrong side of that trade — making a
        kitchen workhorse do small, soft, useless things, just because it
        could.
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

  // ───────── NAVAIR ─────────
  crosswire: (
    <>
      <P>
        A ten-week NREIP internship at Naval Air Weapons Station China Lake, in
        the Michelson Laboratory&rsquo;s{" "}
        <strong>Integrated Battlespace Arena</strong> — NAVAIR&rsquo;s
        high-fidelity, closed-loop simulation environment. What the simulation
        actually modeled isn&rsquo;t something I can get into, but the
        engineering problem I was handed is fair game — and it was a good one.
      </P>
      <P>
        The job: take a set of <strong>C#/.NET</strong> libraries built for
        Windows and re-implement them in <strong>C++ (Qt)</strong> so the system
        would run on <strong>Linux</strong> as well. In the pipeline, data
        originated on a Windows machine and had to be handed off and consumed by
        a Linux machine downstream — so the software needed to behave
        identically on both ends. Cross-platform parity was the whole point.
      </P>
      <P>
        Part of it handled <strong>encrypted radio signals</strong>: take in the
        encrypted stream, decrypt it, and turn it into readable data the
        simulation could use in real time.
      </P>
      <P>
        I finished my slice over the ten weeks and wrote the documentation and
        onboarding materials for whoever inherited the project. I came in strong
        on C++ but new to C#, so much of the work was reading unfamiliar code
        closely enough to reimplement it faithfully — a crash course in porting
        across two languages and two operating systems at once.
      </P>
    </>
  ),

  // ───────── YouTube ─────────
  crankthatfrank: (
    <>
      <P>
        Before software became the day job, I spent three years managing{" "}
        <strong>CrankThatFrank</strong> (Frank Gioia), a YouTube comedian. It
        was the whole stack for a creator: video production, thumbnail design,
        ad-campaign negotiation, on-site representation, and media-interview
        mediation.
      </P>
      <P>
        Over that run we scaled the channel from a few thousand subscribers to{" "}
        <strong>over a million</strong>, and I secured platform verification
        across Twitter, Instagram, and YouTube. Looking back, this is where the
        product instinct started — obsessing over what makes someone click a
        thumbnail, testing titles, and reading an audience is the same muscle I
        use building products now.
      </P>
    </>
  ),

  "frank-merch": (
    <>
      <P>
        Frank&rsquo;s merch became a business of its own. I built the line on{" "}
        <strong>Represent</strong> and ran it end to end — concept, design,
        drops, and merchandising — peaking at up to{" "}
        <strong>$40,000 a month</strong> and worn by thousands of fans.
      </P>
      <P>
        The line leaned all the way into Frank&rsquo;s deadpan, &ldquo;dead
        inside&rdquo; alt-comedy brand — across tees, long sleeves, hoodies,
        sweatshirts, and hats:
      </P>
      <Bullets
        items={[
          "The three-eyed cat — the channel’s mascot, anchoring the whole line.",
          "Goth/emo staples that matched Frank’s humor: the American Goth Collection, Dead Inside apparel, a Repressed Emo sweatshirt, and a Skeleton tee.",
          "Joke drops like “Fam Friendly Alt Content” and the “Yee” tee.",
          "Seasonal runs — a Halloween “old Hollywood” cat series, holiday knits (an ugly-Christmas sweater and socks), and designs riffing on the “don’t eat soap” bit.",
        ]}
      />
      <P>
        The line did well enough to cross into retail: I negotiated a{" "}
        <strong>Hot Topic</strong> deal that put Frank&rsquo;s merch on shelves
        in stores across North America — from a YouTube channel to a wholesale
        retail product.
      </P>
    </>
  ),

  "frank-pillow": (
    <>
      <P>
        One of my favorite collabs from the Frank era: we took the channel&rsquo;s{" "}
        <strong>three-eyed cat</strong> mascot — the same icon anchoring the
        merch line — and made it plush, partnering with{" "}
        <strong>Throwboy</strong>, the studio behind the original emoji pillows.
      </P>
      <P>
        It turned a piece of channel iconography into a real, physical product
        on a fan&rsquo;s couch — a designer-pillow collab built around an
        internet comedian and sold straight to his audience.
      </P>
    </>
  ),

  "frank-brand-deals": (
    <>
      <P>
        Alongside the channel and the merch, I ran the partnerships —
        negotiating <strong>multi-brand sponsorships</strong> across fashion,
        gaming, and entertainment, and keeping recurring monthly revenue
        flowing through campaigns and audience-growth deals.
      </P>
      <P>
        The job was matching the right brand to the right audience moment, so a
        sponsorship felt native to the channel instead of bolted on — the same
        instinct behind a good product partnership.
      </P>
    </>
  ),
};
