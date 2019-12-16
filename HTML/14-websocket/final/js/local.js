const Local = function () {
  let game
  // 时间间隔
  const INTERVAL = 200
  let timer = null
  // 时间计数器
  let timeCount = 0
  // time
  let time = 0
  // 绑定键盘事件
  const bindKeyEvent = () => {
    document.onkeydown = (e) => {
      // left up right down space
      if (e.keyCode === 37) {
        game.left()
      } else if (e.keyCode === 38) {
        game.rotate()
      } else if (e.keyCode === 39) {
        game.right()
      } else if (e.keyCode === 40) {
        game.down()
      } else if (e.keyCode === 32) {
        game.space()
      }
    }
  }
  // generateType
  const generateType = () => {
    return Math.floor(Math.random() * 7)
  }
  // generateDir
  const generateDir = () => {
    return Math.floor(Math.random() * 4)
  }
  // move
  const move = () => {
    timeFunc()
    if (!game.down()) {
      game.fixed()
      let line = game.checkClear()
      if (line) game.addScore(line)
      if(game.gameOver()) {
        game.getResult()
        stop()
      }
      else game.performNext(generateType(), generateDir())
    }
  }
  // 随机生成干扰行
  const genarateTailLines = (lineNum) => {
    let lines = []
    for (let i = 0; i < lineNum; i++) {
      let line = []
      for (let j = 0; j < 10; j++) line.push(Math.floor(Math.random() * 2))
      lines.push(line)
    }
    return lines
  }
  // 计时
  const timeFunc = () => {
    timeCount++
    if (timeCount === 5) {
      timeCount = 0
      time++
      game.setTime(time)
      if (time % 10 === 0) game.addTailLines(genarateTailLines(1))
    }
  }
  // start
  const start = () => {
    let doms = {
      gameDiv: document.getElementById('local_game'),
      nextDiv: document.getElementById('local_next'),
      timeDiv: document.getElementById('local_time'),
      scoreDiv: document.getElementById('local_score'),
      resultDiv: document.getElementById('local_result')
    }
    game = new Game()
    game.init(doms, generateType(), generateDir())
    bindKeyEvent()
    game.performNext(generateType(), generateDir())
    timer = setInterval(move, INTERVAL)
  }
  // stop
  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    document.onkeydown = null
  }
  this.start = start
}