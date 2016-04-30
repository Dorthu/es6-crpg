# First Person RPG

A WebGL-powered, turn based RPG. Built on top of Three.js, webpack, npm, sass, and probably more.
Presently in heavy development, but leaning toward a thoughtful combat system and a focus on
exploration and investigation.  All assets are created in [Pixly](http://pixly.meltinglogic.com/forum/index.php)
and GIMP.

### How to Play (easy mode)

I have this hosted at [http://rpg-test.dorthu.com](http://rpg-test.dorthu.com).


#### Controls

These are subject to change, and this might be out of date.

| key | action |
|-----|--------|
| arrows | move |
| L | look |
| U | use object in world |
| 1-0 | select items in inventory |
| E | use currently selected item in inventory |
| P | push (attack) |
| space | shoot (attack) |

#### Editor

The code also runs as a level editor - just add [?editor=1](http://rpg-test.dorthu.com?editor=1)
to the URL to the page to run it.

| key | action |
|-----|--------|
| E | Editor select menu (type to find resources, enter to select them) |
| G | Get contents of grid space in front of you |
| D | delete tile |
| space | Place current tile |
| /(\d+)/ space | Place tile for $1 spaces |
| F space | Flood fill tiles |
| W space | Wall fill (add tiles in all empty spaces adjacent to those that would be hit with a flood fill) |
| /R(\d+)x(\d+)/ space | Add a $1 x $2 room of tiles |
| escape | Clear command buffer |
| S | Serialize (dumps json version of level to DOM) |
| Q | Toggle mat2 |
| L | disable gridlines |


### How to Play (developer mode)

```bash
git clone $THIS_REPO
cd es6-crpg
npm install
webpack-dev-server
```

This should get the game running at localhost:8080
