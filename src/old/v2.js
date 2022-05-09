"use strict";
//import * as Tone from 'tone';

import { start, MidiClass, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline} from 'tone';


//const buffer = new ToneAudioBuffer();
let oscillator1 = [...Array(32)]; // player voices
let gains = [...Array(32)];
let randomGainValues= [...Array(32)];
let exponentialGainValues = [...Array(32)];
let arrayTest = [...Array(32)];
let frequencies =  [...Array(32)];
let offsetFRQ = 5;
const synth = new Synth().toDestination();

Transport.bpm.value = 80;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const newRandomGainsButton = document.getElementById('init');

document.getElementById('init').addEventListener('click', () => {
    console.log('blubb');
})

frequencies.forEach((item,index) => {
    frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ,2)));
});

console.log(frequencies);

function exponentialGains(index){
    let scaledIndex = index / 32;
    exponentialGainValues [index] = Math.round(Math.pow(scaledIndex-1,2)*100)/1000;
    arrayTest[index] = exponentialGainValues [index] * Math.round(Math.random()*10)/10;

    return (arrayTest[index]);
}

function randomGains (index){
    randomGainValues[index] = Math.round(Math.random()*10)/1000;
    return (randomGainValues[index]);
};

const env = new AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8,
}).toDestination();

startButton.addEventListener('click', async () => {
    
    await start();
    Transport.start();

    gains = gains.map((item,index) => {
        return (new Gain({gain: exponentialGains(index)}).connect(env)); //connect(env)
    });

    oscillator1 = oscillator1.map((item,index) => {
        return (new Oscillator({frequency: frequencies[index], type: "sine"})).connect(gains[index]).start();
    });

    console.log(exponentialGainValues);
    console.log(arrayTest);
    //console.log(randomGainValues);

  });

stopButton.addEventListener('click',() => {
    oscillator1.forEach((item,index) =>{
        return (oscillator1[index] = oscillator1.stop());
    });
});

Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	env.triggerAttackRelease('16n',time);
}, "8n");