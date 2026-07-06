/*
  B4: one sound, off by default. A short metallic tick synthesized with
  the Web Audio API: two inharmonic sine partials (struck-metal modes)
  plus a 15ms band-passed noise transient for the contact. Under 80ms,
  zero bytes of assets. The AudioContext is created lazily inside tick,
  which only ever runs from user gestures, and nothing plays unless the
  user has switched sound on.
*/
let audio = null;
let enabled = localStorage.getItem('rank-one:sound') === 'on';
const subscribers = new Set();

export const soundEnabled = () => enabled;

export function onSoundChange(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export function setSound(on) {
  enabled = on;
  localStorage.setItem('rank-one:sound', on ? 'on' : 'off');
  subscribers.forEach((fn) => fn(on));
  /* Audible confirmation, played inside the toggling gesture. */
  if (on) tick('cut');
}

function ensureContext() {
  if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === 'suspended') audio.resume();
  return audio;
}

export function tick(kind = 'cut') {
  if (!enabled) return;
  const ctx = ensureContext();
  const t0 = ctx.currentTime + 0.001;
  const base = kind === 'route' ? 2600 : 4200; /* route sits lower */
  const dur = kind === 'route' ? 0.075 : 0.06;

  const master = ctx.createGain();
  master.gain.value = 0.4;
  master.connect(ctx.destination);

  for (const [ratio, level] of [
    [1, 0.28],
    [2.756, 0.14],
  ]) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = base * ratio;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur);
  }

  const noiseLen = Math.ceil(ctx.sampleRate * 0.015);
  const buffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = base * 1.6;
  bandpass.Q.value = 8;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.5, t0);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.03);
  noise.connect(bandpass).connect(noiseGain).connect(master);
  noise.start(t0);
}
