let socket;
let lastTouchX = null;
let lastTouchY = null;
let lastSendTime = 0;
const threshold = 30; // movimiento mínimo para detectar un gesto
const cooldown = 300; // milisegundos entre gestos

function setup() {
    createCanvas(360, 500); 
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Pulse of Swan 🦢', width / 2, height / 2 - 50);
    textSize(15);
    text('Desliza en dirección horizontal o vertical', width / 2, height / 2 + 30);

    socket = io();

    socket.on('connect', () => console.log('Conectado al servidor'));
    socket.on('disconnect', () => console.log('Desconectado del servidor'));
}

function touchStarted() {
    lastTouchX = mouseX;
    lastTouchY = mouseY;
}

function touchMoved() {
    if (!socket || !socket.connected) return false;

    const now = millis();
    if (now - lastSendTime < cooldown) return false; // evita enviar gestos seguidos

    let dx = mouseX - lastTouchX;
    let dy = mouseY - lastTouchY;

    if (abs(dx) < threshold && abs(dy) < threshold) return false; // ignorar movimientos pequeños

    let direction = "";
    if (abs(dx) > abs(dy)) {
        direction = dx > 0 ? "right" : "left";
    } else {
        direction = dy > 0 ? "down" : "up";
    }

    socket.emit('message', { type: 'touch', direction });
    lastSendTime = now;

    // Reinicia punto de referencia
    lastTouchX = mouseX;
    lastTouchY = mouseY;

    background(0);
    fill(255);
    textSize(20);
    let mensaje = "";

    switch (direction) {
        case "right":
            mensaje = "Deslizaste hacia la derecha →";
            break;
        case "left":
            mensaje = "← Deslizaste hacia la izquierda";
            break;
        case "down":
            mensaje = "⬇ Capas fusionadas";
            break;
        case "up":
            mensaje = "⬆ Capas separadas";
            break;
    }

    text(mensaje, width / 2, height / 2);
    return false;
}
