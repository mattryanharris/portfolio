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

function Code({ children }: { children: ReactNode }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-md bg-[#f6f7f8] p-4 font-mono text-xs leading-relaxed text-[#222]">
      {children}
    </pre>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-[#f6f7f8] px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

export default function FavoritedTVStudy() {
  return (
    <div className="text-[15px]">
      <dl className="mb-10 grid grid-cols-1 gap-4 border-b border-[color:var(--border)] pb-10 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Role
          </dt>
          <dd className="mt-1">
            Solo build (engineering + design + ops handoff)
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Build window
          </dt>
          <dd className="mt-1">~30 hours across three sittings</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Stack
          </dt>
          <dd className="mt-1 font-mono text-xs text-[color:var(--muted)]">
            tvOS 18 · SwiftUI · LiveKit v2 · Next.js · Vercel · Supabase
          </dd>
        </div>
      </dl>

      <P>
        For a long time, the office TVs ran on a system that's almost charmingly
        analog by 2026 standards.
      </P>
      <P>
        Every week, our operations manager would open Adobe Premiere, update the
        weekly leaderboard scores by hand, render a fresh video, upload it to a
        Plex server, and then walk through the office turning on the playback on
        each Apple TV individually. Daily updates weren't even an option — the
        render-and-deploy loop was too expensive. Weekly updates were always a
        little late. And anything <em>dynamic</em> — anything that needed to
        reflect what was happening right now — was simply off the table.
      </P>
      <P>I replaced the whole thing with a tvOS app in about 30 hours.</P>

      <H2>The shift</H2>
      <P>
        The TV stopped being a video player and started being a small piece of
        software. Each Apple TV now boots into a SwiftUI app that pulls a list
        of &ldquo;slides&rdquo; from Supabase and cycles through them with an
        A/B slot crossfade. A slide is either a static image (still uploaded by
        ops, no rendering needed) or a <em>dynamic</em> slide — code that pulls
        fresh data each time it appears. Distribution is via Apple Business
        Manager and Mosyle MDM, so an Xcode archive can replace every TV in the
        office at once.
      </P>

      <P>Once the TV was code, the manual workflow disappeared:</P>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          <strong>Favorited daily &amp; weekly leaderboards</strong> — synced
          from a Google Sheet ops already maintains (5-minute cron in the
          admin), with an animated podium layout and change detection that only
          bumps the &ldquo;updated&rdquo; timestamp on real changes.
        </li>
        <li>
          <strong>Strava monthly leaderboard</strong> — pulled live from the
          company's Strava club via OAuth, with athlete avatars and team
          departments. Auto-refreshes three times a day.
        </li>
        <li>
          <strong>Internal beta leaderboard</strong> — beta tester rankings by
          feedback and activity, with fuzzy-matching to Strava athletes for
          avatars (initials fallback for unmatched), refreshed hourly.
        </li>
        <li>
          <strong>Live wall</strong> — a 3×2 grid of muted Favorited livestreams
          so the team can glance over and see what's happening on the platform.
          Built late in the project; details below.
        </li>
      </ul>

      <P>
        Each Apple TV stopped needing in-person attention. Updates went from
        weekly-and-stale to whatever-the-data-says-right-now.
      </P>

      <H2>The pieces that hold it together</H2>

      <H3>A/B slot crossfade slideshow</H3>
      <P>
        The slideshow keeps two SwiftUI slots and swaps active/inactive between
        them, so the incoming slide can mount and start its work behind the
        outgoing one. The crossfade is animated via opacity on the slot
        wrappers; rapid skips cancel and snap cleanly. Same-image-into-itself
        gets a fade-to-black-and-back so it's never invisible.
      </P>

      <H3>Shared avatar cache (memory + disk)</H3>
      <P>
        Leaderboards have a lot of avatars and the TV is a glance-medium — a
        flicker on render is unacceptable. So I built a singleton{" "}
        <Mono>AvatarCache</Mono> with two layers: a 24-hour disk cache for
        cross-launch persistence, and an in-memory map for synchronous reads
        during view body. The slideshow preloads the next two slides' data
        +&nbsp;avatars in the background, so by the time the crossfade fires,
        the views render straight from memory with no async holes.
      </P>

      <H3>The admin (Next.js on Vercel)</H3>
      <P>
        Ops needed a way to manage slides without me. The admin app has:
      </P>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          Drag-and-drop reorder, multi-file upload, and an image gallery for
          the static image slides.
        </li>
        <li>
          Team management — departments, avatar upload, &ldquo;Sync from Center
          Code&rdquo; button to pull org-wide.
        </li>
        <li>
          Cron-driven sync routes for each data source (Favorited every 5 min,
          internal beta hourly, Strava 3× daily).
        </li>
        <li>
          Auth-gated dashboard (session cookie), with specific cron paths
          bypassed so the schedulers can hit them.
        </li>
      </ul>

      <H2>The technical deep-dive: a live wall of streams</H2>
      <P>
        The headline win of the &ldquo;TV-as-app&rdquo; rewrite isn't faster
        updates — it's features that were previously impossible. Specifically: a
        3×2 grid of Favorited creators streaming live, muted, sitting in your
        peripheral vision so the team can glance over and see what's happening
        on the platform.
      </P>
      <Quote>
        You can't render that in Premiere. You can render any number of frames,
        but you can't render <em>now</em>.
      </Quote>

      <H3>The detective work</H3>
      <P>
        Favorited's streaming API isn't documented externally. I had an iOS repo
        (Swift, LiveKit-based), a Flutter repo (Agora-based), and one
        long-lived auth JWT. So the first hour was reading source:
      </P>
      <ol className="my-4 list-decimal space-y-2 pl-6 leading-7">
        <li>
          The iOS repo's <Mono>LivestreamRoom</Mono> protocol has both LiveKit
          and Agora backends. The Agora token endpoint was stubbed with a TODO.
          Production runs on LiveKit.
        </li>
        <li>
          The Flutter repo's generated <Mono>pb.dart</Mono> files exposed the
          real gRPC service:{" "}
          <Mono>com.favorited.grpc.LivestreamTokenService</Mono>. No{" "}
          <Mono>.proto</Mono> source was in the repo, so I synthesized one from
          the descriptor JSON.
        </li>
        <li>
          I verified the whole contract with <Mono>curl</Mono> and{" "}
          <Mono>grpcurl</Mono> against production before writing a line of app
          code. A real LiveKit subscriber token came back with the claims I
          expected. Greenlit.
        </li>
      </ol>
      <P>
        One surprise: the obvious <Mono>livestreams</Mono> GraphQL query
        returned 100% LKRTC streams and zero Agora. The Flutter app's watch
        screen actually uses a <em>different</em> query —{" "}
        <Mono>discoverLivestreams</Mono> — which surfaces a different pool that
        includes both. &ldquo;The endpoint you'd guess is the wrong one&rdquo;
        is exactly the kind of thing that eats hours when you're working from
        indirect signals.
      </P>

      <H3>Architecture</H3>
      <Code>{`Apple TV  ──HTTPS──▶  Vercel admin  ──HTTPS──▶  Favorited GraphQL (discoverLivestreams)
                                  ──gRPC──▶   Favorited LivestreamTokenService
                  ◀──────────────  JSON: 12 streams with embedded LiveKit tokens
Apple TV  ──WSS───────────────────────────▶  LiveKit cloud (one Room per tile)`}</Code>
      <P>
        The Vercel admin (Next.js with <Mono>@grpc/grpc-js</Mono>) is the only
        place the auth JWT lives — it never reaches the TV. It returns 12
        streams per request: 6 to display, 6 as swap backups, all with
        pre-minted tokens. The TV connects to LiveKit directly, one{" "}
        <Mono>Room</Mono> per tile.
      </P>

      <H3>The polish ladder</H3>
      <P>
        The interesting half of the live-wall hours was iterating on UX after
        the wiring worked. Each step fixes a millisecond-class quality issue:
      </P>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          <strong>Audio off</strong> via a tiny <Mono>RoomDelegate</Mono> —
          LiveKit v2 doesn't expose a &ldquo;subscribe video only&rdquo; room
          option, so I drop each audio subscription as it's auto-subscribed.
        </li>
        <li>
          <strong>Tile chrome</strong> — avatar, handle, viewer count,
          truncated title, ticking &ldquo;🔴 LIVE 2h 14m&rdquo; duration.
        </li>
        <li>
          <strong>Self-healing</strong> — if a tile has no video within 5
          seconds, the grid swaps it for one of the 6 backup streams.
        </li>
        <li>
          <strong>Two-layer preload</strong> — the slideshow's existing{" "}
          <Mono>preloadUpcoming()</Mono> warms a stream cache during the
          previous slide; then the slide itself is mounted <em>invisibly</em> 5
          seconds before the visible fade, so LiveKit rooms finish connecting in
          the dark.
        </li>
      </ul>
      <P>
        That last one matters most. The slideshow's timer used to be{" "}
        <Mono>sleep(duration) → fade</Mono>. I split it into{" "}
        <Mono>sleep(duration − 5s) → stage invisibly → sleep(5s) → fade</Mono>.
        By the time the live wall becomes visible, the rooms are already showing
        video. There's no loading state, ever.
      </P>

      <H2>Before / after</H2>
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[color:var(--border)]">
              <th className="py-2 pr-4 text-left font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]"></th>
              <th className="py-2 pr-4 text-left font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
                Before
              </th>
              <th className="py-2 text-left font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
                After
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Update cadence", "Weekly, often late", "Live, automatic"],
              ["Daily scores", "Impossible", "Their own slide"],
              [
                "Deploying to each Apple TV",
                "Manual, in-person",
                "One push, every TV reflects",
              ],
              [
                "Live content",
                "Impossible",
                "A wall of streams, refreshing on a cycle",
              ],
              [
                "Ops manager's calendar",
                "A weekly render block",
                "That time back",
              ],
            ].map(([k, b, a]) => (
              <tr key={k} className="border-b border-[color:var(--border)]">
                <td className="py-3 pr-4 font-medium">{k}</td>
                <td className="py-3 pr-4 text-[color:var(--muted)]">{b}</td>
                <td className="py-3">{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        30 hours, end to end. The shift from &ldquo;rendered video on Plex&rdquo;
        to &ldquo;app pulling from Supabase&rdquo; paid for itself the first
        week ops didn't have to open Premiere.
      </P>
    </div>
  );
}
