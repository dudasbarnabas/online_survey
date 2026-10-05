'use strict';

// A short PVT-style teaching demo, not the standard 10-minute PVT.
// All state is temporary browser memory. No uploads or persistent storage.
class BlueCirclePVT {
  static info = {
    name: 'blue-circle-pvt', version: '1.0.0',
    parameters: {
      count: { type: jsPsychModule.ParameterType.INT, default: 12 },
      practice: { type: jsPsychModule.ParameterType.BOOL, default: false }
    },
    data: {}
  };
  constructor(jsPsych) { this.jsPsych = jsPsych; }
  trial(display, trial) {
    display.innerHTML = `<div class="pvt-surface" aria-label="Reaction-time task. Tap when the blue circle appears.">
      <div class="pvt-label"></div><div class="blue-circle" hidden></div>
      <div class="pvt-message" role="status" aria-live="polite"></div></div>`;
    const surface = display.querySelector('.pvt-surface');
    const circle = display.querySelector('.blue-circle');
    const label = display.querySelector('.pvt-label');
    const message = display.querySelector('.pvt-message');
    const results = [];
    let index = 0, falseStarts = 0, interruptions = 0;
    let state = 'idle', onset = null, timer = null, frame = null;
    const clear = () => { clearTimeout(timer); cancelAnimationFrame(frame); timer = null; frame = null; };
    const later = (fn, ms) => { timer = setTimeout(fn, ms); };
    const updateLabel = () => { label.textContent = `${trial.practice ? 'Practice' : 'Trial'} ${index + 1} / ${trial.count}`; };

    const pause = () => {
      clear(); circle.hidden = true; state = 'paused'; onset = null;
      message.innerHTML = 'Paused<small>Return to the task when you are ready.</small><button class="jspsych-btn" type="button">Resume</button>';
      message.querySelector('button').addEventListener('click', () => {
        if (!document.hidden) startWait();
      }, { once: true });
    };
    const finish = () => {
      clear(); state = 'done';
      surface.removeEventListener('pointerdown', pointer);
      document.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', visibility);
      this.jsPsych.finishTrial({ results, false_starts: falseStarts, interruptions });
    };
    const next = () => {
      if (index >= trial.count) { finish(); return; }
      updateLabel(); startWait();
    };
    const feedback = (html, callback) => {
      // Keep the same interval, but scored trials show only a blank screen.
      clear(); state = 'feedback'; circle.hidden = true;
      message.innerHTML = trial.practice ? html : '';
      later(callback, 800);
    };
    const completeResponse = rt => {
      results.push({ rt, omitted: rt === null });
      feedback(rt === null ? 'No response<small>Tap when the circle appears.</small>' : `${Math.round(rt)} ms`, () => { index++; next(); });
    };
    const showCircle = () => {
      if (document.hidden) { pause(); return; }
      frame = requestAnimationFrame(() => {
        circle.hidden = false;
        onset = performance.now();
        state = 'target';
        later(() => completeResponse(null), 3000);
      });
    };
    const startWait = () => {
      clear(); circle.hidden = true; message.textContent = ''; onset = null;
      if (document.hidden) { pause(); return; }
      // Ignore the tap that began/resumed the task and accidental double taps.
      state = 'settling';
      later(() => {
        state = 'waiting';
        later(showCircle, 2000 + Math.random() * 3000);
      }, 250);
    };
    const respond = () => {
      if (state !== 'waiting' && state !== 'target') return;
      const rt = state === 'target' ? performance.now() - onset : null;
      if (rt === null || rt < 100) {
        falseStarts++;
        feedback('Too soon<small>Wait until you see the blue circle.</small>', startWait);
      } else completeResponse(rt);
    };
    const pointer = event => {
      if (!event.isPrimary || event.button !== 0 || state === 'paused') return;
      event.preventDefault(); respond();
    };
    const key = event => {
      if (event.code !== 'Space' || state === 'paused') return;
      event.preventDefault();
      if (!event.repeat) respond();
    };
    const visibility = () => {
      if (document.hidden && ['waiting', 'target', 'settling'].includes(state)) {
        interruptions++; pause();
      }
    };
    surface.addEventListener('pointerdown', pointer);
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visibility);
    next();
  }
}

