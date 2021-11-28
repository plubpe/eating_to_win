namespace SpriteKind {
    export const enemy2 = SpriteKind.create()
    export const Block = SpriteKind.create()
}

let Block : Sprite = null
let mySprite : Sprite = null
let Ai_U : Sprite = null
let Ai2_U : Sprite = null
let path = null
let g = null
let b = null
let t = null
let x = null
let y = null
let em = 0
let em1 = 0
let p = 0
let ep = null
let angle = 0
let distance = 0
function create_1() {
    
    scene.setBackgroundImage(assets.image`myImage8`)
    tiles.setTilemap(tilemap`level1`)
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
    
    mySprite.ay = 0
    let a = sprites.readDataString(mySprite, "direction")
    if (a == "R" && em == 0 && em1 == 0) {
        animation.runImageAnimation(mySprite, assets.animation`eat_2`, 100, true)
    } else if (a == "L" && em == 0 && em1 == 0) {
        animation.runImageAnimation(mySprite, assets.animation`eat`, 100, true)
    } else if (a == "L" && em == 1 && em1 == 0) {
        
    } else if (a == "L" && em == 0 && em1 == 1) {
        // em = 0
        
    } else if (a == "R" && em == 1 && em1 == 0) {
        // em1 = 0
        
    } else if (a == "R" && em == 0 && em1 == 1) {
        // em = 0
        
    }
    
    // em1 = 0
    console.log(em)
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
game.onUpdate(function on_on_update2() {
    for (let value of sprites.allOfKind(SpriteKind.enemy2)) {
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing2(value)
    }
})
function Create_Block(): Sprite {
    
    Block = sprites.create(assets.image`block`, SpriteKind.Block)
    sprites.setDataString(Block, "direction", "L")
    return Block
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    game.over(false)
})
create_1()
// value4.say_text(""+angle)
game.onUpdate(function on_on_update3() {
    
    let a = sprites.readDataString(mySprite, "direction")
    g = tiles.locationOfSprite(mySprite)
    if (controller.A.isPressed() && a == "R") {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            b = tiles.locationOfSprite(value)
            x = b.x - g.x
            y = b.y - g.y
            p = Math.sqrt(x ** 2 + y ** 2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if (p <= 40 && angle <= 45) {
                value.vx = -100
            }
            
        }
        // value.say_text("" + p)
        // print(p)
        // print("x = "+x)
        // print("y = "+y)
        for (let value2 of sprites.allOfKind(SpriteKind.enemy2)) {
            t = tiles.locationOfSprite(value2)
            x = t.x - g.x
            y = t.y - g.y
            p = Math.sqrt(x ** 2 + y ** 2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if (p <= 40 && angle <= 45) {
                value2.vx = -100
            }
            
        }
    } else if (controller.A.isPressed() && a == "L") {
        // value2.say_text(""+angle)
        for (let value3 of sprites.allOfKind(SpriteKind.Enemy)) {
            b = tiles.locationOfSprite(value3)
            x = b.x - g.x
            y = b.y - g.y
            p = Math.sqrt(x ** 2 + y ** 2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if (p >= -40 && angle >= 135) {
                value3.vx = 100
            }
            
        }
        // print(p)
        // print("x = "+x)
        // print("y = "+y)
        // print("angle = "+angle)
        // value3.say_text(""+p)
        for (let value4 of sprites.allOfKind(SpriteKind.enemy2)) {
            t = tiles.locationOfSprite(value4)
            x = t.x - g.x
            y = t.y - g.y
            p = Math.sqrt(x ** 2 + y ** 2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if (p >= -40 && angle >= 135) {
                value4.vx = 100
            }
            
        }
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    let em: number;
    if (controller.player1.isPressed(ControllerButton.A)) {
        em = 1
        otherSprite.destroy()
        otherSprite.sayText(":)")
    } else {
        
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy2, function on_on_overlap3(sprite: Sprite, otherSprite: Sprite) {
    if (controller.player1.isPressed(ControllerButton.A)) {
        sprites.changeDataNumberBy(sprite, "em1", 1)
        // em ไม่เปลี่ยน
        otherSprite.destroy()
        otherSprite.sayText(":)")
    } else {
        
    }
    
})
