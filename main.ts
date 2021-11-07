namespace SpriteKind {
    export const enemy2 = SpriteKind.create()
    export const Block = SpriteKind.create()
}

let Block : Sprite = null
let mySprite : Sprite = null
let Ai_U : Sprite = null
let Ai2_U : Sprite = null
let path = null
let distance = 0
function create_1() {
    
    scene.setBackgroundImage(assets.image`myImage8`)
    tiles.setTilemap(tilemap`level1`)
    let Enemy0 = sprites.create(assets.image`Ai_U`, SpriteKind.Enemy)
    let Enemy1 = Create_Enemy()
    let Enemy2 = Create_Enemy()
    let Enemy3 = Create_Enemy()
    let Enemy4 = Create_Enemy()
    let Enemy5 = Create_Enemy2()
    let Enemy6 = Create_Enemy2()
    let Enemy7 = Create_Enemy2()
    let Enemy8 = Create_Enemy2()
    let Block1 = Create_Block()
    let Block2 = Create_Block()
    tiles.placeOnTile(Enemy0, tiles.getTileLocation(5, 16))
    tiles.placeOnTile(Enemy1, tiles.getTileLocation(14, 15))
    tiles.placeOnTile(Enemy2, tiles.getTileLocation(21, 15))
    tiles.placeOnTile(Enemy3, tiles.getTileLocation(30, 15))
    tiles.placeOnTile(Enemy4, tiles.getTileLocation(58, 16))
    tiles.placeOnTile(Enemy5, tiles.getTileLocation(40, 10))
    tiles.placeOnTile(Enemy6, tiles.getTileLocation(48, 9))
    tiles.placeOnTile(Enemy7, tiles.getTileLocation(57, 10))
    tiles.placeOnTile(Enemy8, tiles.getTileLocation(68, 9))
    tiles.placeOnTile(Block1, tiles.getTileLocation(71, 17))
    tiles.placeOnTile(Block2, tiles.getTileLocation(72, 17))
    mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 16))
}

controller.anyButton.onEvent(ControllerButtonEvent.Released, function on_button_released() {
    grid.snap(mySprite)
    mySprite.ay = 500
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    sprites.setDataString(mySprite, "direction", "L")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_L`, 100, true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    sprites.setDataString(mySprite, "direction", "R")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_R`, 100, true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    mySprite.ay = 0
    let a = sprites.readDataString(mySprite, "direction")
    if (a == "R") {
        animation.runImageAnimation(mySprite, assets.animation`player_Animation_UR`, 100, true)
    } else {
        animation.runImageAnimation(mySprite, assets.animation`player_Animation_UL`, 100, true)
    }
    
    mySprite.vy = -222
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -222
    }
    
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    sprites.setDataString(mySprite, "direction", "L")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_L`, 100, true)
})
function Detect_Wall(Sprite2: Sprite, Ai2: number) {
    if (Ai2 == 1) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "R")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "L")
        }
        
    } else if (Ai2 == 2) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "R")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "L")
        }
        
    }
    
}

function Move_by_Facing(Sprite2: Sprite) {
    if (sprites.readDataString(Sprite2, "direction") == "L") {
        Sprite2.vx = -20
        Sprite2.vy = 0
    } else if (sprites.readDataString(Sprite2, "direction") == "R") {
        Sprite2.vx = 20
        Sprite2.vy = 0
    }
    
}

function Move_by_Facing2(Sprite2: Sprite) {
    if (sprites.readDataString(Sprite2, "direction") == "L") {
        Sprite2.vx = -50
        Sprite2.vy = 0
    } else if (sprites.readDataString(Sprite2, "direction") == "R") {
        Sprite2.vx = 50
        Sprite2.vy = 0
    }
    
}

function Create_Enemy(): Sprite {
    
    Ai_U = sprites.create(assets.image`Ai_U`, SpriteKind.Enemy)
    sprites.setDataString(Ai_U, "direction", "L")
    Ai_U.ay = 500
    return Ai_U
}

function Create_Enemy2(): Sprite {
    
    Ai2_U = sprites.create(assets.image`Ai2_L`, SpriteKind.enemy2)
    sprites.setDataString(Ai2_U, "direction", "L")
    return Ai2_U
}

game.onUpdate(function on_on_update() {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing(value)
    }
})
function on_on_update2() {
    for (let value of sprites.allOfKind(SpriteKind.enemy2)) {
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing2(value)
    }
}

game.onUpdate(on_on_update2)
function Create_Block(): Sprite {
    
    Block = sprites.create(assets.image`block`, SpriteKind.Block)
    sprites.setDataString(Block, "direction", "L")
    return Block
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    game.over(false)
})
create_1()
function on_on_update3() {
    if (controller.A.isPressed()) {
        null
    }
    
}

game.onUpdate(on_on_update2)
