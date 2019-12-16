const Game = function () {
  // dom 元素
  let gameDiv
  let nextDiv
  let timeDiv
  let scoreDiv
  let resultDiv
  let score = 0
  // data 矩阵
  let nextData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  let gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    
  ]
  // squre
  let currSquare
  let nextSquare
  // dom 数组
  let nextDivs = []
  let gameDivs = []
  // init div
  const initDiv = (container, data, divs) => {
    for (let i = 0, l = data.length; i < l; i++) {
      let div = []
      for (let j = 0, k = data[i].length; j < k; j++) {
        let newNode = document.createElement('div')
        newNode.className = 'none'
        newNode.style.cssText = 'top: ' + (i * 20) + 'px; ' + 'left: ' + (j * 20) + 'px;'
        container.appendChild(newNode)
        div.push(newNode)
      }
      divs.push(div)
    }
  }
  // refresh div
  const refreshDiv = (data, divs) => {
    for (let i = 0, l = data.length; i < l; i++) {
      for (let j = 0, k = data[i].length; j < k; j++) {
        if (data[i][j] === 0) divs[i][j].className = 'none'
        else if (data[i][j] === 1) divs[i][j].className = 'done'
        else if (data[i][j] === 2) divs[i][j].className = 'current'
      }
    }
  }
  // check position
  const checkPos = (pos, x, y) => {
    if (pos.x + x < 0) return false
    else if (pos.x + x >= gameData[0].length) return false
    else if (pos.y + y < 0) return false
    else if (pos.y + y >= gameData.length) return false
    else if (gameData[pos.y + y][pos.x + x] === 1) return false
    return true
  }
  // check data
  const isValid = (pos, data) => {
    for (let i = 0, l = data.length; i < l; i++) {
      for (let j = 0, k = data[i].length; j < k; j++) {
        if (data[j][i] !== 0 && !checkPos(pos, i, j)) return false
      }
    }
    return true
  }
  // clear data
  const clearData = () => {
    for (let i = 0, l = currSquare.data.length; i < l; i++) {
      for (let j = 0, k = currSquare.data[i].length; j < k; j++) {
        if (checkPos(currSquare.origin, j, i)) gameData[currSquare.origin.y + i][currSquare.origin.x + j] = 0
      }
    }
  }
  // set data
  const setData = () => {
    for (let i = 0, l = currSquare.data.length; i < l; i++) {
      for (let j = 0, k = currSquare.data[i].length; j < k; j++) {
        if (checkPos(currSquare.origin, j, i)) gameData[currSquare.origin.y + i][currSquare.origin.x + j] = currSquare.data[i][j]
      }
    }
  }
  // 初始化
  const init = (doms, type, dir) => {
    gameDiv = doms.gameDiv
    nextDiv = doms.nextDiv
    timeDiv = doms.timeDiv
    scoreDiv = doms.scoreDiv
    resultDiv = doms.resultDiv
    nextSquare = SquareFactory.prototype.make(type, dir)
    initDiv(gameDiv, gameData, gameDivs)
    initDiv(nextDiv, nextSquare.data, nextDivs)
    refreshDiv(nextSquare.data, nextDivs)
  }
  // 左移
  const left = () => {
    if (currSquare.canLeft(isValid)) {
      clearData()
      currSquare.left()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }
  // 右移
  const right = () => {
    if (currSquare.canRight(isValid)) {
      clearData()
      currSquare.right()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }
  // 下移
  const down = () => {
    if (currSquare.canDown(isValid)) {
      clearData()
      currSquare.down()
      setData()
      refreshDiv(gameData, gameDivs)
      return true
    }
    return false
  }
  // 旋转
  const rotate = () => {
    if (currSquare.canRotate(isValid)) {
      clearData()
      currSquare.rotate()
      setData()
      refreshDiv(gameData, gameDivs)
    }
  }
  // space
  const space = () => {
    while (down()) {
      down()
    }
  }
  // fixed
  const fixed = () => {
    for (let i = 0, l = currSquare.data.length; i < l; i++) {
      for (let j = 0, k = currSquare.data[i].length; j < k; j++) {
        if (checkPos(currSquare.origin, j, i)) {
          if (gameData[currSquare.origin.y + i][currSquare.origin.x + j] === 2) gameData[currSquare.origin.y + i][currSquare.origin.x + j] = 1
        }
      }
    }
    refreshDiv(gameData, gameDivs)
  }
  // performNext
  const performNext = (type, dir) => {
    currSquare = nextSquare
    setData()
    nextSquare = SquareFactory.prototype.make(type, dir)
    refreshDiv(gameData, gameDivs)
    refreshDiv(nextSquare.data, nextDivs)
  }
  // checkClear
  const checkClear = () => {
    let line = 0
    for (let i = gameData.length - 1; i >= 0; i--) {
      let clear = true
      for (let j = 0, k = gameData[i].length; j < k; j++) {
        if (gameData[i][j] !== 1) {
          clear = false
          break
        }
      }
      if (clear) {
        line++
        // gameData 整体下移一行
        for (let m = i; m > 0; m--) {
          for (let n = 0, l = gameData[m].length; n < l; n++) {
            gameData[m][n] = gameData[m - 1][n]
          }
        }
        // 第一行清零
        for (let x = 0, l = gameData[i].length; x < l; x++) gameData[0][x] = 0
        i++
      }
    }
    return line
  }
  // gameOver
  const gameOver = () => {
    let _flag = false
    for (let i = 0, l = gameData[0].length; i < l; i++) {
      if (gameData[1][i] === 1) {
        _flag = true
        break
      }
    }
    return _flag
  }
  // setTime
  const setTime = (time) => {
    timeDiv.innerHTML = time
  }
  // addScore
  const addScore = (line) => {
    let s = 0
    switch (line) {
      case 1:
        s = 10
        break;
      case 2:
        s = 30
        break;
      case 3:
        s = 60
        break;
      case 4:
        s = 100
        break;
      default:
        break;
    }
    score += s
    scoreDiv.innerHTML = score
  }
  // getResult
  const getResult = (win) => {
    if (win) resultDiv.innerHTML = 'You Win'
    else resultDiv.innerHTML = 'You Lost'
  }
  // 底部新增行
  const addTailLines = (lines) => {
    for (let i = 0, l = gameData.length - lines.length; i < l; i++) gameData[i] = gameData[i + lines.length]
    let _length = gameData.length
    for(let i = 0, l = lines.length; i < l; i++) gameData[_length - lines.length + i] = lines[i]
    currSquare.origin.y -= lines.length
    if (currSquare.origin.y < 0) currSquare.origin.y = 0
    refreshDiv(gameData, gameDivs)
  }

  this.init = init
  this.left = left
  this.right = right
  this.down = down
  this.rotate = rotate
  this.space = space
  this.fixed = fixed
  this.performNext = performNext
  this.checkClear = checkClear
  this.gameOver = gameOver
  this.setTime = setTime
  this.addScore = addScore
  this.getResult = getResult
  this.addTailLines = addTailLines
}
