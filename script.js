const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* 
 * Eu uso dt porque ele representa a variação de tempo decorrida entre um quadro e outro. 
 * Ao multiplicar a velocidade da bola por dt, garanto que ela se mova na mesma velocidade 
 * real (pixels por segundo) independentemente do desempenho do computador ou do monitor (60Hz, 120Hz, etc.).
 */

const player = { x: 40, y: 160, r: 16, vx: 120, vy: 120 };

let last = 0;

function update(dt) {
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    if (player.x - player.r < 0 || player.x + player.r > canvas.width) {
        player.vx *= -1;
    }

    // Colisão vertical (cima e baixo), considerando o raio
    if (player.y - player.r < 0 || player.y + player.r > canvas.height) {
        player.vy *= -1;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenho do círculo utilizando beginPath, arc e fill
    ctx.fillStyle = "#00556f";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.fillText("Delta time - dt independente de taxa de quadros", 12, 20);
}

function loop(ts) {
    if (!last) last = ts;

    // Correção no parêntese para converter de ms para segundos corretamente: (ts - last) / 1000
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;

    update(dt);
    draw();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);