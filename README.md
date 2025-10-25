#💜Pulse of BTS💜  

## Idea principal 🎵  
**Pulse of BTS** es una experiencia visual inspirada en la delicadeza y el movimiento de unas melodías envolventes, con atmósferas contrastantes, de Black Swan y Fake Love de BTS. 
La aplicación conecta un dispositivo móvil, un micro:bit y una pantalla de escritorio, generando una sincronía audiovisual donde cada gesto o movimiento transforma la composición en tiempo real.

Cada deslizamiento produce un cambio: las capas se separan o se mezclan, los tonos varían y la composición responde de forma fluida, como si todo danzara al compás de una misma música.  
El resultado es una fusión entre sonido, color y movimiento, que busca transmitir calma, fluidez y sincronía.  

---

### Características principales ✨
- Interacción en tiempo real entre móvil, micro:bit y escritorio mediante **socket.io**  
- Gestos horizontales en el móvil para **cambiar la gama de colores**
- Botón deslizante en la interfaz móvil para **fusionar o separar los espectros** (de tres a uno)
- **Botones A y B** del micro:bit para alternar entre Black Swan y Fake Love
- Transiciones visuales suaves inspiradas en la sensación del movimiento y la armonía musical  
- Diseño minimalista, contrastante y expresivo que acompaña el ritmo de las piezas sonoras  

---

## Pasos para ejecutar la app 🔢

1. Clona el repositorio localmente.  
2. Abre el proyecto en **Visual Studio Code**.  
3. En la terminal, ejecuta los siguientes comandos:

```bash
npm install
npm start
```

4. Realiza un Forward a port en Visual Studio Code mediante la pestaña PORTS y el puerto 3000 (este es el que está configurado en el archivo server.js)

5. Cambia la visibilidad de la URL expuesta a Public. Ten presente que si lo dejas Private tendrás que autenticarte con tus credenciales de github tanto en tu computador (sitio web de escritorio) como en tu celular (sitio web móvil)

Toma nota de la URL que te da Forward a port. Esta la necesitarás en el celular

6. Abre la página web en el computador

http://localhost:3000/desktop/
https://URL EN FORWARD A PORT/mobile/


## Créditos 

Proyecto desarrollado por Vanesa Herrera como exploración artística de sincronía visual y musical entre dispositivos.
Inspirado en la canción “Black Swan” y "Fake Love" de BTS, cuyas atmósferas contrastantes dieron forma al concepto visual y emocional del proyecto

Construido con:
- Node.js
- Express
- Socket.io
- p5.js
- Micro:bit