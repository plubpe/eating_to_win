@namespace
class SpriteKind:
    enemy2= SpriteKind.create()
    Block= SpriteKind.create()

Block: Sprite = None
mySprite: Sprite = None
Ai_U: Sprite = None
Ai2_U: Sprite = None
path = None
g = None 
b = None
t = None
x = None
y = None
em = 0
em1 = 0
p = 0
ep = None
angle = 0
distance = 0

def create_1():
    global mySprite
    scene.set_background_image(assets.image("""myImage8"""))
    tiles.set_tilemap(tilemap("""level1"""))
    Enemy1 = Create_Enemy()
    Enemy2 = Create_Enemy()
    Enemy3 = Create_Enemy()
    Enemy4 = Create_Enemy()
    Enemy5 = Create_Enemy2()
    Enemy6 = Create_Enemy2()
    Enemy7 = Create_Enemy2()
    Enemy8 = Create_Enemy2()
    Block1 = Create_Block()
    Block2 = Create_Block()
    tiles.place_on_tile(Enemy1, tiles.get_tile_location(14, 15))
    tiles.place_on_tile(Enemy2, tiles.get_tile_location(21, 15))
    tiles.place_on_tile(Enemy3, tiles.get_tile_location(30, 15))
    tiles.place_on_tile(Enemy4, tiles.get_tile_location(58, 16))
    tiles.place_on_tile(Enemy5, tiles.get_tile_location(40, 10))
    tiles.place_on_tile(Enemy6, tiles.get_tile_location(48, 9))
    tiles.place_on_tile(Enemy7, tiles.get_tile_location(57, 10))
    tiles.place_on_tile(Enemy8, tiles.get_tile_location(68, 9))
    tiles.place_on_tile(Block1, tiles.get_tile_location(71, 17))
    tiles.place_on_tile(Block2, tiles.get_tile_location(72, 17))
    mySprite = sprites.create(assets.image("""myImage"""), SpriteKind.player)
    controller.move_sprite(mySprite,100,0)
    mySprite.ay = 500
    scene.camera_follow_sprite(mySprite)
    tiles.place_on_tile(mySprite, tiles.get_tile_location(1, 16))

def on_button_released():
    grid.snap(mySprite)
    mySprite.ay = 500
    animation.stop_animation(animation.AnimationTypes.ALL, mySprite)
controller.any_button.on_event(ControllerButtonEvent.RELEASED, on_button_released)

def on_left_pressed():
    global mySprite
    sprites.set_data_string(mySprite, "direction", "L")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_L"""),
        100,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    global mySprite
    sprites.set_data_string(mySprite, "direction", "R")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_R"""),
        100,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_up_pressed():
    global mySprite
    mySprite.ay = 0
    a=sprites.read_data_string(mySprite, "direction")
    if a == "R":
        animation.run_image_animation(mySprite,
            assets.animation("""player_Animation_UR"""),
            100,
            True)
    else :
        animation.run_image_animation(mySprite,
            assets.animation("""player_Animation_UL"""),
            100,
            True)
    mySprite.vy = -222
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -222
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global mySprite,g,b,t,em,em1
    mySprite.ay = 0
    a=sprites.read_data_string(mySprite, "direction")
    if a == "R" and em == 0 and em1 == 0:
        animation.run_image_animation(mySprite,
            assets.animation("""eat_2"""),
            100,
            True)
    elif a == "L" and em == 0 and em1 == 0 :
        animation.run_image_animation(mySprite,
            assets.animation("""eat"""),
            100,
            True)
    elif a == "L" and em == 1 and em1 == 0 :
        pass
        #em = 0
    elif a == "L" and em == 0 and em1 == 1 :
        pass
        #em1 = 0
    elif a == "R" and em == 1 and em1 == 0 :
        pass
        #em = 0
    elif a == "R" and em == 0 and em1 == 1 :
        pass
        #em1 = 0
    print(em)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def Detect_Wall(Sprite2: Sprite, Ai2: number):
    if Ai2 == 1:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "L")
    elif Ai2 == 2:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "L")
        

