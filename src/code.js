"use strict";
import {Destination, LFO, Waveform, Reverb, Tremolo, Noise, start, MidiClass, Part, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline, ToneAudioBuffer, Player} from 'tone';
import * as Nexus from 'nexusui';

//import files
import audioFileUrlKick1 from 'url:./samples/kick01.mp3';
import audioFileUrlKick2 from 'url:./samples/kick02.mp3';
import audioFileUrlKick3 from 'url:./samples/kick03.mp3';

import audioFileUrlBass101 from 'url:./samples/bass101.mp3';

import audioFileUrlKlick1 from 'url:./samples/klick1.mp3';
import audioFileUrlKlick2 from 'url:./samples/klick2.mp3';
import audioFileUrlKlick3 from 'url:./samples/klick3.mp3';
import audioFileUrlKlick4 from 'url:./samples/klick4.mp3';
import audioFileUrlKlick5 from 'url:./samples/klick5.mp3';
import audioFileUrlKlick6 from 'url:./samples/klick6.mp3';
import audioFileUrlKlick7 from 'url:./samples/klick7.mp3';
import audioFileUrlKlick8 from 'url:./samples/klick8.mp3';
import audioFileUrlKlick9 from 'url:./samples/klick9.mp3';
import audioFileUrlKlick10 from 'url:./samples/klick10.mp3';
import audioFileUrlKlick11 from 'url:./samples/klick11.mp3';
import audioFileUrlKlick12 from 'url:./samples/klick12.mp3';
import audioFileUrlKlick13 from 'url:./samples/klick13.mp3';
import audioFileUrlKlick14 from 'url:./samples/klick14.mp3';
import audioFileUrlKlick15 from 'url:./samples/klick15.mp3';
import audioFileUrlKlick16 from 'url:./samples/klick16.mp3';

//initialize kicks into buffer
const bufferKick1 = new ToneAudioBuffer();
const bufferKick2 = new ToneAudioBuffer();
const bufferKick3 = new ToneAudioBuffer();

const bufferBass101 = new ToneAudioBuffer();

const bufferKlick1 = new ToneAudioBuffer();
const bufferKlick2 = new ToneAudioBuffer();
const bufferKlick3 = new ToneAudioBuffer();
const bufferKlick4 = new ToneAudioBuffer();
const bufferKlick5 = new ToneAudioBuffer();
const bufferKlick6 = new ToneAudioBuffer();
const bufferKlick7 = new ToneAudioBuffer();
const bufferKlick8 = new ToneAudioBuffer();
const bufferKlick9 = new ToneAudioBuffer();
const bufferKlick10 = new ToneAudioBuffer();
const bufferKlick11 = new ToneAudioBuffer();
const bufferKlick12 = new ToneAudioBuffer();
const bufferKlick13 = new ToneAudioBuffer();
const bufferKlick14 = new ToneAudioBuffer();
const bufferKlick15 = new ToneAudioBuffer();
const bufferKlick16 = new ToneAudioBuffer();

//master gains
const kickMasterGain = new Gain(0.7).toDestination();
const klickMasterGain = new Gain(0.9).toDestination();

//initialize palyers
const playerKick1 = new Player(bufferKick1).connect(kickMasterGain);
const playerKick2 = new Player(bufferKick2).connect(kickMasterGain);
const playerKick3 = new Player(bufferKick3).connect(kickMasterGain);
const playerBass = new Player(bufferBass101).connect(kickMasterGain);
const playerKlick1 = new Player(bufferKlick1).connect(klickMasterGain);
const playerKlick2 = new Player(bufferKlick2).connect(klickMasterGain);
const playerKlick3 = new Player(bufferKlick3).connect(klickMasterGain);
const playerKlick4 = new Player(bufferKlick4).connect(klickMasterGain);
const playerKlick5 = new Player(bufferKlick5).connect(klickMasterGain);
const playerKlick6 = new Player(bufferKlick6).connect(klickMasterGain);
const playerKlick7 = new Player(bufferKlick7).connect(klickMasterGain);
const playerKlick8 = new Player(bufferKlick8).connect(klickMasterGain);
const playerKlick9 = new Player(bufferKlick9).connect(klickMasterGain);
const playerKlick10 = new Player(bufferKlick10).connect(klickMasterGain);
const playerKlick11 = new Player(bufferKlick11).connect(klickMasterGain);
const playerKlick12 = new Player(bufferKlick12).connect(klickMasterGain);
const playerKlick13 = new Player(bufferKlick13).connect(klickMasterGain);
const playerKlick14 = new Player(bufferKlick14).connect(klickMasterGain);
const playerKlick15 = new Player(bufferKlick15).connect(klickMasterGain);
const playerKlick16 = new Player(bufferKlick16).connect(klickMasterGain);




