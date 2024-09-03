
//variaveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); //1 - Desenha o background 
  mostraBolinha(); // 2 - Desenha a bolinha
  movimentaBolinha(); // 3 - Movimenta a Bolinha
  verificaColisaoBorda(); // 4 - Verifica Colisão da bolinha
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  
   // 5- Volta para o início da função draw
}  

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}  
  
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
    }
}



function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente 
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text (meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20)
  fill(255);
  text (pontosDoOponente, 470, 26)
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("sounds/trilha.mp3");
  ponto = loadSound("sounds/ponto.mp3");
  raquetada = loadSound("sounds/raquetada.mp3");
}