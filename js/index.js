window.onload = () => { // WINDOW ONLOAD = CARGAR LA PANTALLA ANTES DE HACER NADA
  document.getElementById('start-button').onclick = () => { //ONCLICK METE EL ATRIBUTO DE CLICK
    startGame();
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d"); //TODO SE PINTA EN EL CTX (CONTEXT)

  const imgFondo = document.createElement("img"); //AÑADIMOS TAG IMG CON LA IMAGEN DE FONDO
  imgFondo.src = "images/road.png"; //SOURCE DE LA IMAGEN DE FONDO

  const imgCoche = document.createElement("img"); //AÑADIMOS TAG IMG CON LA IMAGEN DEL COCHE
  imgCoche.src = "images/car.png"; // SOURCE DE LA IMGAGEN DE FONDO

  let x_coche = ((canvas.width - 60) / 2);
  let y_coche = 565;

  //obstaculo --> HO CREEM A LA CLASS Obstaculo
  // let width_obstaculo = Math.floor(Math.random()*width_max_obstaculo);
  // let x_obstaculo = Math.floor(Math.random() * (canvas.width - width_obstaculo));
  // let y_obstaculo = -30;

  let frames = 0;
  let score = 0;

  const obstaculos = []; // ARRAY QUE ALMACENA LOS OBSTACULOS.

  let interval;
  let intervalScore;


  function startGame() {
    interval = setInterval(update, 20);
  }

  function update() { //3 PASOS MINIMOS:
    frames++;
    score += 0.2;
    //LIMPIAR
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //RECALCULAR - posicion obstaculos
      //recorrer array de obstaculos y recalcular "y"
      obstaculos.forEach((obstaculo) => {
        obstaculo.y += 5;
      })

    if (frames % 100 == 0){
      //crear obstaculo
      let obstaculo = new Obstaculo();
      obstaculos.push(obstaculo);
    }


    //REPINTAR
    //fondo
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);
    //coche
    ctx.drawImage(imgCoche, x_coche, y_coche, 60, 125);
    //obstaculos
    obstaculos.forEach((obstaculo) => {
      obstaculo.pintar();
      obstaculo.choca();
      // obstaculo.score();
    })
  }

  
  document.body.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
      if(x_coche > 0) x_coche -= 10;
    } else if (e.key == "ArrowRight"){
      if (x_coche < (canvas.width - imgCoche.width*0.43)) x_coche += 10;
    }
  })

  class Obstaculo {
    constructor(){
      let width_max_obstaculo = canvas.width-150;

      this.width = Math.floor(Math.random()*width_max_obstaculo);
      this.height = 30;
      this.x = Math.floor(Math.random() * (canvas.width - this.width))
      this.y = -30;
    }

    pintar() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    choca(){

      if (!(((x_coche + 60) < this.x) || (565 > (this.y + this.height)) || (x_coche > (this.x + this.width)) || ((565 + 125) < this.y))) {
        clearInterval(interval);
        clearInterval(intervalScore)
      }
    }

    score() {
      console.log("Score: " + score)
    }
  }
}


