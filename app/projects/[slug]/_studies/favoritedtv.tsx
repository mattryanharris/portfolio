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
          <dd className="mt-1">30 hours (live wall feature)</dd>
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
      <P>I replaced the whole thing with a tvOS app.</P>

      <H2>The shift</H2>
      <P>
        The TV stopped being a video player and started being a small piece of
        software. Instead of a rendered file, each Apple TV pulls a list of
        &ldquo;slides&rdquo; from Supabase on startup and cycles through them. A
        slide is either a static image (still uploaded by ops, no rendering
        needed) or a <em>dynamic</em> slide — code that pulls fresh data each
        time it appears.
      </P>
      <P>
        Once the TV was code, everything that needed a manual update became
        automatic:
      </P>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          <strong>Weekly leaderboard</strong> — syncs from the Google Sheet ops
          already maintains. No render step.
        </li>
        <li>
          <strong>Daily leaderboard</strong> — previously impossible. Now its
          own slide, refreshed daily.
        </li>
        <li>
          <strong>Strava leaderboard</strong> — pulled live from the company's
          Strava club.
        </li>
        <li>
          <strong>Internal beta leaderboard</strong> — populated from
          participation data.
        </li>
      </ul>
      <P>
        Ops stopped opening Premiere. The Apple TVs stopped needing in-person
        attention. Updates went from weekly-and-stale to
        whatever-the-data-says-right-now.
      </P>

      <H2>What dynamic unlocks: a live wall of streams</H2>
      <P>
        The headline win isn't faster updates — it's the features that were
        previously impossible. The clearest example: a 3×2 grid of Favorited
        creators streaming live, muted, sitting in your peripheral vision so the
        team can glance over and see what's happening on the platform.
      </P>
      <Quote>
        You can't render that in Premiere. You can render any number of frames,
        but you can't render <em>now</em>.
      </Quote>
      <P>I built this part in 30 hours.</P>

      <H3>The detective work</H3>
      <P>
        Favorited's streaming API isn't documented externally. I had an iOS repo
        (Swift, LiveKit-based), a Flutter repo (Agora-based), and one long-lived
        auth JWT. So the first hour was reading source:
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
        includes both. &ldquo;The endpoint you'd guess is the wrong
        one&rdquo; is exactly the kind of thing that eats hours when you're
        working from indirect signals.
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
        The interesting half of the 30 hours was iterating on UX after the
        wiring worked. Each step fixes a millisecond-class quality issue:
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
              ["Daily scores", "Impossible", "A dynamic slide"],
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
        30 hours for the livestream feature. The bigger shift — from
        &ldquo;rendered video on Plex&rdquo; to &ldquo;app pulling from
        Supabase&rdquo; — paid for itself the first week ops didn't have to open
        Premiere.
      </P>
    </div>
  );
}
