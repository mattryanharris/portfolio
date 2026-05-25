import { ReactNode } from "react";

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight">{children}</h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="my-4 leading-7 text-[#222]">{children}</p>;
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-[color:var(--accent)] pl-4 italic text-[color:var(--muted)]">
      {children}
    </blockquote>
  );
}

/** Rex dialogue card. Lines are passed as plain strings (JS expressions) so
 *  the curly quotes inside don't trip react/no-unescaped-entities. */
function Dialogue({ who, lines }: { who: string; lines: string[] }) {
  return (
    <div className="my-6 rounded-r-md border-l-4 border-amber-500 bg-[#faf6ee] py-4 pr-5 pl-5">
      <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-widest text-amber-700">
        {who}
      </p>
      {lines.map((l, i) => (
        <p key={i} className="mb-2 leading-7 text-[#3a2e22] italic last:mb-0">
          {l}
        </p>
      ))}
    </div>
  );
}

function Metrics({ items }: { items: { num: string; label: string }[] }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.label} className="bg-white px-4 py-6 text-center">
          <div className="text-3xl font-semibold tracking-tight tabular-nums">
            {m.num}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-widest text-[color:var(--muted)]">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The reusable pose-rig binding code, styled as the amber/green CRT terminal
 *  from the source dossier. Rendered from a template literal so the inner
 *  quotes and braces are literal text, not JSX. */
function CodeBlock() {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg bg-[#0d0a07] px-5 py-5 font-mono text-[12px] leading-relaxed text-[#7dd66f]">
      {`// pose index — built once, reused for every scene
// 0 embarrassed · 1 shocked · 2 neutral · 3 confident
// 4 happy · 5 victorious · 6 thinking · 7 scared
// 8 pointing02 · 9 pointing01 · 10 OTTExcited · 11 annoyed

const DIALOGS = [
  { text: "Name's Radcliffe... Rex Radcliffe.",     pose: 3  }, // confident
  { text: "...something nasty is lurking nearby.",   pose: 7  }, // scared
  { text: "Smash the big red button. Quick!",        pose: 10 }, // excited
];

vmi.string("dialog").value   = line.text;  // bind the line
vmi.number("imageNum").value = line.pose;  // swap the pose`}
    </pre>
  );
}

function Flow() {
  const steps: [string, string, string][] = [
    ["01", "Write", "Marketing drafts the dialogue plus a pose number per line."],
    ["02", "Bind", "Strings and pose feed the Rive view-model at runtime via Braze."],
    ["03", "Perform", "Rex types each line and snaps to the matching pose on tap."],
    ["04", "Measure", "Seen / skip / complete events fire back to Braze per scene."],
  ];
  return (
    <div className="my-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-4">
      {steps.map(([n, title, body]) => (
        <div key={n} className="bg-white px-4 py-5">
          <div className="font-mono text-[11px] font-semibold tracking-widest text-amber-600">
            STEP {n}
          </div>
          <div className="mt-1 text-base font-medium tracking-tight">{title}</div>
          <div className="mt-1 text-[13px] leading-6 text-[color:var(--muted)]">
            {body}
          </div>
        </div>
      ))}
    </div>
  );
}

function Events() {
  const evs: [string, string][] = [
    ["IAM_Seen", "did it actually load?"],
    ["dialogue_skip", "where did they bail?"],
    ["dialogue_complete", "who made it to the end?"],
  ];
  return (
    <div className="my-5 flex flex-wrap gap-2">
      {evs.map(([k, d]) => (
        <span
          key={k}
          className="rounded bg-[#0d0a07] px-3 py-1.5 font-mono text-[11px] text-[#7dd66f]"
        >
          <b className="font-semibold text-amber-300">{k}</b> · {d}
        </span>
      ))}
    </div>
  );
}

