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
            Solo build — engineering, product, design, ops handoff
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Build window
          </dt>
          <dd className="mt-1">~30 hours · May 13 – 19, 2026</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">
            Stack
          </dt>
          <dd className="mt-1 font-mono text-xs text-[color:var(--muted)]">
            tvOS 18 · SwiftUI · LiveKit v2 · Next.js · Vercel · Supabase ·
            Apple Business Manager · Mosyle MDM
          </dd>
        </div>
      </dl>

      <H2>The before</H2>
      <P>
        For a long time, the office TVs ran on a system that's almost charmingly
        analog by 2026 standards. Every week, our operations manager{" "}
        <strong>MaiLinh</strong> would open Adobe Premiere, hand-update the
        leaderboard scores, render a fresh video, upload it to a Plex server,
        and then walk through the office turning the playback on for each Apple
        TV individually.
      </P>
      <P>
        Daily updates weren't even an option. The render-and-deploy loop was
        too expensive. Weekly updates were always a little late. And anything{" "}
        <em>dynamic</em> — anything that needed to reflect what was happening
        right now — was off the table.
      </P>
      <Quote>
        From the Slack note I sent the team after the first ship:
        &ldquo;I've been working on a new Apple TV application to replace the
        videos MaiLinh has been making for the office. This will let her
        control the display dynamically without needing to refresh everything
        manually, giving us dynamic live data.&rdquo;
      </Quote>

      <H2>The shift</H2>
      <P>
        The TV stopped being a video player and started being a small piece of
        software. Each Apple TV boots into a SwiftUI app that pulls a list of
        &ldquo;slides&rdquo; from Supabase and cycles through them with an A/B
        slot crossfade. A slide is either a static image (still uploaded by
        ops, no rendering needed) or a <em>dynamic</em> slide — code that pulls
        fresh data each time it appears.
      </P>
      <P>
        Distribution is via{" "}
        <strong>Apple Business Manager + Mosyle MDM</strong> as a custom app —
        so I push to GitHub, archive a build, and our IT admin promotes it to
        every Apple TV in the office. No one walks anywhere.
      </P>

      <H2>What got built, day by day</H2>

      <H3>Day 1 — slide engine & Strava</H3>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          Supabase schema for slides (type, dynamic_key, duration, order,
          enabled).
        </li>
        <li>
          SwiftUI slideshow with A/B slot crossfade — incoming slide mounts in
          the inactive slot, opacity animates, slots flip, outgoing slot
          clears.
        </li>
        <li>
          Strava monthly leaderboard pulled live from the company's Strava
          club via OAuth.
        </li>
        <li>
          Skip-to-next and skip-to-previous via the Siri Remote, with rapid-
          press debouncing so quick taps don't desync the slot state.
        </li>
      </ul>

      <H3>Day 2 — admin panel & three more leaderboards</H3>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          Drag-and-drop slide reorder, multi-file upload, and a reusable image
          gallery in the Next.js admin so ops doesn't re-upload the same hero
          twice.
        </li>
        <li>
          Team page with department dropdowns (Operations, Marketing, Product,
          Engineering, Data, Trust &amp; Safety, Customer Support, CG, Design),
          plus avatar upload — including paste-from-clipboard so MaiLinh can
          copy Slack profile pics straight into the admin.
        </li>
        <li>
          Favorited daily &amp; weekly leaderboards synced from a Google Sheet
          via a service account, with change-detection so the &ldquo;updated
          X ago&rdquo; timestamp only ticks on real changes.
        </li>
        <li>
          Internal beta leaderboard pulled from the Favorited API, with a
          crown on #1 and an animated podium that pops in by bar height.
        </li>
        <li>
          Typography fight: Inter felt thin on the TV at viewing distance.
          Proxima Nova was close but not quite. Landed on Apercu Pro after
          three rounds.
        </li>
      </ul>

      <H3>Day 3 — caches, polish, and distribution</H3>
      <ul className="my-4 list-disc space-y-2 pl-6 leading-7">
        <li>
          Universal people directory: <Mono>strava_athletes</Mono> became the
          canonical people table; the internal beta leaderboard fuzzy-matches
          names against it for avatars, with first-two-letters initials as the
          fallback for streamers we don't have a face for yet.
        </li>
        <li>
          A shared <Mono>AvatarCache</Mono> singleton: 24-hour disk persistence
          + an in-memory map so views can read synchronously during body
          render. No flicker on crossfade.
        </li>
        <li>
          Slides preload two ahead — data + avatars — during the previous
          slide's hold time, so the crossfade arrives at fully-ready views.
        </li>
        <li>
          Relative timestamps with spelled-out numbers ≤ 12 (&ldquo;updated
          twelve minutes ago&rdquo;, not &ldquo;12 minutes ago&rdquo;).
        </li>
        <li>
          Same-image-into-itself crossfade fix: when consecutive slides resolve
          to the same image, the slot fades to black and back instead of
          rendering invisible.
        </li>
        <li>
          App Store Connect submission as a custom app, with the org targeted
          at our company's Apple Business Manager ID, then pushed to every
          enrolled Apple TV via Mosyle MDM.
        </li>
      </ul>

      <H3>Day 4 — the live wall</H3>
      <P>
        See the deep-dive below. This is the chapter I spent the most time
        documenting because it's the most technically interesting — but it's
        also the chapter that's only possible because Days 1–3 already turned
        the TV into something you could ship code to.
      </P>

      <H2>The technical deep-dive: a live wall of streams</H2>
      <P>
        The headline win of the &ldquo;TV-as-app&rdquo; rewrite isn't faster
        updates — it's features that were previously impossible. Specifically:
        a 3×2 grid of Favorited creators streaming live, muted, sitting in
        your peripheral vision so the team can glance over and see what's
        happening on the platform.
      </P>
      <Quote>
        You can't render that in Premiere. You can render any number of frames,
        but you can't render <em>now</em>.
      </Quote>

      <H3>The detective work</H3>
      <P>
        Favorited's streaming API isn't documented externally. I had an iOS
        repo (Swift, LiveKit-based), a Flutter repo (Agora-based), and one
        long-lived auth JWT. So the first hour was reading source:
      </P>
      <ol className="my-4 list-decimal space-y-2 pl-6 leading-7">
        <li>
          The iOS repo's <Mono>LivestreamRoom</Mono> protocol has both LiveKit
          and Agora backends. The Agora token endpoint was stubbed with a
          TODO. Production runs on LiveKit.
        </li>
        <li>
          The Flutter repo's generated <Mono>pb.dart</Mono> files exposed the
          real gRPC service:{" "}
          <Mono>com.favorited.grpc.LivestreamTokenService</Mono>. No{" "}
          <Mono>.proto</Mono> source was in the repo, so I synthesized one
          from the descriptor JSON.
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
        returned 100% LKRTC streams. The Flutter app's watch screen actually
        uses a <em>different</em> query — <Mono>discoverLivestreams</Mono> —
        which surfaces a different pool that includes Agora streams. &ldquo;The
        endpoint you'd guess is the wrong one&rdquo; is exactly the kind of
        thing that eats hours when you're working from indirect signals.
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
          previous slide; then the slide itself is mounted <em>invisibly</em>{" "}
          5 seconds before the visible fade, so LiveKit rooms finish
          connecting in the dark.
        </li>
      </ul>
      <P>
        That last one matters most. The slideshow's timer used to be{" "}
        <Mono>sleep(duration) → fade</Mono>. I split it into{" "}
        <Mono>sleep(duration − 5s) → stage invisibly → sleep(5s) → fade</Mono>.
        By the time the live wall becomes visible, the rooms are already
        showing video. There's no loading state, ever.
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
                "Push to GitHub, MDM fans it out",
              ],
              [
                "Live content",
                "Impossible",
                "A wall of streams, refreshing on a cycle",
              ],
              [
                "MaiLinh's weekly calendar",
                "A render block",
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
        30 hours, end to end. The shift from &ldquo;rendered video on
        Plex&rdquo; to &ldquo;app pulling from Supabase&rdquo; paid for itself
        the first week ops didn't have to open Premiere. The live wall is the
        chapter that wouldn't have been possible at all under the old setup —
        but it's only the latest of several things that wouldn't have been
        possible. Each new dynamic slide costs an afternoon now; under the
        old system, it cost MaiLinh a Tuesday.
      </P>
    </div>
  );
}