//initialize reverb
const rhythmfigure2MasterGain = new Gain(1).toDestination();
//const reverbRhythmFigure2 = new Reverb(5).connect(rhythmfigure2MasterGain);
const reverbRhythmFigure2 = new Reverb(5).toDestination();
reverbRhythmFigure2.wet = 0.1
var gaindDroneMaster = new Gain(0.6).toDestination();
const reverbDrone = new Reverb(200).connect(gaindDroneMaster);


//Sequencer Interface
var sequencer = new
Nexus.Sequencer('#seq',{
    'size': [750,250],
    'mode': 'toggle',
    'rows': 7,
    'columns': 48,
   });
sequencer.colorize("fill","#808080")
sequencer.colorize("accent","#000000")

//initialize array


//const buffer = new ToneAudioBuffer();
let oscillatorRhythmFigure1 = [...Array(32)]; // player voices
let gainsRythmFigure1 = [...Array(32)];
let oscillatorRhythmFigure2 = [...Array(32)]; // player voices
let gainsRythmFigure2 = [...Array(32)];
let oscillatorDrone = [...Array(32)];
let gainsDrone = [...Array(32)];
let tremoloDrone = [...Array(32)];
let lfoDrone = [...Array(32)];
let noise = [...Array(32)];
let randomGainValues= [...Array(32)];
let exponentialGainValues = [...Array(32)];
let arrayTest = [...Array(32)];
let frequencies =  [...Array(32)];
let offsetFRQ1 = 2;
let frequenciesRhythmFigure2 =  [...Array(32)];
let offsetFRQ2 = 10;
const synth = new Synth().toDestination();

const generateButton = document.getElementById('generate')


frequencies.forEach((item,index) => {
    frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ1,2)));
});

frequenciesRhythmFigure2.forEach((item,index) => {
    frequenciesRhythmFigure2[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ2,2)));
});

function exponentialGain(index,dropgains,loudnessControl){
    const scaledIndex = index / 32;
    const random = Math.random();
    let exponentialGainValue = Math.round(Math.pow(scaledIndex-1,2)*100)/loudnessControl;
    //console.log(exponentialGainValue);
    exponentialGainValue *= Math.round(Math.random()*10)/10;
    
    if (random <= dropgains) return (exponentialGainValue);
    else return 0;
}

const envRhythmFigure1 = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 1.0,
    sustain: 0.0,
    release: 0.0,
}).toDestination();

const envRhythmFigure1Noise = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.5,
    sustain: 0.0,
    release: 0.0,
}).toDestination();

const envRhythmFigure2 = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.01,
    sustain: 0.6,
    release: 0.1,
}).toDestination();

const envDrone = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.01,
    sustain: 0.7,
    release: 0.1,
}).connect(reverbDrone);

function shuffle(array) {
    const r = (from = 0, to = 1) => from + Math.random() * (to - from);
	var m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(r() * m--); 
		t = array[m]; // temporary storage
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}


