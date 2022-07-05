function Snake() {
  this.body = []
}

function Snake() {
  // 蛇的初始化身体
  this.body = [

    {
      row: 3,
      col: 5,
    },
    {
      row: 3,
      col: 4,
    },
    {
      row: 3,
      col: 3,
    },
    {
      row: 3,
      col: 2,
    },
  ]

  // 信号量，设置运动方向
  this.direction = "R"
  // 即将改变的方向，目的是为了防止出现原地掉头的情况
  this.willDirection = "R"
}
// 蛇的运动
Snake.prototype.update = function () {
  // 当前的direction接收一下willDirection
  this.direction = this.willDirection
  switch (this.direction) {
    case "R":
      // 向右移动
      this.body.unshift({
        row: this.body[0].row,
        col: this.body[0].col + 1,
      })
      break
    case "D":
      // 向下移动
      this.body.unshift({
        row: this.body[0].row + 1,
        col: this.body[0].col,
      })
      break
    case "L":
      // 向左移动
      this.body.unshift({
        row: this.body[0].row,
        col: this.body[0].col - 1,
      })
      break
    case "U":
      // 向上移动
      this.body.unshift({
        row: this.body[0].row - 1,
        col: this.body[0].col,
      })
      break
  }
  // 死亡判断，撞到四周边缘死亡
  if (
    this.body[0].col > game.col - 1 ||
    this.body[0].row > game.row - 1 ||
    this.body[0].col < 0 ||
    this.body[0].row < 0
  ) {
    alert("游戏结束! 您当前得分为: " + game.score + '分')
    this.body.shift()
    clearInterval(game.timer)
  }
  // 死亡判断，撞到自己也会死亡
  for (var i = 1; i < this.body.length; i++) {
    // 判断当前蛇的头部和身体的某一个部分row和col坐标完全相等 则为死亡
    if (
      this.body[0].col === this.body[i].col &&
      this.body[0].row === this.body[i].row
    ) {
      alert("游戏结束! 您当前得分为: " + game.score + '分')
      this.body.shift()
      clearInterval(game.timer)
    }
  }
  // 蛇吃食物
  if (
    this.body[0].row === game.food.row &&
    this.body[0].col === game.food.col
  ) {
    // 吃到食物后，此时蛇只有头部增加了，尾部没有删除
    // 创建新的食物
    game.food = new Food(game)
    // 吃到食物加分数
    game.score++
    // 让帧编号归零，因为加速时蛇会蹿一下
    game.f = 0
  } else {
    // 蛇的不同方向的运动
    this.body.pop()
  }
}
// 蛇的方向改变，防止的是在第一次渲染之前会出现掉头的问题
Snake.prototype.changeDirection = function (d) { this.willDirection = d }
Snake.prototype.render = function () {
  // 蛇头的渲染
  game.setColor(this.body[0].row, this.body[0].col, "red")
  // 蛇的身体
  for (var i = 1; i < this.body.length; i++) {
    game.setColor(this.body[i].row, this.body[i].col, "pink")
  }
}
