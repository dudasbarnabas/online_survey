# Phone-friendly n-back demo

An English-language letter n-back built with jsPsych. Choose 1-back or 2-back. Both use Match / No match touch buttons, practice with explanations, and an on-screen score. No build step or server backend.

## Add it to your existing GitHub Pages site

1. Extract the ZIP and rename its `nback-demo` folder to `nback`.
2. Upload the whole `nback` folder into your site's publishing directory, alongside your Stroop folder or homepage. Include `vendor`, `index.html`, `app.js`, and `style.css`.
3. Commit the files and wait for Pages to deploy.
4. Open your existing site URL with `/nback/` appended. For example, `https://YOUR-USERNAME.github.io/psych-demos/nback/`.

For a separate repository, upload the contents of `nback-demo` to its root. Enable Settings → Pages → Deploy from a branch → main → /(root). GitHub will display the live URL. Do not overwrite your existing Stroop index.html unless you intend to replace it.

You can also open index.html locally with the other files alongside it.

## Task design

- Select 1-back or 2-back at the start.
- Each block begins with n unscored letters to initialize memory; no response is requested for these letters.
- Practice: 6 decisions, exactly 2 targets and 4 non-targets. Self-paced, with the correct comparison shown after each response.
- Main round: a NEW sequence, 30 scored decisions, exactly 10 targets and 20 non-targets. Target positions are shuffled. Non-target letters explicitly exclude the n-back letter.
- Each main-round letter stays visible for 2,500 ms. One response is accepted; answering does not advance the trial early. A 350 ms fixation interval follows each letter.
- Buttons are Match and No match; this is a two-choice n-back variant. No answer within 2,500 ms counts as an incorrect omission, not as a No match response.
- Accuracy includes all 30 decisions. Mean response time includes only correct main-round decisions. Practice and initial letters are excluded.
- Reports hits out of 10, correct rejections out of 20, false alarms, and omissions. No normative comparisons or diagnostic interpretation.
- Not a standardized research protocol. Device timing and backgrounding the browser can affect performance and timing. Keep the page visible during the short main round.

## Privacy

Trial records and scores are held temporarily in browser memory for feedback. Refreshing resets them. No task responses are sent to the site owner. There is no analytics code, response upload, database, cookies, browser persistent storage, participant ID, or data export. All jsPsych files are bundled, so there are no CDN dependencies. GitHub may still process normal hosting/access information such as IP addresses.

## Editing

Text and design: `index.html`, `style.css`, and stimulus text in `app.js`.
Timing: `RESPONSE_MS` and `GAP_MS` at the top of `app.js`; update instruction text if timing changes.
Trial counts and target counts: `addBlock()` in `app.js`; update score denominators and instructions if changing them.

Dependencies: jsPsych 8.3.0 and @jspsych/plugin-html-button-response 2.1.0, under the bundled MIT license.
Plugin documentation: https://www.jspsych.org/v8/plugins/html-button-response/

Validation: sequence generation and scoring checked programmatically for both levels, including all-correct, all-wrong, omitted, and always-Match responses. Browser touch-layout checks passed for 1-back and 2-back at 320×568, 390×664, and 844×390. Checked that the landing screen is removed and that practice and main-round letters and buttons fit without scrolling.

## Mobile layout fix (v2)

The level picker is removed before jsPsych starts. The task occupies the visible viewport, including dynamic mobile browser height; each trial starts at the top. To update an existing deployment, replace `index.html`, `app.js`, and `style.css`. The vendor files are unchanged.
