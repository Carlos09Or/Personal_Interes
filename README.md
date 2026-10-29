# Opportunity Atlas — Personal Edition (Radar Global v1.1)

A working, responsive world-map dashboard for tracking international opportunities in technology, artificial intelligence, research, scholarships, hackathons, conferences and mentorship.

**Design:** Signal · light editorial minimalism / indigo accents · desktop and mobile.

## Radar Global — October 29, 2026 personal import

This release adds the user's personal "Radar Global" schedule without changing the original application architecture or touching any external repository:

- **20 personal calendar entries:** 3 weekly class series plus 17 dated deadlines, decisions, and prospective events.
- **10 explicitly tentative entries:** shown with tentative styling and `STATUS:TENTATIVE` in iCalendar.
- **Time zones:** class series stored as `America/Panama` or `America/New_York`. The Saturday Mandarin class shows **11:30–12:30 Panama on Oct 31, 2026** and **12:30–13:30 Panama from Nov 7**, following the U.S. daylight-saving transition.
- **Reminders via iCalendar `VALARM`:** 15 minutes before classes, 7 and 1 days before deadlines, 1 day before result announcements and events. **The standalone web app does not push notifications by itself.** Import the `.ics` into a compatible calendar app and permit alerts there.
- **Unknown course completion:** both Samsung series intentionally have no end date. You can set one by opening a SIC class in Calendar and using **Course end date**.
- **Section C watchlist:** no calendar events generated. Existing TreeHacks / KAUST cards remain undated, and new Westlake University, ELAP and Cerebral Valley records are undated watchlist items.
- **Personal tracking:** records for AAAI Undergraduate Consortium, IAPR/IEEE Biometrics School, DVCon China, ICET and PCIM were added to the catalog; Jiangnan, HackUTD, Hack Canada, CSTIC reused their original records. This produces **24 catalog entries** in a fresh installation.
- **Deduplication:** startup import merges by event ID or normalized title+date and preserves previously customized records. The prior starter HackUTD record's admission status is corrected from "accepted" to the **Oct 29 user-provided status "submitted, admission pending"** only when that record was not previously edited.

**Data provenance:** These 20 dates and personal statuses were supplied by the user on Oct 29, 2026, and **were not independently reverified against the respective official sources**. They are not a live guarantee that the call remains open or that a result date won't change.

Download the ready-made `calendar/Radar-Global-2026-2027.ics` to import this schedule directly into Apple Calendar, Google Calendar or another compatible application. Alternatively, use **Calendar → Export with reminders .ics** inside the app; that export also includes extra dated catalog opportunities not part of Radar Global.

### Migrating from the original v1 app

If the app is opened at the same browser origin, a non-destructive migration adds the Radar events to your existing localStorage catalog. If you move to a different hostname or folder/file URL and cannot see existing edits, use **Preferences → Export JSON** from the previous app and **Preferences → Import JSON** in this version. Event data is included in new JSON backups.



## Quick start

1. Open **`index.html`** in your browser. The entire UI, JavaScript and country map are embedded in this one file. No npm install, server or account is needed to view it.
2. For reliable browser storage and local development, you can instead run:

   ```bash
   cd Opportunity-Atlas
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000` in a browser.
3. Click any country or blue map marker. Open a program, edit your notes or stage, or click **Add opportunity**.
4. Open **Preferences** to export a JSON backup or an `.ics` calendar file.

No existing repository or application is modified.

## What already works

- **Interactive SVG map** with geographically accurate simplified outlines for 176 countries, clickable countries and numbered program markers, country summary drawer, and zoom controls.
- **English-only, mobile responsive UI** with a navigation sidebar on desktop and bottom tabs on mobile. Mobile country details open as a bottom sheet.
- **Curated personal catalog** of 24 records, selected for research, international hackathons, China, study funding and mentored development. Records explicitly distinguish `Official source`, `Personal tracker` and `Watchlist` provenance.
- **Keyword search** with program country, category, funding, format and deadline filters.
- **Opportunity detail pages** with eligibility, notes, deadline, funding and official publisher link.
- **Favorite/bookmark**, add/edit personal opportunities, and manage application status (Saved, Preparing, Applied, Accepted, Rejected).
- **Kanban board**, with desktop drag-and-drop and stage selectors on all devices.
- **Personal Radar Calendar** with recurring classes, deadline/result/event filters, date drilldown, conditional events, source notes, time-zone conversion and `.ics` export with reminders.
- **Local persistence** in browser localStorage; JSON backup export/import.
- **Official source monitor script + GitHub Actions schedule**, optionally activated when you upload this project into a **new** repository. See below.

