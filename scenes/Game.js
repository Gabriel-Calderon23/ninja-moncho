// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
   
    super("main");
  }

  init() {}

  preload() {
    //cargar assets

    // importar cielo
    this.load.image("cielo", "../public/assets/Cielo.webp");

    //importar plataforma
    this.load.image("plataforma", "../public/assets/Platform.png");

    //importar personaje
    this.load.image("personaje","../public/assets/Ninja.png");
  }




  create() { 
    //crear elemento
    this.cielo = this.add.image(400, 300,"cielo")
    this.cielo.setScale(2);

    //crear grupo plataformas
    this.plataformas = this.physics.add.staticGroup();
    // al grupo de plataformas agregar plataformas
    this.plataformas.create(400, 568,"plataforma").setScale(2).refreshBody();

    

    //crear personaje
    this.personaje = this.physics.add.sprite(400, 300, "personaje");
    this.personaje.setScale(0.1);
    this.personaje.setCollideWorldBounds(true);

    //agregar colision entre personaje y plataforma
    this.physics.add.collider(this.personaje, this.plataformas);

    //crear teclas
    this.cursor=this.input.keyboard.createCursorKeys();
    
    //crear grupo recolectables
    this.recolectables = this.physics.add.group();
    this.physics.add.collider(this.personaje, this.recolectables);

    //evento un segundo
    this.time.addEvent({
      delay: 1000,
      callback: console.log("hola"),
      callbackScope: this,
      loop: true,

    });
  }

  onSecond(){
    // crear recolectable
    const tipos = ["triangulo", " cuadrado", "rombo"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
  }

  update() {
    //movimiento personaje
    if(this.cursor.left.isDown){
      this.personaje.setVelocityX(-160);
    } else if(this.cursor.right.isDown){
      this.personaje.setVelocityX(160);
    } else{
      this.personaje.setVelocityX(0);
      }
      if (this.cursor.up.isDown && this.personaje.body.touching.down) {
        this.personaje.setVelocityY(-330);
    }
  }

}