'use strict';

// All responses and scores are temporary browser memory. No upload or storage.
const LETTERS = ['B', 'F', 'H', 'K', 'M', 'R', 'S', 'T'];
const RESPONSE_MS = 2500;
const GAP_MS = 350;

function shuffle(items) {
  const output = items.slice();
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function makeSequence(n, count, matches) {
  const sample = pool => pool[Math.floor(Math.random() * pool.length)];
  const sequence = [];
  for (let i = 0; i < n; i++) sequence.push({ letter: sample(LETTERS), seed: true });
  const targets = shuffle(Array.from({ length: count }, (_, i) => i < matches));
  for (const match of targets) {
    const previous = sequence[sequence.length - n].letter;
    // Non-targets explicitly exclude the n-back letter: no accidental targets.
    const letter = match ? previous : sample(LETTERS.filter(x => x !== previous));
    sequence.push({ letter, seed: false, match, previous });
  }
  return sequence;
}

function startDemo(n) {
  // jsPsych appends its content; remove the level picker before it starts.
  const container = document.getElementById('experiment');
  container.replaceChildren();
  document.body.classList.add('experiment-running');
  window.scrollTo(0, 0);
  const jsPsych = initJsPsych({
    display_element: 'experiment',
    on_trial_start: () => { container.scrollTop = 0; }
  });
  const score = { correct: 0, hits: 0, falseAlarms: 0, correctRejections: 0, omissions: 0, rtSum: 0 };
  const timeline = [];
  let feedback = '';
  const screen = (stimulus, choices = [], extra = {}) => ({
    type: jsPsychHtmlButtonResponse,
    stimulus, choices, record_data: false,
    button_layout: 'grid', grid_rows: 1,
    ...extra
  });
  const seedDescription = n === 1 ? 'first letter' : 'first two letters';
  timeline.push(screen(`
    <div class="eyebrow">${n}-back · practice</div><h1>${n === 1 ? 'One step back.' : 'Two steps back.'}</h1>
    <p>Compare each new letter with the one <strong>${n} position${n === 1 ? '' : 's'} earlier</strong>.</p>
    <p>First, remember the ${seedDescription}. No response is needed yet.</p>
    <p>After that, tap <strong>Match</strong> or <strong>No match</strong> for every letter.<br>Keep updating your memory as the sequence continues.</p>
    <p class="muted">Practice waits for your answer and explains each result. The scored round gives you 2.5 seconds per letter.</p>
  `, ['Start practice']));

  function addBlock(practice) {
    const count = practice ? 6 : 30;
    const sequence = makeSequence(n, count, practice ? 2 : 10);
    sequence.forEach((item, index) => {
      if (item.seed) {
        timeline.push(screen(`
          <div class="stage"><div class="eyebrow">${n}-back · remember ${index + 1} / ${n}</div>
          <div class="letter">${item.letter}</div></div>
          <p class="muted">Remember this letter. No response yet.</p>
        `, [], { trial_duration: RESPONSE_MS, css_classes: ['active-task'] }));
      } else {
        timeline.push(screen(`
          <div class="stage"><div class="eyebrow">${n}-back · ${practice ? 'Practice' : 'Decision'} ${index - n + 1} / ${count}</div>
          <div class="letter">${item.letter}</div></div>
        `, ['Match', 'No match'], {
          record_data: true,
          css_classes: ['active-task'],
          data: { phase: practice ? 'practice' : 'test', match: item.match, letter: item.letter },
          trial_duration: practice ? null : RESPONSE_MS,
          response_ends_trial: practice,
          prompt: `<p class="muted">Same as ${n} position${n === 1 ? '' : 's'} back?${practice ? '' : '<br>Tap once. The next letter appears automatically.'}</p>`,
          on_finish: data => {
            const omitted = data.response === null;
            const correct = !omitted && data.response === (item.match ? 0 : 1);
            if (practice) {
              feedback = `<div class="eyebrow">${correct ? 'Correct' : 'Not quite'}</div>
                <h2>${item.match ? 'Match' : 'No match'}</h2>
                <p>This letter: <strong>${item.letter}</strong><br>${n} position${n === 1 ? '' : 's'} back: <strong>${item.previous}</strong></p>
                <p class="muted">Keep the recent letters in mind for the next decision.</p>`;
              return;
            }
            if (omitted) score.omissions++;
            if (correct) { score.correct++; score.rtSum += data.rt; }
            if (item.match && data.response === 0) score.hits++;
            if (!item.match && data.response === 0) score.falseAlarms++;
            if (!item.match && data.response === 1) score.correctRejections++;
          }
        }));
        if (practice) timeline.push(screen(() => feedback, ['Continue']));
      }
      timeline.push(screen('<div class="stage" aria-hidden="true">+</div>', [], { trial_duration: GAP_MS, css_classes: ['active-task'] }));
    });
  }

  addBlock(true);
  timeline.push(screen(`
    <div class="eyebrow">${n}-back · main round</div><h1>A fresh sequence.</h1>
    <p>Forget the practice letters. Start again with the ${seedDescription}.</p>
    <p>Then make 30 decisions. You have <strong>2.5 seconds per letter</strong>; the pace stays the same even when you answer quickly.</p>
    <p class="muted">Tap Match or No match on every decision. An unanswered decision counts as incorrect. There is no feedback until the end.</p>
  `, ['Start the scored round']));
  addBlock(false);
  timeline.push(screen(() => {
    const meanRT = score.correct ? Math.round(score.rtSum / score.correct) + ' ms' : '—';
    return `<div class="eyebrow">${n}-back · demo complete</div><h1>You kept<br>the thread.</h1>
      <div class="stats">
        <div class="stat"><strong>${score.correct} / 30</strong><span>Correct decisions</span></div>
        <div class="stat"><strong>${meanRT}</strong><span>Mean correct response time</span></div>
        <div class="stat"><strong>${score.hits} / 10</strong><span>Matches correctly identified</span></div>
        <div class="stat"><strong>${score.correctRejections} / 20</strong><span>Non-matches correctly rejected</span></div>
      </div>
      <p>False alarms: <strong>${score.falseAlarms}</strong><br>Unanswered decisions: <strong>${score.omissions}</strong></p>
      <p class="muted">A false alarm means choosing Match when the letters did not match.</p>
      <p>The challenge is to keep recent letters available while replacing information you no longer need.</p>
      <p class="muted">This is a short educational demo, not a diagnostic assessment or a standardized working-memory score.</p>
      <p class="muted">Nothing has been saved or uploaded. Restarting clears this run.</p>`;
  }, ['Choose a level / play again'], { on_finish: () => window.location.reload() }));
  jsPsych.run(timeline);
}

if (typeof initJsPsych === 'undefined' || typeof jsPsychHtmlButtonResponse === 'undefined') {
  document.getElementById('load-error').textContent = 'The demo could not load. Upload the vendor folder alongside index.html, then refresh.';
  document.getElementById('one-back').disabled = true;
  document.getElementById('two-back').disabled = true;
} else {
  for (const [id, level] of [['one-back', 1], ['two-back', 2]]) {
    document.getElementById(id).addEventListener('click', () => {
      document.getElementById('one-back').disabled = true;
      document.getElementById('two-back').disabled = true;
      startDemo(level);
    }, { once: true });
  }
}
