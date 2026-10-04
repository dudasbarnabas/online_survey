# Blue-circle PVT demo

Phone-friendly jsPsych demo: pure white background, solid blue circle in the centre, no scrolling during trials. Tap anywhere when the circle appears, click, or press Space. Feedback is shown during practice only. Scored trials show no reaction-time, early-response, or omission feedback; the final summary remains.

## GitHub Pages

Extract this ZIP, rename `pvt-demo` to `pvt`, and upload the folder alongside your existing Stroop and n-back folders. Include all files and the vendor folder. The link is your existing site's URL followed by `/pvt/`.

For a separate repository, upload the folder contents to the root and enable Settings → Pages → Deploy from a branch → main → /(root). You can also open index.html locally with the other files alongside it. No build or backend is needed.

## Demo behaviour

- 3 practice trials, then 12 scored trials.
- White background (#ffffff); blue circle (#1264f5).
- Circle appears after a random 2–5 second wait, preceded by a 250 ms input guard. Whole-screen response avoids requiring the user to move their finger to the circle.
- Pointer-down or non-repeating Space key-down records the response. The response clock starts in the animation frame that makes the circle visible; timing remains subject to display/input latency.
- A response before the circle appears, or under 100 ms after onset, is classified as early. It is counted and the same trial is retried with a new random wait. Practice shows a warning; scored trials remain blank.
- No response within 3 seconds counts as an omission and advances to the next trial.
- Practice feedback lasts 800 ms. Scored trials use the same 800 ms interval with a blank white screen. Extra taps during this interval and the input guard are ignored.
- Leaving the page during the wait/target pauses the trial; Resume restarts it with a fresh wait. Interrupted responses are not scored.
- Results include mean, median and fastest valid RT, completed responses, early responses, responses ≥500 ms, and omissions. Practice is excluded. The ≥500 ms count excludes omissions, which are shown separately.

This is a short educational PVT-style variant, not a validated version of the standard 10-minute PVT. It uses shorter waits, a blue-circle stimulus and a short response timeout. Do not interpret the score using research norms. Devices introduce timing differences.

## Privacy

Task state exists only in browser memory and resets on reload. No responses are uploaded or persistently saved. No analytics, cookies, localStorage, sessionStorage, participant IDs, export, or database. Bundled dependencies avoid CDN requests. GitHub may process ordinary hosting/access metadata.

## Files

`index.html`: page and dependencies. `style.css`: layout and colours. `app.js`: custom jsPsych PVT plugin, instructions, timing, scoring. `vendor`: jsPsych 8.3.0 and html-button-response 2.1.0, plus MIT license.

References for implementation and standard PVT context:
- https://www.jspsych.org/v8/developers/plugin-development/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC3250358/

## Validation

Browser touch tests passed at 320×568, 390×664 and 844×390: no scrolling, centred blue circle on white, full practice/main flow, touch and Space, early responses, omissions, pause/resume, summary and replay. No external network requests occurred. These tests verify software behaviour, not laboratory timing accuracy.
