import './style.css'
import { setupCounter } from './counter.js'
import * as Tone from "tone";


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Mini Midi</h1>
    <button id="userGesture">Start Tone.JS sound</button>
  </div>
`
// Start Tone.js audio context on user gesture
const userGestureButton = document.getElementById("userGesture");
userGestureButton.addEventListener('click', async () => {
  await Tone.start();
  console.log("Audio context started");
})

// const synth = new Tone.Synth().toDestination();
const now = Tone.now();

const synth = new Tone.Synth({
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.8,
  }
}).toDestination();

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaves = ['1', '2', '3', '4', '5', '6', '7'];
const noteList = []

const makeNotesList = (notes, octaves) => {
  for (let octave of octaves) {
    for (let note of notes) {
      noteList.push(`${note}${octave}`)
    }
  }
}
makeNotesList(notes, octaves)


const triggers = document.getElementById("triggers")
for (let noteOctave of noteList) {
  const soundButton = document.createElement("button")
  soundButton.value = noteOctave
  soundButton.id = noteOctave
  soundButton.innerText = noteOctave
  if (noteOctave.match(/\#/)) {
    soundButton.className = "black-key"
  }
  else soundButton.className = "white-key"

  triggers.appendChild(soundButton)

  const buttonPlay = document.getElementById(noteOctave)
  buttonPlay.addEventListener('click', (e) => {
    // synth.triggerAttackRelease(noteOctave, "8n");
    synth.triggerAttack(noteOctave);  // Start the sound
    synth.triggerRelease("+0.5");      // Release after 0.5 seconds
    // synth.triggerAttack(noteOctave, now);
    // synth.triggerRelease(now + 1);
  })

}





setupCounter(document.querySelector('#counter'))
