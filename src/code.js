"use strict";
//import * as Tone from 'tone';

import { start, MidiClass, Part, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline, ToneAudioBuffer, Player} from 'tone';
import * as Nexus from 'nexusui';

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

//initialize player
const playerKick = new Player(bufferKick1).toDestination();

//Sequencer Interface
var sequencer = new
Nexus.Sequencer('#seq',{
    'size': [750,200],
    'mode': 'toggle',
    'rows': 6,
    'columns': 48,
   });
sequencer.colorize("fill","#808080")
sequencer.colorize("accent","#000000")

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

const generateButton = document.getElementById('generate');
const playButton = document.getElementById('play');
//const stopButton = document.getElementById('stop');
//const newRandomGainsButton = document.getElementById('init');


frequencies.forEach((item,index) => {
    frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ,2)));
});

//console.log(frequencies);

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
    attack: 0.0,
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
    console.log(arrayABS);
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
    console.log(count);

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
        
        console.log("Kick: " + array);

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
    console.log(count);

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
            
            console.log("Bass: " + array);
    
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
                console.log('false');
                return false;
            }
            else
            {   
                //console.log(fullgeneratedKick[i+offset]);
                console.log('true');
                return true;
            }
    })) {
        break;
    }

    }

    return array;

}

function checklastTrigger(array){
    if(array[14] === 1 ) return 1;
    else return 0;
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
    const bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedBar1Kick = kickRhythm(bar1Kick,flag);
    flag = checklastTrigger(bar1Kick);
    const generatedBar2Kick = kickRhythm(bar2Kick,flag);
    flag = checklastTrigger(bar2Kick);
    const generatedBar3Kick = kickRhythm(bar3Kick,flag);

    const fullgeneratedKick = generatedBar1Kick.concat(generatedBar2Kick,generatedBar3Kick);
    const output = generatedBar1Kick.concat(generatedBar2Kick,generatedBar3Kick);
    sequencer.matrix.set.row(2,output);

    const fullKickOutput = [generatedBar1Kick, generatedBar2Kick, generatedBar3Kick];

    //Generate Bass
    const bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedBar1Bass = bassRhythm(bar1Bass,fullKickOutput,flag,0);
    flag = checklastTrigger(bar1Bass);
    const generatedBar2Bass = bassRhythm(bar2Bass,fullKickOutput,flag,1);
    flag = checklastTrigger(bar2Bass);
    const generatedBar3Bass = bassRhythm(bar3Bass,fullKickOutput,flag,2);

    const fullgeneratedBass = generatedBar1Bass.concat(generatedBar2Bass,generatedBar3Bass);
    sequencer.matrix.set.row(3,fullgeneratedBass);

    const fullBassOutput = [generatedBar1Kick, generatedBar2Kick, generatedBar3Kick];

    // Generate Rhythm Figure 1
    const bar1RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar3RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var flag = 0;
    const generatedRhythmFigure1Bar1 = bassRhythm(bar1RhythmFigure1,fullBassOutput,flag,0);
    flag = checklastTrigger(bar1Bass);
    const generatedRhythmFigure1Bar2 = bassRhythm(bar2RhythmFigure1,fullBassOutput,flag,1);
    flag = checklastTrigger(bar2Bass);
    const generatedRhythmFigure1Bar3 = bassRhythm(bar3RhythmFigure1,fullBassOutput,flag,2);

    const fullgeneratedRhythmFigure1 = generatedRhythmFigure1Bar1.concat(generatedRhythmFigure1Bar2,generatedRhythmFigure1Bar3);
    sequencer.matrix.set.row(4,fullgeneratedRhythmFigure1);

    // load audio samples
    await bufferKick1.load(audioFileUrlKick1);
    await bufferKick2.load(audioFileUrlKick2);
    await bufferKick3.load(audioFileUrlKick3);

    await bufferBass101.load(audioFileUrlBass101);
    await bufferBass102.load(audioFileUrlBass102);
    await bufferBass103.load(audioFileUrlBass103);

    //play sounds
    function play(time, note) {
        console.log('trigger', time, note)
        playerKick.start(time);
    };

    console.log(fullgeneratedKick);
    var current = 0;
    var pattern = fullgeneratedKick
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

    console.log(pattern);

    pattern = pattern.filter(e => e[0] === 1)

    console.log(pattern);

    pattern = pattern.map((e,i) => [e[1], `C${i}`]);

    console.log(pattern);

    //console.log(pattern);
    const part = new Part(play, pattern);

    Transport.bpm.value = 150;
    //Transport.start();

    
    //part.length = 48;
    part.loopEnd = '3:0:0';
    part.loop = true;
    console.log(part.loopEnd);
    part.start();
    

});



/*
Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	env.triggerAttackRelease('8n',time);
}, "4n");*/