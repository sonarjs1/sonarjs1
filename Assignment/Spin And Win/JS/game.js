//Hello World of Phaser = Basic Game = Single Scene in Spin & Win Game
// How to create the basic skeleton for the game -> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Nothing","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background','../Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('button','../Assets/button.png');
}

function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);

    // Creating a button for the spin
    this.button = this.add.sprite(W-100, H-100, "button");
    this.button.setScale(0.15);
    this.button.setOrigin(0,0);
    this.button.setInteractive();
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1; // Jitne zada value utni zada dur rahega obj. 0 being max and 0 being min
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25);  

    //event listener for mouse click
    this.isSpinning = false;
    this.button.on('pointerdown', () => {
        this.input.on("pointerdown", spinwheel, this);
    });
    

    //lets create text object
    font_style = {
        font: "bold 25px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin And Wheel", font_style);
    

}

//Game Loop
function update(){
    console.log("Updating Continously");
}

function spinwheel(){
    this.button.on('pointerdown', () => {
        if (this.isSpinning == false){
            this.isSpinning = true;
            console.log("You clicked the mouse");
            console.log("Start spinning");
            //this.game_text.setText("You clicked the mouse!");
            
            let rounds = Phaser.Math.Between(2,4);
            let degrees = Phaser.Math.Between(0,11)*30; // Take evry prize ke beech me ruke
            
            let total_angle = rounds*360 + degrees;
            console.log(total_angle);

            let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));

            tween = this.tweens.add({
                targets: this.wheel,
                angle: total_angle,
                ease: "Cubic.easeOut",
                duration: 6000,
                callbackScope:this,
                onComplete:function(){
                    this.game_text.setText("You Won: " + prizes_config.prize_names[idx]);
                    this.isSpinning = false;
                },
            });
        }
    });
}