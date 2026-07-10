class Sound {
    constructor(type) {
        this.type = type;
    }
    noteConvert = {
        C: [261.626, 0],
        "C#": [277.18, 1],
        D: [293.66, 2],
        Eb: [311.13, 3],
        E: [329.63, 4],
        F: [349.23, 5],
        "F#": [369.99, 6],
        G: [392.0, 7],
        Ab: [415.3, 8],
        A: [440, 9],
        Bb: [466.16, 10],
        B: [493.88, 11],
        convert: function (note, hzReturn) {
            var originialNote = note.split("");
            note = note.split("");
            var octave = Number(note.pop());
            var idx = 1;
            var sharpsVsFlats = 0;
            while (/#|b/.test(note[idx])) {
                if (note[idx] == "#") {
                    note[0] = Object.keys(this)[(this[note[0]][1] + 1) % 12];
                    sharpsVsFlats += 1;
                }
                if (note[idx] == "b") {
                    note[0] = Object.keys(this)[(this[note[0]][1] + 143) % 12];
                    sharpsVsFlats -= 1;
                }
                idx += 1;
            }
            if (this[originialNote[0]][1] + sharpsVsFlats < 0) octave -= 1;
            if (this[originialNote[0]][1] + sharpsVsFlats > 11) octave += 1;
            if (!hzReturn) return note[0] + octave;
            else {
                hz = this[note[0]][0];
                for (var idx2 = 0; idx2 < Math.abs(4 - octave); idx2 += 1) {
                    if (octave > 4) hz = hz * 2;
                    else hz = hz / 2;
                }
                return hz;
            }
        },
    };

    dynamics = {
        fff: 1,
        ff: 0.875,
        f: 0.75,
        mf: 0.625,
        mp: 0.5,
        p: 0.375,
        pp: 0.25,
        ppp: 0.125,
        n: 0,
    };
    gainNodes = {};
    sourceNodes = {};

    soundingNodes = {};

    play(note, dynamic, length, decayRate) {
        clearTimeout(this.stopCall);
        this.newSource = soundscape.createOscillator();
        this.newSource.type = this.type;
        this.newSource.gain = soundscape.createGain();
        this.newSource.frequency.value = noteConvert.convert(note, true);
        this.newSource.gain.value = dynamics[dynamic];
        this.newSource.connect(this.newSource.gain);
        this.newSource.gain.connect(soundscape.destination);
        //make an error handler so that we know that a note doesn't exist
        var self = this;
        if (dynamic) {
            this.newSource.gain.value = dynamics[dynamic];
        } else if (soundscape[this.type + "gain"].gain.value == 0) {
            this.newSource.gain.value = dynamics["mf"];
        }
        //make an error handler so that we know when a dynamic is incorrect.
        if (typeof length != "object") {
            this.stopCall = setTimeout(function () {
                smoothStop(self.newSource, self.newSource.gain);
                self.playing = false;
            }, length * 1000 + 10);
        } else {
            soundingNodes[length.keyCode] = self.newSource;
        }
        this.newSource.start();
        this.playing = true;
        if (typeof decayRate == "number")
            decay(this.newSource, this.newSource.gain, decayRate);
    }
}
