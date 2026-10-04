# Stroop demo for GitHub Pages

A touch-friendly jsPsych demonstration, with 4 practice trials, 24 balanced test trials, on-screen accuracy and mean correct response times, and replay. English text; no build step.

## Publish a new site

1. Extract this ZIP.
2. Create a public GitHub repository, for example `psych-demos`.
3. Use **Add file → Upload files** to upload the contents of `stroop-demo`, including the `vendor` folder. `index.html` must be in the repository root. Commit the files.
4. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/(root)**, and save.
5. Wait for deployment. GitHub shows the live link on the Pages settings screen, normally `https://YOUR-USERNAME.github.io/psych-demos/`.
6. Open the link on your phone or share it as a QR code on a slide.

If you already have a Pages site, upload this folder inside its publishing directory as `stroop/`; the demo will be available at your site's URL plus `/stroop/`. Do not replace your existing homepage.

## Responses and privacy

- All task logic runs in the visitor's browser.
- jsPsych temporarily retains response trials in browser memory to compute the on-screen score. Instruction and interval screens use `record_data: false`.
- Trial records and score totals exist only in JavaScript memory for the current page. Refreshing resets them. The site owner receives no task responses.
- No response upload, database, analytics, cookies, localStorage, sessionStorage, participant IDs, downloads or server endpoint are implemented.
- The jsPsych dependencies are bundled locally, so visitors do not contact a third-party CDN.
- GitHub still serves the website and may process ordinary hosting/access information, such as IP addresses. “No task responses saved or uploaded” does not mean the hosting provider processes no visitor metadata.

## Local use and editing

Open `index.html` in a browser with the `vendor` folder alongside it. All assets are bundled. If your browser blocks local files, serve this directory with `python -m http.server 8000` and open `http://localhost:8000`.

Edit the text and CSS in `index.html`. The four colours are in the `colours` array. Buttons stay in a fixed 2×2 arrangement, and a 300 ms interval separates test trials to reduce accidental double taps. Scores use only correct test trials and exclude practice. Condition means are descriptive; 24 trials are not enough for a stable individual assessment.

For more experiments, add a homepage linking to separate folders such as `stroop/`, `flanker/`, and `go-no-go/`. Use button-response plugins for phone interaction.

## Dependencies

- jsPsych 8.3.0
- @jspsych/plugin-html-button-response 2.1.0
- Upstream MIT license in `vendor/LICENSE-jspsych.txt`.

Documentation:
- https://www.jspsych.org/v8/plugins/html-button-response/
- https://www.jspsych.org/v8/overview/data/
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