/** Discipline breakdown — what Matt personally owned on this project. */
function Roles() {
  const roles: [string, string][] = [
    [
      "Creative direction",
      "Created Rex end to end — the character, the premise of a ghost who doesn’t know he’s dead, the lore universe, and the season-long story that answered why ghosts were on the app. Wrote every line of dialogue.",
    ],
    [
      "Product",
      "Shaped the CEO’s ghost-gun instinct into a six-week serialized event: the milestone-reward structure, the lore-unlock loop, and the capture/release finale — all reusing the platform’s existing gifting mechanic.",
    ],
    [
      "Art direction",
      "Directed the visual language with the animation and CG teams — the eighties, spare-parts ghost-gun aesthetic that made Rex a TV repairman, plus the twelve-pose character library.",
    ],
    [
      "Motion direction",
      "Designed how Rex performs: the pose-swap-per-line system in Rive and the finale’s hinge-and-tail reveal, turning a static character into a data-driven actor.",
    ],
    [
      "Engineering",
      "Wrote the Braze code — the HTML/JS that binds each line and pose into the Rive view-model at runtime and fires the seen / skip / complete analytics events.",
    ],
  ];
  return (
    <div className="my-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2">
      {roles.map(([title, body], i) => {
        // Last card spans both columns when the count is odd, so there's
        // no dangling empty cell.
        const spanFull = i === roles.length - 1 && roles.length % 2 === 1;
        return (
          <div
            key={title}
            className={`bg-white px-5 py-5${spanFull ? " sm:col-span-2" : ""}`}
          >
            <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-600">
              {title}
            </div>
            <div className="mt-1.5 text-[13.5px] leading-6 text-[#3a2e22]">
              {body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The finale capture/release split — real Braze event totals. */
function SplitBar() {
  return (
    <div className="my-6">
      <div className="flex h-16 overflow-hidden rounded-lg">
        <div
          className="flex flex-col items-center justify-center bg-[#b6432f] text-white"
          style={{ width: "75.4%" }}
        >
          <span className="text-lg font-semibold leading-none tabular-nums">
            1,714
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest opacity-90">
            Captured · 75.4%
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-[#2f7a26] text-white"
          style={{ width: "24.6%" }}
        >
          <span className="text-lg font-semibold leading-none tabular-nums">
            558
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest opacity-90">
            Released · 24.6%
          </span>
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--muted)]">
        Source: Braze events RexCaptured + RexReleased · scene rex_10000_captured · Nov 2025
      </p>
    </div>
  );
}

export default function RexStudy() {
  return (
    <div className="text-[17px]">
      <dl className="mb-10 grid grid-cols-1 gap-4 border-b border-[color:var(--border)] pb-10 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Role
          </dt>
          <dd className="mt-1">
            Solo — product, creative / art / motion direction, and code
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Window
          </dt>
          <dd className="mt-1">Aug – Nov 2025</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Medium
          </dt>
          <dd className="mt-1 font-mono text-xs text-[color:var(--muted)]">
            Rive · Braze in-app messaging · CRM · no engineering team
          </dd>
        </div>
      </dl>

      <P>
        Favorited is a live-streaming app where watching is participating:
        viewers buy coins and send animated gifts to creators mid-stream, with
        battles, a discover page of events, and a leaderboard on top. Each fall
        the app runs a seasonal event. This is the story of the one that got a
        soul.
      </P>

      <H2>The brief: &ldquo;I want a ghost gun&rdquo;</H2>
      <P>
        The previous year&rsquo;s spooky season was bare bones — a few seasonal
        mechanics, nothing that stuck. For the follow-up, the CEO had a clear
        instinct: a ghost-busting mechanic. A gun. You point it, you bust
        ghosts.
      </P>
      <P>
        Great hook, one problem — there was no <em>why</em>. If you&rsquo;re
        building a world and grounding it in some kind of reality, the obvious
        question hangs in the air: why the hell are there ghosts on a
        live-streaming app? A gun with no story is just a button. So the real
        assignment wasn&rsquo;t &ldquo;build a ghost gun.&rdquo; It was: take
        that instinct and ground it in something we could actually build a
        world on — something that could get <em>bigger</em>.
      </P>

      <H2>The answer: Rex Radcliffe</H2>
      <P>
        Rex was the answer to &ldquo;why ghosts?&rdquo; — a character to hand
        you the gun, explain the stakes, and pull you from one moment to the
        next. He started simple, just a ghost hunter, with two guardrails:
        don&rsquo;t take it too seriously, and don&rsquo;t rip off existing IP.
      </P>
      <P>
        The character direction actually came from the <em>prop</em>. The ghost
        gun was designed with the animation team to feel distinctly eighties —
        not slick, but cobbled together from spare parts, vacuum tubes and all.
        A gadget like that needs an owner who&rsquo;d build it, so{" "}
        <strong>a TV repairman</strong> made the most sense: someone with the
        junk-drawer engineering chops to duct-tape a Spectro Scanner 5000 together.
        The prop grounded the person. From there it was about finding his voice
        — loud, theatrical, certain he&rsquo;s the world&rsquo;s number one
        ghost hunter, warm underneath the bravado.
      </P>
      <Dialogue
        who="Rex · Day One Intro"
        lines={[
          "“Name’s Radcliffe… Rex Radcliffe. World’s number one ghost hunter. They say I’ve got the sharpest instincts in the biz. Truth is, they’re right.”",
          "“Rex Radcliffe works solo. But these ghosts? They’re different… stronger, smarter, ghost…lier.”",
          "“So polish your reflexes, kid. The hunt’s just beginning… and Rex Radcliffe is watching.”",
        ]}
      />

      <H2>The secret hiding in plain sight</H2>
      <P>
        Here&rsquo;s what made it more than a mascot: from the very first design
        sync, the whole arc was built toward one reveal —{" "}
        <strong>Rex himself is a ghost</strong>. He died on a hunt back in the
        eighties and never realized it. He&rsquo;s been hunting his own kind the
        whole time, oblivious.
      </P>
      <P>
        That secret was seeded, not sprung. The clues were planted in the
        milestone lore — most of all in the Carousel Lady, written as
        Rex&rsquo;s own great-great-grandmother, a Victorian spirit doomed to
        search endlessly for her descendants. A living man wouldn&rsquo;t
        register on a dead ancestor&rsquo;s radar. The breadcrumb was right
        there for anyone grinding hard enough to collect it.
      </P>
      <Dialogue
        who="Rex · Lore Drop — The Carousel Lady"
        lines={[
          "“She looks kinda familiar, like an old photo from my family tree. Gives me the creeps.”",
          "“Last time, she mouthed something. Couldn’t hear it, but I swear it was a name.”",
        ]}
      />

      <H2>The engine: motion + data = story</H2>
      <P>
        Rex isn&rsquo;t a video. He&rsquo;s a{" "}
        <strong>fully data-bound Rive character</strong> running inside Braze
        in-app messages. The key build decision was a constraint turned into a
        feature: we couldn&rsquo;t animate every line. So instead of bespoke
        animation per beat, I built out every <em>pose</em> Rex would ever need
        — shocked, confident, scared, annoyed, victorious — twelve in total.
        Each line of dialogue simply carries a pose number. Change the line,
        change the pose, and Rex re-performs.
      </P>
      <CodeBlock />
      <P>
        To ship a new scene, you edit that array — no build, no release, no
        engineering ticket. That&rsquo;s the entire reason the team could move
        at the speed it did, on a marketing cadence instead of an engineering
        one.
      </P>
      <Flow />
      <P>
        And it&rsquo;s instrumented at the lifecycle level — the seen event
        fires the instant Rive loads and the spinner hides, with graceful
        fallbacks down the bridge so nothing depends on the native app:
      </P>
      <Events />

      <H2>The gifts became characters. The leaderboard became a story.</H2>
      <P>
        Rex was the connective tissue for the season&rsquo;s ghost gifts. The CG
        team designed each one and brought their descriptions; the collaboration
        was figuring out how Rex fit into every ghost&rsquo;s story. The intro
        squashed every question a new player would have, handed over the Buster,
        walked them through a first catch, and sent them off. Then every bust
        milestone — measured in ghost gifts sent — unlocked a Lore Drop that fed
        another thread of the mystery.
      </P>
      <Dialogue
        who="Rex · 1,000 Ghosts — The Reaper"
        lines={[
          "“Just saw that cloaked skeleton. Doesn’t chase — just stares with that green rock in his hand. Every time he raises that amulet, whole towns go silent.”",
          "“If he looks your way, don’t wave back. Just trust me.”",
        ]}
      />
      <P>
        The lore became its own engine. Players across the app started piecing
        the story together, heavier grinders catching everyone else up. And it
        reframed the gifts themselves: nobody thinks of a live-stream gift as
        something with <em>lore</em>. Suddenly these little transactional
        objects carried weight — and the leaderboard stopped being a number
        going up and became appointment content.
      </P>

      <H2>Traction</H2>
      <Metrics
        items={[
          { num: "4.1M", label: "Ghosts busted, full season" },
          { num: "~50%", label: "Story completion vs ~30% baseline" },
          { num: "30/day", label: "Sessions among super-users" },
          { num: "0", label: "Eng tickets per new scene" },
        ]}
      />
      <P>
        Rex&rsquo;s weekly recaps delivered the numbers in his own voice —
        personalized, leaderboard-aware story beats naming real top hunters,
        assembled from editable data and shipped through CRM, not a release.
        Week one alone cleared 262K ghosts.
      </P>
      <Quote>
        &ldquo;Week one is in the bag and you maniacs went full throttle. Over
        two hundred sixty-two thousand ghosts sent packin&rsquo;! That&rsquo;s a
        monster start — but don&rsquo;t get too comfy.&rdquo;
      </Quote>

      <H2>The payoff: the reveal, and the choice</H2>
      <P>
        The finale paid off the secret. After weeks of hunting, the dialogue box
        swung open on a hinge to drop the one thing hidden the entire experience:{" "}
        <strong>Rex&rsquo;s ghostly tail</strong>. He doesn&rsquo;t know until
        that moment. The hunter was the haunt all along. Then the season handed
        the player the controls — one last choice that inverts the whole arc:{" "}
        <strong>capture Rex, or release him?</strong> Each choice fired its own
        Braze event, so the split is real data.
      </P>
      <SplitBar />
      <P>
        After six weeks of Rex insisting he works solo and recruiting players as
        his backup, the verdict ran roughly three to one in favor of capturing
        him. Both endings closed on &ldquo;to be continued,&rdquo; and the
        choice was recorded for a future callback. It&rsquo;s the most human
        result in the whole project: nobody was indifferent.
      </P>

      <H2>What I owned</H2>
      <P>
        Everything above — the character, the story, the pose rig, the Braze
        code, the finale — was one person across five disciplines.
      </P>
      <Roles />

      <H2>Why it mattered</H2>
      <P>
        Rex proved a repeatable pattern at Favorited:{" "}
        <strong>a character is a content surface, not a feature</strong>. Build
        the rig once, ground it in a real reason to exist, and the story becomes
        a CRM lever anyone can pull.
      </P>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          <strong>For users</strong> — spooky season got a soul. The ghosts had
          a reason, the gifts had lore, the leaderboard had stakes, the finale
          had a genuine emotional choice.
        </li>
        <li>
          <strong>For the team</strong> — a self-serve narrative engine. New
          beats, recaps, and milestone drops shipped on a marketing cadence off
          one universal pose rig.
        </li>
        <li>
          <strong>For the platform</strong> — the same Rive-on-Braze approach
          became the template for what came next, including a Wrapped-style
          year-in-review built entirely in Rive.
        </li>
      </ul>
    </div>
  );
}