def Move_by_Facing(Sprite2: Sprite):
    if sprites.read_data_string(Sprite2, "direction") == "L":
        Sprite2.vx = -20
        Sprite2.vy = 0
    elif sprites.read_data_string(Sprite2, "direction") == "R":
        Sprite2.vx = 20
        Sprite2.vy = 0

def Move_by_Facing2(Sprite2: Sprite):
    if sprites.read_data_string(Sprite2, "direction") == "L":
        Sprite2.vx = -50
        Sprite2.vy = 0
    elif sprites.read_data_string(Sprite2, "direction") == "R":
        Sprite2.vx = 50
        Sprite2.vy = 0


def Create_Enemy():
    global Ai_U
    Ai_U = sprites.create(assets.image("""Ai_U"""),SpriteKind.enemy)
    sprites.set_data_string(Ai_U, "direction", "L")
    Ai_U.ay = 500
    return Ai_U

def Create_Enemy2():
    global Ai2_U
    Ai2_U = sprites.create(assets.image("""Ai2_L"""),SpriteKind.enemy2)
    sprites.set_data_string(Ai2_U, "direction", "L")
    return Ai2_U

def on_on_update():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing(value)
game.on_update(on_on_update)

def on_on_update2():
    for value in sprites.all_of_kind(SpriteKind.enemy2):
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing2(value)
game.on_update(on_on_update2)

def Create_Block():
    global Block
    Block = sprites.create(assets.image("""block"""),SpriteKind.Block)
    sprites.set_data_string(Block, "direction", "L")
    return Block

def on_on_overlap(sprite, otherSprite):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.Block, on_on_overlap)

create_1()

def on_on_update3():
    global g,b,t,x,y,angle,p,em,em1
    a=sprites.read_data_string(mySprite, "direction")
    g = tiles.location_of_sprite(mySprite)
    if controller.A.is_pressed() and a == "R":
        for value in sprites.all_of_kind(SpriteKind.enemy):
            b = tiles.location_of_sprite(value)
            x = b.x-g.x
            y = b.y-g.y
            p = Math.sqrt(x**2+y**2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if p <= 40 and angle <= 45:
                value.vx=-100
            #value.say_text("" + p)
            #print(p)
            #print("x = "+x)
            #print("y = "+y)
        for value2 in sprites.all_of_kind(SpriteKind.enemy2):
            t = tiles.location_of_sprite(value2)
            x = t.x-g.x
            y = t.y-g.y
            p = Math.sqrt(x**2+y**2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if p <= 40 and angle <= 45:
                value2.vx=-100
            #value2.say_text(""+angle)
    elif controller.A.is_pressed() and a == "L":
        for value3 in sprites.all_of_kind(SpriteKind.enemy):
            b = tiles.location_of_sprite(value3)
            x = b.x-g.x
            y = b.y-g.y
            p = Math.sqrt(x**2+y**2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if p >= -40 and angle >= 135:
                value3.vx=100
            #print(p)
            #print("x = "+x)
            #print("y = "+y)
            #print("angle = "+angle)
            #value3.say_text(""+p)
        for value4 in sprites.all_of_kind(SpriteKind.enemy2):
            t = tiles.location_of_sprite(value4)
            x = t.x-g.x
            y = t.y-g.y
            p = Math.sqrt(x**2+y**2)
            angle = Math.atan2(y, x) * 180 / Math.PI
            if p >= -40 and angle >= 135:
                value4.vx=100
            #value4.say_text(""+angle)
game.on_update(on_on_update3)

def on_on_overlap2(sprite, otherSprite):
    if controller.player1.is_pressed(ControllerButton.A):
        em = 1
        otherSprite.destroy()
        otherSprite.say_text(":)")
    else :
        pass
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite):
    if controller.player1.is_pressed(ControllerButton.A):
        sprites.change_data_number_by(sprite, "em1", 1)
        #em ไม่เปลี่ยน
        otherSprite.destroy()
        otherSprite.say_text(":)")
    else :
        pass
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy2, on_on_overlap3)       