function triggerABS(array)
{   
    const arrayABS = [];
    var x = 0;
    var z = 0;
    var y = new Boolean(false);
    var a = new Boolean(false);

        for (var i = 0; i < 16; i++) {
            if (i === 15)
            {   
                z++;
                arrayABS[x] = z;
            }
            else if (array[i] === 0) {
                if (y === true){
                    a = true;
                    z++;
                }
            }
            else if (array[i] === 1){
                y = true;
                if (i > 0 && a === true){
                    z++;
                    arrayABS[x] = z;
                    x++;
                    z = 0;
                }
            }
          }
   //console.log(arrayABS);
    return(arrayABS);

}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function kickRhythm(array,flag){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });
   //console.log(count);

    var arrayABS = [];
    while (true)
    {
        //1. Rule
        while(true) {
            array = shuffle(array);
            if (array.every((e,i) => {
                if(e === 1) return i % 2 === 0;
                else return true; // wenns kein schlag ist alles gut, soll weither ggehen
            })) {
                break;
            }
        }
        
       //console.log("Kick: " + array);

        //2. Rule
        arrayABS = triggerABS(array);

        if(flag === 1){ // 4. Rule
            if(array[0] === 0){
                if (arrayABS.every((e,i) => {
                    if(e < 4 && i === count-1){ // 3. Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
        }

        else if (flag === 0){ // 4. Rule
            if (arrayABS.every((e,i) => {
                if(e < 4 && i === count-1){ // 3.Rule
                    return true
                }
                else if(e < 4) return false;
                else return true;
            })) {
                break;
            }
        }



    }
    
return array;
}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]
5. Rule: tirgger can not land on Kick tirgger*/
function bassRhythm(array, fullKickOutput,flag,offset){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });
   //console.log(count);

    var arrayABS = [];

    while(true){
        while (true)
        {
            //1. Rule
            while(true) {
                array = shuffle(array);
                if (array.every((e,i) => {
                    if(e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                    break;
                }
            }
            
            //console.log("Bass: " + array);
    
            //2. Rule
            arrayABS = triggerABS(array);
    
            if(flag === 1){ // 4. Rule
                if(array[0] === 0){
                    if (arrayABS.every((e,i) => {
                        if(e < 4 && i === count-1){ // 3. Rule
                            return true
                        }
                        else if(e < 4) return false;
                        else return true;
                    })) {
                        break;
                    }
                }
            }
    
            else if (flag === 0){ // 4. Rule
                if (arrayABS.every((e,i) => {
                    if(e < 4 && i === count-1){ // 3.Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
    
    
    
        }

        // 5. Rule 
        if (array.every((e,i) => {

            if(array[i] === 1 && array[i] === fullKickOutput[offset][i])
            {
                //console.log('false');
                return false;
            }
            else
            {   
                //console.log(fullgeneratedKick[i+offset]);
                //console.log('true');
                return true;
            }
    })) {
        break;
    }

    }

    return array;

}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function RhythmFigures(array, flag){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });
    //console.log(count);

    var arrayABS = [];

    while(true){
        while (true)
        {
            //1. Rule
            while(true) {
                array = shuffle(array);
                if (array.every((e,i) => {
                    if(e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                    break;
                }
            }
            
            //console.log("Bass: " + array);
    
            //2. Rule
            arrayABS = triggerABS(array);
    
            if(flag === 1){ // 4. Rule
                if(array[0] === 0){
                    if (arrayABS.every((e,i) => {
                        if(e < 4 && i === count-1){ // 3. Rule
                            return true
                        }
                        else if(e < 4) return false;
                        else return true;
                    })) {
                        break;
                    }
                }
            }
    
            else if (flag === 0){ // 4. Rule
                if (arrayABS.every((e,i) => {
                    if(e < 4 && i === count-1){ // 3.Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
    
    
    
        }

     {
        break;
    }

    }

    return array;

}

function checklastTrigger(array){
    if(array[14] === 1 ) return 1;
    else return 0;
}

/*
1. Rule: Klicks düfren überall laden
2. Rule: Klicks werden in zwei Gruppen abwechselnd abgespielt
3. Rule: Wenn Gruppe1(Klicks werde nicht gepielt, Pause) dann wird bis zu 4 Schläge lang keine Klicks abgespielt
4. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden bis zu 6 Klicks hintereinander abgespielt
5. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden kommt danach immer Gruppe1 mit einer Pause
6. Rule: Länge von beiden Gruppen sind zufällig
*/
function generateKlicks(){
    //var array = new Array(48).fill(1);
    //return array;
    var array = new Array(48).fill(0);
    array = array.map((e,i) => {
        if(i % 2 === 0) return 1;
        else return 0;
    });

   //console.log(array);
    return array;

/*  var array = new Array(48).fill(0);
    var random = 0;
    var flag = 0;
    var counteroff = Math.ceil(Math.random()*4);
    var counteron = Math.ceil(Math.random()*4);

    array = array.map((e,i) => {

        random = Math.random()
        if (flag === 0)
        {   
            if(counteroff === 0){
                counteron = 2 + Math.ceil(Math.random()*4);
                flag = 1;
                return 0;
            }
            counteroff--;
            return 0;
        }

        else
        {   
            if(counteron === 0){
                flag = 0;
                counteroff = Math.ceil(Math.random()*4);
                return 1;
            }
            counteron--;
            return 1;
        }
    });


   //console.log(array);
    return array;
*/
}

generateButton.addEventListener('click', async () => {
    await start();
    Transport.start();

    //Initialize Bar and Beat
    const bar = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const quarterNote = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
    sequencer.matrix.set.row(0,bar);
    sequencer.matrix.set.row(1,quarterNote);

    //Generate Kicks
    const bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedBar1Kick = kickRhythm(bar1Kick,flag);
    flag = checklastTrigger(generatedBar1Kick);
    const generatedBar2Kick = kickRhythm(bar2Kick,flag);
    flag = checklastTrigger(generatedBar2Kick);
    const generatedBar3Kick = kickRhythm(bar3Kick,flag);

    const fullgeneratedKick = generatedBar1Kick.concat(generatedBar2Kick,generatedBar3Kick);
    var output = generatedBar1Kick.concat(generatedBar2Kick,generatedBar3Kick);
    sequencer.matrix.set.row(2,output);

    const fullKickOutput = [generatedBar1Kick, generatedBar2Kick, generatedBar3Kick];

    //Generate Bass
    const bar1Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedBar1Bass = bassRhythm(bar1Bass,fullKickOutput,flag,0);
    flag = checklastTrigger(generatedBar1Bass);
    const generatedBar2Bass = bassRhythm(bar2Bass,fullKickOutput,flag,1);
    flag = checklastTrigger(generatedBar2Bass);
    const generatedBar3Bass = bassRhythm(bar3Bass,fullKickOutput,flag,2);

    const fullgeneratedBass = generatedBar1Bass.concat(generatedBar2Bass,generatedBar3Bass);
    var output = generatedBar1Bass.concat(generatedBar2Bass,generatedBar3Bass);
    sequencer.matrix.set.row(3,output);

    const fullBassOutput = [generatedBar1Kick, generatedBar2Kick, generatedBar3Kick];

    // Generate Rhythm Figure 1
    const bar1RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedRhythmFigure1Bar1 = RhythmFigures(bar1RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar1);
    const generatedRhythmFigure1Bar2 = RhythmFigures(bar2RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar3 = RhythmFigures(bar3RhythmFigure1,flag);

    const fullgeneratedRhythmFigure1 = generatedRhythmFigure1Bar1.concat(generatedRhythmFigure1Bar2,generatedRhythmFigure1Bar3);

    // Generate Rhythm Figure 2
    const bar1RhythmFigure2 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2RhythmFigure2 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3RhythmFigure2 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedRhythmFigure2Bar1 = RhythmFigures(bar1RhythmFigure2,flag);
    flag = checklastTrigger(generatedRhythmFigure2Bar1);
    const generatedRhythmFigure2Bar2 = RhythmFigures(bar2RhythmFigure2,flag);
    flag = checklastTrigger(generatedRhythmFigure2Bar2);
    const generatedRhythmFigure2Bar3 = RhythmFigures(bar3RhythmFigure2,flag);

    const fullgeneratedRhythmFigure2 = generatedRhythmFigure2Bar1.concat(generatedRhythmFigure2Bar2,generatedRhythmFigure2Bar3);

    // Generate Klicks
    const fullgeneratedKlicks = generateKlicks();
    
    // load audio samples
    await bufferKick1.load(audioFileUrlKick1);
    await bufferKick2.load(audioFileUrlKick2);
    await bufferKick3.load(audioFileUrlKick3);

    await bufferBass101.load(audioFileUrlBass101);

    await bufferKlick1.load(audioFileUrlKlick1);
    await bufferKlick2.load(audioFileUrlKlick2);
    await bufferKlick3.load(audioFileUrlKlick3);
    await bufferKlick4.load(audioFileUrlKlick4);
    await bufferKlick5.load(audioFileUrlKlick5);
    await bufferKlick6.load(audioFileUrlKlick6);
    await bufferKlick7.load(audioFileUrlKlick7);
    await bufferKlick8.load(audioFileUrlKlick8);
    await bufferKlick9.load(audioFileUrlKlick9);
    await bufferKlick10.load(audioFileUrlKlick10);
    await bufferKlick11.load(audioFileUrlKlick11);
    await bufferKlick12.load(audioFileUrlKlick11);
    await bufferKlick12.load(audioFileUrlKlick12);
    await bufferKlick13.load(audioFileUrlKlick13);
    await bufferKlick14.load(audioFileUrlKlick14);
    await bufferKlick15.load(audioFileUrlKlick15);
    await bufferKlick16.load(audioFileUrlKlick16);


    //start transport
    Transport.bpm.value = 150;
    Transport.start();

    //------>>>>play Kick 
    function playKick(time, note) {
       //console.log('kick', time, note)
        const random = Math.ceil(Math.random()*3);
        if(random === 3) playerKick1.start(time);
        else if(random === 2) playerKick2.start(time);
        else playerKick3.start(time);
        
    };

    var current = 0;
    var patternKick = fullgeneratedKick
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });
    patternKick = patternKick.filter(e => e[0] === 1)
    patternKick = patternKick.map((e,i) => [e[1], `C${i}`]);

    const partKick = new Part(playKick, patternKick);

    partKick.loopEnd = '3:0:0';
    partKick.loop = true;

    //------>>>>play Bass
    function playBass(time, note) {
       //console.log('bass', time, note)
        playerBass.start(time);
    };

   //console.log(fullgeneratedBass);
    current = 0;
    var patternBass = fullgeneratedBass
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });

    patternBass = patternBass.filter(e => e[0] === 1)
    patternBass = patternBass.map((e,i) => [e[1], `C${i}`]);

    const partBass = new Part(playBass, patternBass);

    partBass.loopEnd = '3:0:0';
    partBass.loop = true;
    

    //------>>>>play Rythm Figure 1
    gainsRythmFigure1 = gainsRythmFigure1.map((item,index) => {
        return (new Gain({gain: exponentialGain(index,0.5,150)}).connect(envRhythmFigure1)); //connect(env)
    });

    const gainNoiseRhythmFigure1 = new Gain(0.2).connect(envRhythmFigure1Noise);
    const noiseRhythmFigure1 = new Noise("pink").connect(gainNoiseRhythmFigure1).start();

    oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item,index) => {
        return (new Oscillator({frequency: frequencies[index], type: "sine"})).connect(gainsRythmFigure1[index]).start();
    });

    function playRhythmFigure1(time, note) {
       //console.log('RhythmFigure1', time, note)
        envRhythmFigure1Noise.triggerAttackRelease(time);
        envRhythmFigure1.triggerAttackRelease(time);
        //playerBass.start(time);
    };

   //console.log(fullgeneratedRhythmFigure1);
    current = 0;
    var patternRhythmFigure1 = fullgeneratedRhythmFigure1
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });
    
    patternRhythmFigure1 = patternRhythmFigure1.filter(e => e[0] === 1)
    patternRhythmFigure1 = patternRhythmFigure1.map((e,i) => [e[1], `C${i}`]);

    const partRhythmFigure1 = new Part(playRhythmFigure1, patternRhythmFigure1);

    partRhythmFigure1.loopEnd = '3:0:0';
    partRhythmFigure1.loop = true;

       //------>>>>play Rythm Figure 2
    gainsRythmFigure2 = gainsRythmFigure2.map((item,index) => {
        return (new Gain({gain: exponentialGain(index,0.5,500)}).connect(envRhythmFigure2)); //connect(env)
    });

    oscillatorRhythmFigure2 = oscillatorRhythmFigure2.map((item,index) => {
        return (new Oscillator({frequency: frequenciesRhythmFigure2[index], type: "sine"})).connect(gainsRythmFigure2[index]).start();
    });

    function playRhythmFigure2(time, note) {
       //console.log('RhythmFigure2', time, note)
        envRhythmFigure2.triggerAttackRelease(time,"8n");
    };

   //console.log(fullgeneratedRhythmFigure2);
    current = 0;
    var patternRhythmFigure2 = fullgeneratedRhythmFigure2
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });
    
    patternRhythmFigure2 = patternRhythmFigure2.filter(e => e[0] === 1)
    patternRhythmFigure2 = patternRhythmFigure2.map((e,i) => [e[1], `C${i}`]);

    const partRhythmFigure2 = new Part(playRhythmFigure2, patternRhythmFigure2);

    partRhythmFigure2.loopEnd = '3:0:0';
    partRhythmFigure2.loop = true;
    
    //------>>>>play Klick
    function playKlick(time, note) {
       //console.log('klick', time, note)
        const random = Math.floor(Math.random()*16);
        if (random === 0) playerKlick1.start(time);
        if (random === 1) playerKlick2.start(time);
        if (random === 2) playerKlick3.start(time);
        if (random === 3) playerKlick4.start(time);
        if (random === 4) playerKlick5.start(time);
        if (random === 5) playerKlick6.start(time);
        if (random === 6) playerKlick7.start(time);
        if (random === 7) playerKlick8.start(time);
        if (random === 8) playerKlick9.start(time);
        if (random === 9) playerKlick10.start(time);
        if (random === 10) playerKlick11.start(time);
        if (random === 11) playerKlick12.start(time);
        if (random === 12) playerKlick13.start(time);
        if (random === 13) playerKlick14.start(time);
        if (random === 14) playerKlick15.start(time);
        if (random === 15) playerKlick16.start(time);
    };

   //console.log(fullgeneratedKlicks);
    current = 0;
    var patternKlick = fullgeneratedKlicks
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });
    patternKlick = patternKlick.filter(e => e[0] === 1)
    patternKlick = patternKlick.map((e,i) => [e[1], `C${i}`]);

    const partKlick = new Part(playKlick, patternKlick);

    partKlick.loopEnd = '3:0:0';
    partKlick.loop = true;

    //------>>>>play Drone
    const droneTrigger = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    const droneGain = new Gain(0.6).toDestination();
    gainsDrone = gainsDrone.map((item,index) => {
        return (new Gain({gain: exponentialGain(index,0.4,800)}).connect(droneGain)); //connect(env)
    });
    
    /*tremoloDrone = tremoloDrone.map((item,index) => {
        return (new Tremolo("8n", 0.8).connect(gainsDrone[index]).start());
    });*/

    const lfoDrone = new LFO({frequency: "8n", min: 0, max: 1, amplitude: 0}).connect(droneGain.gain).start();

    oscillatorDrone = oscillatorDrone.map((item,index) => {
        return (new Oscillator({frequency: frequencies[index], type: "sine"})).connect(gainsDrone[index]).start();
    });

    function playDrone(time, note) {
        console.log('drone', time, note);
        gainsDrone.forEach(
            (e,i) => {
                e.gain.rampTo(exponentialGain(i, 0.4, 800),1);
            });
        //envDrone.triggerAttackRelease(time, "3:0:0");
    };


    current = 0;
    var patternDrone = droneTrigger
        .map((e,i) => {
            if(i<=15){
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            }
            else if(i>=16 && i<32) {
                current = i-16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } 
            else{
                current = i-32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            }
        });
    
   //console.log(patternDrone);
    patternDrone = patternDrone.filter(e => e[0] === 1)
    patternDrone = patternDrone.map((e,i) => [e[1], `C${i}`]);

    const partDrone = new Part(playDrone, patternDrone);
    partDrone.loopEnd = '3:0:0';
    partDrone.loop = true;

    //------>>>>set seqeuncer

    
    //------>>>>set seqeuncer
    sequencer.matrix.set.row(4,fullgeneratedRhythmFigure1);
    sequencer.matrix.set.row(5,fullgeneratedRhythmFigure2);
    sequencer.matrix.set.row(6,fullgeneratedKlicks);

    partKick.start();
    partBass.start();
    partRhythmFigure1.start();
    //partRhythmFigure2.start();
    partKlick.start();
    partDrone.start();

});

