function Food(gameSnake) {
  var self = this
  // 食物的位置
  // 用do-while语句先创建一个食物的row和col，再判断这个row和col是否会随机生成到蛇的身上
  do {
    this.row = parseInt(Math.random() * gameSnake.row)
    this.col = parseInt(Math.random() * gameSnake.col)
    console.log(this.row, this.col)
  } while (
    (function () {
      // 遍历蛇的row和col与食物随机生成的row和col进行判断，是否重合
      for (var i = 0; i < gameSnake.snake.body.length; i++) {
        if (
          gameSnake.snake.body[i].row === self.row &&
          gameSnake.snake.body[i].col === self.col
        ) {
          return true
        }
      }
      return false
    })()
  )
}

Food.prototype.render = function () {
  game.setHTML(this.row, this.col, '🍎')
}