if (typeof initJsPsych === 'undefined' || typeof jsPsychHtmlButtonResponse === 'undefined') {
  document.getElementById('experiment').textContent = 'The demo could not load. Upload the vendor folder alongside index.html, then refresh.';
} else {
  const container = document.getElementById('experiment');
  container.replaceChildren();
  let finalScore = null;
  const jsPsych = initJsPsych({ display_element: 'experiment', on_trial_start: () => { container.scrollTop = 0; } });
  const screen = (stimulus, choices, extra = {}) => ({
    type: jsPsychHtmlButtonResponse, stimulus, choices, record_data: false, ...extra
  });
  const timeline = [
    screen(`<div class="eyebrow">Psychomotor vigilance · demo</div><h1>Wait for blue.</h1>
      <div class="preview-circle" aria-hidden="true"></div>
      <p>Watch the white screen.<br>When the <strong>blue circle</strong> appears, <strong>tap anywhere</strong> as quickly as you can.</p>
      <p>On a computer, click or press <strong>Space</strong>.<br>Wait for the circle each time. Avoid tapping early.</p>
      <p class="muted">3 practice trials, then 12 scored trials.<br>About a minute, depending on your responses.</p>
      <p class="muted">Your results stay in this browser. Nothing is saved or uploaded.</p>`, ['Start practice']),
    { type: BlueCirclePVT, count: 3, practice: true, css_classes: ['pvt-active'], record_data: false },
    screen(`<div class="eyebrow">Ready?</div><h1>Keep watching.</h1>
      <p>The next 12 trials count towards your score.<br>Tap anywhere when the blue circle appears.</p>
      <p class="muted">There is no feedback during these trials. Your results appear at the end.</p>`, ['Start the demo']),
    { type: BlueCirclePVT, count: 12, practice: false, css_classes: ['pvt-active'], record_data: true,
      on_finish: data => { finalScore = data; } },
    screen(() => {
      const values = finalScore.results.filter(r => !r.omitted).map(r => r.rt).sort((a,b) => a-b);
      const count = values.length;
      const median = count ? (count % 2 ? values[(count-1)/2] : (values[count/2-1]+values[count/2])/2) : null;
      const mean = count ? values.reduce((a,b)=>a+b,0)/count : null;
      const format = n => n === null ? '—' : `${Math.round(n)} ms`;
      return `<div class="eyebrow">Demo complete</div><h1>Your reaction times.</h1>
        <div class="stats">
          <div class="stat"><strong>${format(median)}</strong><span>Median response time</span></div>
          <div class="stat"><strong>${format(mean)}</strong><span>Mean response time</span></div>
          <div class="stat"><strong>${format(count ? values[0] : null)}</strong><span>Fastest response</span></div>
          <div class="stat"><strong>${count} / 12</strong><span>Completed responses</span></div>
        </div>
        <p>Early responses: <strong>${finalScore.false_starts}</strong><br>
        Responses ≥ 500 ms: <strong>${values.filter(x=>x>=500).length}</strong><br>
        No response within 3 seconds: <strong>${12-count}</strong></p>
        ${finalScore.interruptions ? `<p class="muted">Paused after leaving the page: ${finalScore.interruptions} time(s).</p>` : ''}
        <p class="muted">Practice is excluded. Early responses are retried and excluded from reaction-time averages.</p>
        <p class="muted">A short PVT-style demonstration, not a standardized assessment. Screen and input timing affect the results.</p>
        <p class="muted">Nothing has been saved or uploaded.</p>`;
    }, ['Play again'], { on_finish: () => window.location.reload() })
  ];
  jsPsych.run(timeline);
}
