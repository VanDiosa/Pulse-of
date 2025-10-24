let song;
let fft;
let socket;

let hueShift = 0;
let rotationAngles = [0, 0, 0];
let baseRadius = 140;
let spacing = 90;
let fusionValue = 0; // 0 = tres anillos, 1 = uno solo

let playButton, pauseButton, stopButton; // botones

function preload() {
    soundFormats('mp3');
    song = loadSound('blackswan.mp3');
}

function setup() {
    createCanvas(1900, 800);
    colorMode(HSB);
    fft = new p5.FFT();
    socket = io();

    socket.on('message', handleTouch);

    // Creación de botones
    playButton = createButton('▶');
    pauseButton = createButton('⏸');
    stopButton = createButton('⏹');
    styleButton(playButton, width - 120, height / 2 - 100);
    styleButton(pauseButton, width - 120, height / 2);
    styleButton(stopButton, width - 120, height / 2 + 100);

    playButton.mousePressed(() => {
        if (!song.isPlaying()) song.loop();
    });

    pauseButton.mousePressed(() => {
        if (song.isPlaying()) song.pause();
    });

    stopButton.mousePressed(() => {
        song.stop();
    });

    userStartAudio();
}

function styleButton(btn, x, y) {
  btn.position(x, y);
  btn.size(60, 60);
  btn.style('font-size', '28px');
  btn.style('border', 'none');
  btn.style('border-radius', '50%');
  btn.style('background', 'rgba(100, 0, 200, 0.4)');
  btn.style('color', 'white');
  btn.style('cursor', 'pointer');
  btn.style('backdrop-filter', 'blur(4px)');
  btn.mouseOver(() => btn.style('background', 'rgba(150, 0, 255, 0.6)'));
  btn.mouseOut(() => btn.style('background', 'rgba(100, 0, 200, 0.4)'));
}

function handleTouch(data) {
    if (data.type === 'touch') {
        if (data.direction === "left") hueShift -= 10;
        else if (data.direction === "right") hueShift += 10;
    }

    if (data.type === 'fusion') {
        fusionValue = constrain(data.value, 0, 1);
    }
}

function draw() {
    background(0, 0.2);
    translate(width / 2, height / 2);
    noFill();

    let spectrum = fft.analyze();

    // Rotaciones independientes (el del medio gira al revés)
    rotationAngles[0] += 0.005; 
    rotationAngles[1] -= 0.006;
    rotationAngles[2] += 0.007;

    // Valores de fusión
    let transition = lerp(0, 1, fusionValue);
    let mergeOffset = spacing * transition;
    let alphaOuter = 255 * (1 - transition);
    let scaleCentral = 1 + 0.4 * transition;

    // Titulo
    push();
    resetMatrix(); // Volvemos al sistema original
    textAlign(LEFT, CENTER);
    textSize(64);
    fill(255);
    text("Pulse of BTS", 100, height / 2 - 25);
    pop();

    // Dibujo de los tres anillos (se acercan al centro)
    if (transition < 0.98) {
        push();
        strokeWeight(2);
        drawBars(spectrum, getRainbowColor(0), baseRadius - mergeOffset, baseRadius - mergeOffset + 40, rotationAngles[0], alphaOuter);
        drawBars(spectrum, getRainbowColor(120), baseRadius + spacing * (1 - transition / 2), baseRadius + spacing * (1 - transition / 2) + 40, rotationAngles[1], 255);
        drawBars(spectrum, getRainbowColor(240), baseRadius + spacing * 2 - mergeOffset, baseRadius + spacing * 2 - mergeOffset + 40, rotationAngles[2], alphaOuter);
        pop();
    }

    // Dibujo del espectro fusionado (uno solo, más grande y brillante)
    if (transition > 0.02) {
        push();
        let glow = map(transition, 0, 1, 0, 80);
        strokeWeight(2.5 + glow * 0.02);
        drawBars(
            spectrum,
            getRainbowColor(hueShift),
            (baseRadius + spacing) * scaleCentral,
            (baseRadius + spacing + 80) * scaleCentral,
            rotationAngles[1],
            map(transition, 0, 1, 0, 255)
        );
        pop();
    }
}

// DIbujo de espectros dependientes a graves (interno), voces(medio), agudos(externo)
function drawBars(spectrum, col, minR, maxR, rotationAngle, alphaVal = 255, start = 0, end = 1) {
    push();
    rotate(rotationAngle);
    col.setAlpha(alphaVal);
    stroke(col);
    let len = spectrum.length;
    for (let i = 0; i < 360; i += 3) {
        let index = floor(map(i, 0, 360, start * len, end * len));
        let amp = spectrum[index];
        let r = map(amp, 0, 255, minR, maxR);
        let rad = radians(i);
        let x1 = minR * cos(rad);
        let y1 = minR * sin(rad);
        let x2 = r * cos(rad);
        let y2 = r * sin(rad);
        line(x1, y1, x2, y2);
    }
    pop();
}

function getRainbowColor(offset) {
    let hue = (hueShift + offset) % 360;
    return color(hue, 100, 100);
}
