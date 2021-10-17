mySprite: Sprite = None
Ai_U: Sprite = None
path = None
distance = 0

def create_1():
    global mySprite
    scene.set_background_image(assets.image("""myImage8"""))
    tiles.set_tilemap(tilemap("""level1"""))
    Enemy1 = Create_Enemy()
    Enemy2 = Create_Enemy()
    Enemy3 = Create_Enemy()
    Enemy4 = Create_Enemy()
    tiles.place_on_tile(Enemy1, tiles.get_tile_location(14, 15))
    tiles.place_on_tile(Enemy2, tiles.get_tile_location(21, 15))
    tiles.place_on_tile(Enemy3, tiles.get_tile_location(30, 15))
    tiles.place_on_tile(Enemy4, tiles.get_tile_location(58, 16))
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

def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -222
controller.B.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

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


def Create_Enemy():
    global Ai_U
    Ai_U = sprites.create(assets.image("""Ai_U"""),SpriteKind.enemy)
    sprites.set_data_string(Ai_U, "direction", "L")
    return Ai_U

def on_on_update():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        Detect_Wall(value, randint(1, 2))
        Move_by_Facing(value)
game.on_update(on_on_update)

create_1()
