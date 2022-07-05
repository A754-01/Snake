function Game() {
  // 创建表格
  // 行数
  this.row = 20
  // 列数
  this.col = 20
  // 初始化节点
  this.init()
  // 初始化蛇
  this.snake = new Snake()
  // 初始化食物
  this.food = new Food(this)
  // 帧编号
  this.f = 0
  // 分数
  this.score = 0
  // 执行定时器任务
  this.start()
  // 键盘的事件监听
  this.bindEvent()
}
Game.prototype.init = function () {
  this.dom = document.createElement("table")
  var tr, td
  // 遍历行和列上树
  for (var i = 0; i < this.row; i++) {
    // 遍历行 创建节点上树
    tr = document.createElement("tr")
    for (var j = 0; j < this.col; j++) {
      // 遍历列，创建节点上树
      td = document.createElement("td")
      // 追加到tr
      tr.appendChild(td)
    }
    // 追加节点上树
    this.dom.appendChild(tr)
  }

  // 表格上树
  document.getElementById("app").appendChild(this.dom)
}
Game.prototype.clear = function () {
  // 遍历表格，擦除画布
  for (var i = 0; i < this.row; i++) {
    for (var j = 0; j < this.col; j++) {
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "transparent"
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = ""
    }
  }
}
// 设置颜色的方法
Game.prototype.setColor = function (row, col, color) {
  // 让表格第几行第几列设置什么颜色
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[
    col
  ].style.background = color

}

// 渲染食物
Game.prototype.setHTML = function (row, col, html) {
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[
    col
  ].innerHTML = html
}
// 设置键盘事件监听
Game.prototype.bindEvent = function () {
  var self = this
  // 键盘事件
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      // 按左键
      case 37:
        // 先进行判断，如果当前的方向是向左移动，此时我们不能按右键，直接return
        if (self.snake.direction === "R") return
        self.snake.changeDirection("L")
        break

      // 按上键
      case 38:
        // 先进行判断，如果当前的方向是向上移动，此时我们不能按下键，直接return
        if (self.snake.direction === "D") return
        self.snake.changeDirection("U")
        break

      // 按右键
      case 39:
        // 先进行判断，如果当前的方向是向右移动，此时我们不能按左键，直接return
        if (self.snake.direction === "L") return
        self.snake.changeDirection("R")
        break

      // 按下键
      case 40:
        // 先进行判断，如果当前的方向是向下移动，此时我们不能按上键，直接return
        if (self.snake.direction === "U") return
        self.snake.changeDirection("D")
        break
    }
  }
}
Game.prototype.start = function () {

  this.timer = setInterval(function () {
    // 清屏-更新-渲染
    game.f++

    document.getElementById('f').innerHTML = '帧编号: ' + game.f
    document.getElementById('score').innerHTML = '分数: ' + game.score
    // 清屏
    game.clear()

    // 蛇变长时，速度加快
    var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1
    // 更新蛇的运动
    game.f % during == 0 && game.snake.update()
    // 渲染蛇
    game.snake.render()
    // 渲染食物
    game.food.render()
  }, 15)
}
