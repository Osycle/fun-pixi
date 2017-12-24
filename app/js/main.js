'use strict';




var log = console.log;
var test;



(function(){
$(function(){


window.Movement = {}
window.app = new PIXI.Application({
  width: 600,
  height: 250
});


var sound = new Howl({
  src: ['../resource/8bitmusic.mp3'],
  autoplay: false,
  loop: true,
  volume: 0.5,
  onend: function() {
    console.log('Finished!');
  }
});



var textureTilea = PIXI.Texture.fromImage("../resource/tilea.png");
var texturesTile = [];



for (var i = 0 ; i < 10 ; i++){

  var spriteTilea = new PIXI.TilingSprite( textureTilea, 64, 96 );

  spriteTilea.anchor.set(0.0);

  if ( i < 10 )
    spriteTilea.position.x += 64*i;

  spriteTilea.position.y = 96;

  spriteTilea.texture.textureCacheIds = "grass_"+i;
  spriteTilea.texture.baseTexture.width = 512;
  spriteTilea.texture.baseTexture.height = 384;

  log( spriteTilea )
  
  texturesTile.push(spriteTilea);
  app.stage.addChild(spriteTilea);

  if ( i > 3 ){
    spriteTilea.texture.frame = {x: 0, y: 96, width: 64, height: 96, type: 0}
    spriteTilea.texture._updateUvs();
  }else if( i > 10 ){
    spriteTilea.texture.frame = {x: 0, y: 0, width: 64, height: 96, type: 0}
    spriteTilea.texture._updateUvs();
  }
  
}



test = texturesTile;

$(".content")[0].appendChild(app.view);

PIXI.loader
    .add('resource/animia.json')
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    // create an array of textures from an image path
    function framesCreate( startItr, itr ){
      var frames = [];
      itr = itr || 0;
      for ( var i = startItr || 0 ; i < itr; i++) {
          var val = i < 10 ? '0' + i : i;
          var texture = PIXI.Texture.fromFrame('rollSequence' + val + '.png')
          const sprite = new PIXI.Sprite(texture);

          sprite.interactive = true;
          sprite.buttonMode = true;
          //log(sprite);
          sprite.on('pointerdown', (event) => {
             log("Yourrrrr");
          });

          //log( sprite );
          frames.push(texture);
      }
      return new PIXI.extras.AnimatedSprite(frames);
    }

    Movement.status = 0;
    Movement.go = framesCreate(0, 12);
    heroPosition(Movement.go);
    Movement.go.interactive = true;
    Movement.go.buttonMode = true;
    Movement.go.on('pointerdown', (event) => {
             log("Yourrrrr");
          });
    Movement.go.onFrameChange = (e) => { 

      switch ( Movement.status )
      {

        case 37: 
          if ( e < 3 || e >= 6 )
            Movement.go.gotoAndPlay(3); 
            Movement.go.position.x += -5;
          break;

        case 39: 
          if ( e < 6 || e >= 9 )
            Movement.go.gotoAndPlay(6); 
            Movement.go.position.x += 5;
          break;

        case 40: 
          if (e >= 3) 
            Movement.go.gotoAndPlay(0); 
            Movement.go.position.y += 5;
          break;

        case 38: 
          if ( e < 9 || e >= 12 ) 
            Movement.go.gotoAndPlay(9); 
            Movement.go.position.y += -5;
          break;


      }

      //console.log ( e );

    };

  


    sound.play();


    // Animate the rotation
    app.ticker.add(function() {
        //anim.rotation += 0.01;
    });

}
  function animate (keyCode){
    //app.render( app.stage );
    //log(test[0].tilePosition);
    //requestAnimationFrame( animate )
    switch (keyCode)
    {
      case 37:
        for ( var i = 0; i < 10; i++ )
          test[i].tilePosition.x += 0.5;
        break;

      case 38:
        for ( var i = 0; i < 10; i++ )
          test[i].tilePosition.x += 0.5;
        break;

      case 39:
        for ( var i = 0; i < 10; i++ )
          test[i].tilePosition.x -= 0.5;
        break;

      case 40:
        for ( var i = 0; i < 10; i++ )
          test[i].tilePosition.x += 0.5;
        break;

    }  

  }

var moveStart = (e) => 
{
  e.stopPropagation(); 
  e.preventDefault();
  //log( e.keyCode )
  switch (e.keyCode)
  {
    case 37:
      Movement.status = 37; 
      requestAnimationFrame( function(){animate(37)} )
      Movement.go.play(); break;

    case 38:
      Movement.status = 38; 
      Movement.go.play(); break;

    case 39:
      Movement.status = 39; 
      requestAnimationFrame( function(){animate(39)} )
      Movement.go.play(); break;

    case 40:
      Movement.status = 40; 
      Movement.go.play(); break;

  }  
 
}

function moveStop(e)
{
  switch ( Movement.status )
  {
    case 37:
      Movement.go.gotoAndStop(3);break;
    case 38:
      Movement.go.gotoAndStop(9);break;
    case 39:
      Movement.go.gotoAndStop(6);break;
    case 40:
      Movement.go.gotoAndStop(0);break;
  } 
  Movement.status = 0;
}

var heroPosition = (anim) => 
{
    anim.x = app.renderer.width / 2;
    anim.y = app.renderer.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.2;
    app.stage.addChild(anim);
}


$( window ).on("keydown", moveStart)
$( window ).on("keyup", moveStop)


	});
}) (jQuery);














var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac =  	 /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);










// COMMON FUNCTION

function checkView( width ){
	return ($( document ).width() > width);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}
  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}


