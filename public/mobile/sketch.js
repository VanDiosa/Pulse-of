let socket;
let lastTouchX = null;
let lastTouchY = null;
let lastSendTime = 0;
const threshold = 30; // movimiento mínimo para detectar un gesto
const cooldown = 300; // milisegundos entre gestos

let fusionValue = 0; // nivel de fusion(0–1)
let sliderDragging = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io();

    textAlign(CENTER, CENTER);
    noStroke();

    socket.on('connect', () => console.log('Conectado al servidor'));
    socket.on('disconnect', () => console.log('Desconectado'));
}

function draw() {
    background(20, 10, 30);

    //Titulos
    fill(255);
    textSize(22);
    text('💜Pulse of BTS💜', width / 2, height * 0.12);
    textSize(15);
    text('↑↓ Controla la fusión | ←→ Cambia el color', width / 2, height * 0.18);
    
    // Triángulo decorativo
    noStroke();
    fill(160, 100, 255, 80); // RGBA
    const triHeight = 420;
    const triWidth = 350;
    const cx = width / 2;
    const cy = height / 2;
    triangle(cx - triWidth / 2, cy - triHeight / 2, cx + triWidth / 2, cy - triHeight / 2, cx, cy + triHeight / 2); // Triángulo apuntando hacia abajo

    //Zona y linea del slider
    let sliderX = width / 2;
    let sliderTop = height * 0.25;
    let sliderBottom = height * 0.75;
    stroke(80);
    strokeWeight(3);
    line(sliderX, sliderTop, sliderX, sliderBottom);
    // Perilla
    noStroke();
    let handleY = map(fusionValue, 0, 1, sliderBottom, sliderTop);
    fill(255);
    circle(sliderX, handleY, 28);
    // Etiqueta dinamica
    noStroke();
    fill(200);
    textSize(14);
    text(`Fusión: ${Math.round(fusionValue * 100)}%`, sliderX, sliderBottom + 35);

    // Espacio inferior para gestos del cambio de color
    fill(255, 40);
    rect(0, height - 150, width, 150);
    noStroke();
    fill(255, 100);
    textSize(18);
    text('Zona Cambio de Color 🎨', width / 2, height - 80);
}

function touchStarted() {
    lastTouchX = mouseX;
    lastTouchY = mouseY;

    // Slider:
    let handleY = map(fusionValue, 0, 1, height * 0.75, height * 0.25);
    if (dist(mouseX, mouseY, width / 2, handleY) < 30) {
        sliderDragging = true;
    }
}

function touchMoved() {
    if (!socket || !socket.connected) return false;

    if (sliderDragging) { // Si se arrastra el slider
        let sliderTop = height * 0.25;
        let sliderBottom = height * 0.75;

        let newFusion = map(mouseY, sliderBottom, sliderTop, 0, 1);
        newFusion = constrain(newFusion, 0, 1);

        if (abs(newFusion - fusionValue) > 0.01) { // Solo enviar datos si hay cambio significativo
            fusionValue = newFusion;
            socket.emit('message', { type: 'fusion', value: fusionValue });
        }
        return false;
    }

    if (mouseY > height - 150) { // Si desliza en la zona de color
        const now = millis();
        if (now - lastSendTime < cooldown) return false;

        let dx = mouseX - lastTouchX;
        if (abs(dx) > threshold) {
            let direction = dx > 0 ? "right" : "left";
            socket.emit('message', { type: 'touch', direction });
            lastSendTime = now;
            lastTouchX = mouseX;
        }
    }

    return false;
}

function touchEnded() {
    sliderDragging = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
