"use strict";

//Globals (✿◠‿◠) 
let restart = $(".restart");

/*const spriteChars = {
    pikachu: "images/char-pikachu.png",
    charmander: "images/char-mander.png",
    bulbasaur: "images/char-bulbasaur.png",
    eevee: "images/char-eevee.png",
    jigglypuff: "images/char-jigglypuff.png",
    snorlax: "images/char-snorlax.png"
};

const pokeballs = ['images/ball-blue.png', 'images/ball-red.png', 'images/ball-purple.png', 'images/ball-yellow.png'];
const allPokeballs = [];
*/
// for future updates

// Enemies that our player should avoid
class Enemy {
    constructor(y) {
        //Enemy image
        this.sprite = 'images/enemy-fist.png';
        //Enemy positioning
        this.x = 0;
        this.y = y;
        //Enemy speed
        this.speed = 50 + Math.floor(Math.random() * 120); // Random enemy speed
    }

    update(dt) {
        //Adjust speed across browsers
        this.x += this.speed * dt;

        // Prevent the enemies to "run away" 
        if (this.x > 500) {
            this.x = -50;
            this.speed = 50 + Math.floor(Math.random() * 150)
        }
        //Check Collision player x enemy
        if (this.x >= player.x - 30 && this.x <= player.x + 30 && this.y >= player.y - 10 && this.y <= player.y + 1) {
            player.x = 210;
            player.y = 470;
        }
    };
    // Drawing enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Player {
    constructor() {
        //Player image
        this.sprite = 'images/char-pikachu.png';
        //Player positioning
        this.x = 210;
        this.y = 470;
    };
    update() {
        // When reaching water
        if (this.y <= 50) {
            //Reset player location
            this.x = 210;
            this.y = 470;
            swal({
                title: 'Congratulations!',
                text: 'You won the game',
                type: 'success',
                allowOutsideClick: false,
                animation: false,
                customClass: "animated swing",
                confirmButtonText: "Play Again?",
                confirmButtonColor: '#d33'
            });
        };

        Player.prototype.handleInput = function (keyPress) {
            // Setting x and y axis boundaries
            if (keyPress == 'left' && this.x > 10) {
                this.x -= 102;
            };

            if (keyPress == 'up' && this.y > 50) {
                this.y -= 85;
            };

            if (keyPress == 'right' && this.x < 405) {
                this.x += 102;
            };

            if (keyPress == 'down' && this.y < 400) {
                this.y += 85;
            };
        };
    }
};

//Drawing player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// allEnemies array
const allEnemies = [new Enemy(130), new Enemy(130), new Enemy(215), new Enemy(297), new Enemy(297)];

// Coloque o objeto do jogador numa variável chamada jogador.
const player = new Player();
// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Restart Game
restart.click(function () {
    location.reload(); // Reloads page
});