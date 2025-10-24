# Pulse of Swan 🦢  

## Idea principal 🎵  
**Pulse of Swan** es una experiencia visual inspirada en la delicadeza y el movimiento de una melodía suave y envolvente.  
La aplicación conecta un dispositivo móvil y una pantalla de escritorio, donde los gestos del usuario generan transiciones y fusiones de color que acompañan el ritmo de la pieza.  

Cada deslizamiento produce un cambio: las capas se separan o se mezclan, los tonos varían y la composición responde de forma fluida, como si todo danzara al compás de una misma música.  
El resultado es una fusión entre sonido, color y movimiento, que busca transmitir calma, fluidez y sincronía.  

---

### Características principales ✨
- Interacción en tiempo real entre móvil y escritorio mediante **socket.io**.  
- Gestos verticales para **fundir o separar capas**.  
- Gestos horizontales para **cambiar la gama de colores**.  
- Transiciones visuales suaves inspiradas en la sensación del movimiento y la armonía musical.  
- Diseño minimalista y contemplativo que acompaña el ritmo de la pieza sonora.  

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

Toma nota de la URL que te da Forward a port. Esta la necesitarás en el celular.

6. Abre la página web en el computador

http://localhost:3000/desktop/
https://URL EN FORWARD A PORT/mobile/


## Créditos 

Proyecto desarrollado por Vanesa Herrera como exploración artística de sincronía visual y musical entre dispositivos.
Inspirado en la canción “Black Swan” de BTS, cuya atmósfera melódica y emocional sirvió como base conceptual.

Construido con:
- Node.js
- Express
- Socket.io
- p5.js