**IMPORTANT:** The map's counts describe only the local catalog. It does **not** claim to be a complete worldwide directory. No dates or funding are fabricated. Several records are personal tracking notes and need to be reverified before any application.

## Current data and provenance

Official pages checked on Oct 29, 2026 include:

- Jiangnan University's AI for Smart Cities winter school: https://ai.jiangnan.edu.cn/info/1022/2560.htm (official deadline November 6, 2026; partial travel and meal subsidies).
- CERN openlab Summer Student Programme: https://openlab.cern/cern-openlab-summer-student-programme/ (2027 applications scheduled to open in November 2026; specific deadline not assumed).
- MLH Fellowship: https://fellowship.mlh.com/ (remote, mentored fellowship; cohort timing varies).
- Outreachy: https://www.outreachy.org/ (paid remote open-source internships; eligibility and application windows vary).
- KAUST VSRP program information: https://kpv.kaust.edu.sa/internship (project-specific requirements).

Other listings are **watchlist** or **personal tracking notes**, not a promise that applications are open or benefits have been confirmed. You can edit every program's details and notes. The original starting records remain in `src/data.js`.

## Source files

| File | Purpose |
|---|---|
| `index.html` | Self-contained working application; open this file |
| `src/app.js` | UI, events, state, filters, calendar, forms, map and tracking |
| `src/styles.css` | Responsive Signal design system |
| `src/data.js` | Initial records and country metadata |
| `src/radar.js` | Personal Radar Global import: dated entries, weekly recurrences, and undated watchlist records |
| `calendar/Radar-Global-2026-2027.ics` | Standalone importable iCalendar with the 20 user-provided dated events and reminders |
| `scripts/export_radar_ics.py` | Regenerate the standalone calendar from `src/radar.js` |
| `scripts/smoke_test.cjs` | Offline regression checks for deduplication and Panama / New York daylight-saving conversion |
| `assets/world.json` | Simplified world-country geometry (Natural Earth, public domain) |
| `build.py` | Rebuilds `index.html` from editable source files |
| `scripts/check_sources.py` | Optional official-page-change detector |
| `data/official_sources.json` | Public source URLs for change monitoring |
| `data/source-monitor-report.json` | Last monitor result (initially unconfigured) |
| `.github/workflows/monitor-sources.yml` | Optional daily GitHub Actions scan |

After editing files in `src/`, run `python3 build.py` to regenerate the standalone HTML. To regenerate the calendar export run `python3 scripts/export_radar_ics.py`. To run the offline sanity checks, run `node scripts/smoke_test.cjs`.

## Optional source monitoring (new GitHub repo only)

The included workflow is **not active** inside the download. To use it:

1. Create a **new** GitHub repository exclusively for Opportunity Atlas and upload this project.
2. Enable GitHub Actions with the relevant repository permissions (the workflow uses `contents: write`).
3. The workflow runs daily at 13:13 UTC and can also be manually triggered.
4. It fetches explicitly listed public **HTTPS** official pages, computes normalized-text fingerprints, and stores changes in `data/source-monitor-report.json`.
5. The workflow runs `build.py` and commits the updated site and report. Hosting the repository as a static site (for example through GitHub Pages) will display the latest report in Preferences after deployment.

**It only detects possible page changes.** A changed webpage does not mean the event opened, a date was changed or an applicant is eligible. It does **not** automatically extract new application deadlines, apply for programs, send email, or send push notifications. Sites using aggressive bot protection may not be fetchable; those are reported as errors, not silently marked as current.

## Technical approach and next phase

Version 1.1 intentionally has **no build dependencies** so you can open and evaluate a functioning product immediately. It is vanilla JavaScript, modern CSS and a carefully simplified SVG map, not yet a Next.js/Supabase cloud platform.

The production architecture can evolve into:

- Next.js + React + TypeScript + Tailwind CSS + shadcn/ui + Motion.
- Supabase Postgres with source, opportunity, user, verification, activity and status tables.
- Ingestion jobs for official RSS feeds, event directories and permitted public APIs, with conservative scraping only where authorized.
- Classification, canonical URL deduplication, date extraction with citations and review before publication.
- Saved searches, tailored eligibility scoring and user-visible notifications of **verified** changes.
- Real authentication and sync across devices, monitoring health dashboards and optional email alerts.

The above production features are **not** represented as implemented in this download.

## Data privacy and license

This app does not send your data to a server. Your personal catalog is stored only in the browser where you use it. Browser clearing or private browsing may delete it; make JSON backups.

Map geometry derives from the Natural Earth public-domain dataset, simplified for offline use. The project code is provided as an editable starting point.
