"use strict";
//import * as Tone from 'tone';

import { start, MidiClass, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline, ToneAudioBuffer, Player} from 'tone';

//import files
import audioFileUrlKick1 from 'url:./samples/kick01.mp3';
import audioFileUrlKick2 from 'url:./samples/kick02.mp3';
import audioFileUrlKick3 from 'url:./samples/kick03.mp3';

import audioFileUrlBass101 from 'url:./samples/bass101.mp3';
import audioFileUrlBass102 from 'url:./samples/bass102.mp3';
import audioFileUrlBass103 from 'url:./samples/bass103.mp3';

//initialize kicks into buffer
const bufferKick1 = new ToneAudioBuffer();
const bufferKick2 = new ToneAudioBuffer();
const bufferKick3 = new ToneAudioBuffer();

const bufferBass101 = new ToneAudioBuffer();
const bufferBass102 = new ToneAudioBuffer();
const bufferBass103 = new ToneAudioBuffer();



//initialize array


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
//const stopButton = document.getElementById('stop');
//const newRandomGainsButton = document.getElementById('init');

/*document.getElementById('init').addEventListener('click', () => {
    console.log('blubb');
})*/

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

function shuffle(array) {
    const r = (from = 0, to = 1) => from + Math.random() * (to - from);
	var m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(r() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array.sort();
}

/*function checkTriggerDistance(array)
{
    array.map((d,i) => {
        d - array[i-1] < 4 ? 1 : 
        return d - array[i-1] < 4 ? 1 :
    });

}*/

// 1. 3 trigger innheralb von 1. Bar von 3 Bars // random 3 von 16
// 2. Kick landet immer auf ungeraden 16t //  == 16th % 2 = 1
// 3. Kicks haben immer min. inkl. 4 Schläge // Abs zueinander d >= 4

function kickRhythm (){
    
    /*const kickArray = new Array(48).fill(0).map((d,i)=> {
        
    };*/

    const bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2Kick = [17,19,21,23,25,27,29,31];
    const bar3Kick = [33,35,37,39,41,43,45,47];

    console.log(bar1Kick.length);

    shuffle(bar1Kick);
    shuffle(bar2Kick);
    shuffle(bar3Kick);

    const randomTriggersBar1 = bar1Kick.slice(0,3);
    const randomTriggersBar2 = bar2Kick.slice(0,2);
    const randomTriggersBar3 = bar3Kick.slice(0,2);

    console.log(randomTriggersBar1);
    console.log(randomTriggersBar2);
    console.log(randomTriggersBar3);

    //checkTriggerDistance(randomTriggersBar1);

    /*const kickArray = new Array(48).fill(0).map((d,i)=> {
        
        //return i % 2 === 1 ? 1 : Math.round(Math.random())
        const section= 10;
        i += 1;

        if (i % 2 === 1) {
            

            return 1;
        }
        else {
            return 0;
        }
    
    });*/

    console.log(kickArray);
};

/*function bassRhythm1(){

    const bass1Array = new Array(48).fill(0).map((d,i) => {

        

    };

};*/

startButton.addEventListener('click', async () => {
    
    await start();
    Transport.start();

    kickRhythm()
    bassRhythm1()


    await bufferKick1.load(audioFileUrlKick1);
    await bufferKick2.load(audioFileUrlKick2);
    await bufferKick3.load(audioFileUrlKick3);

    await bufferBass101.load(audioFileUrlBass101);
    await bufferBass102.load(audioFileUrlBass102);
    await bufferBass103.load(audioFileUrlBass103);



    const player = new Player(bufferKick1).toDestination();
    player.loop = true;
    //player.start();

    gains = gains.map((item,index) => {
        return (new Gain({gain: exponentialGains(index)}).connect(env)); //connect(env)
    });

    /*oscillator1 = oscillator1.map((item,index) => {
        return (new Oscillator({frequency: frequencies[index], type: "sine"})).connect(gains[index]).start();
    });*/

    console.log(exponentialGainValues);
    console.log(arrayTest);
    //console.log(randomGainValues);

  });

Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	env.triggerAttackRelease('16n',time);
}, "8n");