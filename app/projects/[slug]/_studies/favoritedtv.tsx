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

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-[#f6f7f8] px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

export default function FavoritedTVStudy() {
  return (
    <div className="text-[17px]">
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
        <strong>MaiLinh</strong> would open Adobe Premiere and rebuild the
        whole video — every graphic, every headline, every leaderboard frame,
        every transition — hand-update the data inside each one, render the
        full video, upload it to a Plex server, and then walk through the
        office turning the playback on for each Apple TV individually.
      </P>
      <P>
        Daily updates weren't even an option. The render-and-deploy loop was
        too expensive — one update meant re-touching every graphic in the
        video, not just the numbers. Weekly updates were always a little late.
        And anything <em>dynamic</em> — anything that needed to reflect what
        was happening right now — was off the table entirely.
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
        A 3×2 grid of Favorited creators streaming live, muted, on the wall —
        so the team can glance over and see what's happening on the platform
        in real time. Each tile shows the creator's avatar, handle, viewer
        count, stream title, and a ticking &ldquo;LIVE 2h 14m&rdquo; duration.
        Stalled streams self-heal by swapping in from a backup pool, and the
        slide pre-mounts five seconds before becoming visible so the streams
        are already playing by the time you see them.
      </P>
      <Quote>
        You can't render that in Premiere. You can render any number of
        frames, but you can't render <em>now</em>.
      </Quote>

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
