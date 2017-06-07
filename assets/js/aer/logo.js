var container = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(240, 85);

document.getElementById("logo").appendChild(renderer.view);

requestAnimationFrame(animate);

var texture_logo = PIXI.Texture.fromImage("/assets/images/aer/aeii_logo.png");
var sprite_logo = new PIXI.Sprite(texture_logo);

sprite_logo.position.x = 0;
sprite_logo.position.y = 0;

var texture_glow = PIXI.Texture.fromImage("/assets/images/aer/aeii_logo_glow.png");
var sprite_glow = new PIXI.Sprite(texture_glow);

sprite_glow.position.x = 0;
sprite_glow.position.y = 0;

var texture_mask = PIXI.Texture.fromImage("/assets/images/aer/aeii_logo_mask.png");
var sprite_mask = new PIXI.Sprite(texture_mask);

sprite_mask.position.x = 0;
sprite_mask.position.y = 0;

container.addChild(sprite_logo);
container.addChild(sprite_glow);
container.addChild(sprite_mask);

function animate() {
    requestAnimationFrame(animate);
    
    if (sprite_glow.position.x < 1200) {
        sprite_glow.position.x += 8;
    } else {
        sprite_glow.position.x = 0;
    }
    
    renderer.render(container);
}
