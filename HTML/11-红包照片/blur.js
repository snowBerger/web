var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight

var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d')

canvas.width = canvasWidth
canvas.height = canvasHeight

var timeShow
var timeReset

var image = new Image()
var radius = 0
var clippingRegion = {x: -1, y: -1, r: radius}
var leftMargin = 0,
  	topMargin = 0

image.src = "image.jpg"
image.onload = function (e) {
	$('#blur-div').css({
		width: canvasWidth + 'px',
		height: canvasHeight + 'px'
	});

	$('#blur-image').css({
		width: image.width + 'px',
		height: image.height + 'px'
	})

	leftMargin = (image.width - canvas.width) / 2
	topMargin = (image.height - canvas.height) / 2

	$('#blur-image').css({
		top: String(-topMargin) + 'px',
		left: String(-leftMargin) + 'px'
	})

	initCanvas()
}

function initCanvas () {
	clearInterval(timeShow)
	clearInterval(timeReset)
	radius = 0
	var theleft = leftMargin < 0 ? -leftMargin : 0
	var thetop = topMargin < 0 ? -topMargin : 0
	var _x = Math.random()
	var _y = Math.random()
	timeReset = setInterval(function () {
		if (radius > 49) {
			clearInterval(timeReset)
		}
		radius += 8
		clippingRegion = {x: _x * (canvas.width - 2 * radius - 2 * theleft) + radius + theleft, 
						  y: _y * (canvas.height - 2 * radius - 2 * thetop) + radius + thetop, r: radius}
		draw(image, clippingRegion)
	}, 30)
}

function setClippingRegion (clippingRegion) {
	context.beginPath()
	context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false)
	context.clip()
}

function draw (image, clippingRegion) {
	context.clearRect(0, 0, canvas.width, canvas.height)

	context.save()
	setClippingRegion(clippingRegion)
	// context.drawImage(image, leftMargin, topMargin, canvas.width, canvas.height,
	// 						 0, 0, canvas.width, canvas.height)
	context.drawImage(image, Math.max(leftMargin, 0), Math.max(topMargin, 0), 
							 Math.min(canvas.width, image.width), Math.min(canvas.height, image.height),
							 leftMargin < 0 ? -leftMargin : 0, topMargin < 0 ? -topMargin : 0, 
							 Math.min(canvas.width, image.width), Math.min(canvas.height, image.height))
	context.restore()
}

function show () {
	timeShow = setInterval(function () {
		clippingRegion.r += 20
		if (clippingRegion.r > 2*Math.max(canvas.width, canvas.height)) {
			clearInterval(timeShow)
		}
		draw(image, clippingRegion)
	}, 30)
}

function reset () {
	initCanvas()
}

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault()
})