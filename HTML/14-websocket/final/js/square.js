const Square = function () {
  // squre data
  this.data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  // origin
  this.origin = {
    x: 0,
    y: 0
  }
  // direction
  this.dir = 0
}
// rotate
Square.prototype.canRotate = function (isValid) {
  let _dir = (this.dir + 1) % 4
  let _data = this.rotates[_dir]
  return isValid(this.origin, _data)
}
Square.prototype.rotate = function (num = 1) {
  this.dir = (this.dir + num) % 4
  this.data = this.rotates[this.dir]
}
// left
Square.prototype.canLeft = function (isValid) {
  let _pos = {
    x: this.origin.x - 1,
    y: this.origin.y
  }
  return isValid(_pos, this.data)
}
Square.prototype.left = function () {
  this.origin.x--
}
// right
Square.prototype.canRight = function (isValid) {
  let _pos = {
    x: this.origin.x + 1,
    y: this.origin.y
  }
  return isValid(_pos, this.data)
}
Square.prototype.right = function () {
  ++this.origin.x
}
// down
Square.prototype.canDown = function (isValid) {
  let _pos = {
    x: this.origin.x,
    y: this.origin.y + 1
  }
  return isValid(_pos, this.data)
}
Square.prototype.down = function () {
  this.origin.y++
}