function Game() {
    this.bgPos = 0
    this.frame = 0
    this.bulletFrame = 20
    this.enemyFrame = 50
}
// 所有被调用的属性都放原型链上
Game.prototype.screenW = window.innerWidth;
Game.prototype.screenH = window.innerHeight;
Game.prototype.srcPath = "./assets/images/";
Game.prototype.player = 0;
Game.prototype.bullets = [];
Game.prototype.enemys = [];
Game.prototype.buffs = []
Game.prototype.stage = document.querySelector(".stage")
Game.prototype.gameScene = document.querySelector(".gameScene");
Game.prototype.gameStartBtn = document.querySelector(".startGameBtn")
Game.prototype.scoreBoard = document.querySelector(".score span")
Game.prototype.ranking = document.querySelector(".ranking")
Game.prototype.dead = document.querySelector(".dead")
Game.prototype.restartBtn = document.querySelector(".restart")
Game.prototype.reviveBtn = document.querySelector(".revive")
Game.prototype.record = document.querySelector(".record")
Game.prototype.input = document.querySelector(".record input")
Game.prototype.submit = document.querySelector(".submit")

//玩家飞机配置
Game.prototype.playerConfig = {
    path: "our-plane.gif",
    boom: "our-plane-boom.gif",
    width: 66,
    height: 80,
    blood: 3,
    delay: 30,
    score: 0,
    buff: false
}
//子弹配置
Game.prototype.bulletConfig = {
    path: "our-bullet.png",
    width: 6,
    height: 14,
    speed: -5,
    blood: 1
}
//敌方飞机配置
Game.prototype.enemyPlaneConfig = function () {
    var enemyPlaneConfig = [{
        path: "enemy-plane-s.png",
        boom: "enemy-plane-s-boom.gif",
        width: 34,
        height: 24,
        speed: 5,
        blood: 1,
        delay: 20,
        score: 1
    }, {
        path: "enemy-plane-m.png",
        hit: "enemy-plane-m-hit.png",
        boom: "enemy-plane-m-boom.gif",
        width: 46,
        height: 60,
        speed: 3,
        blood: 3,
        delay: 30,
        score: 3
    }, {
        path: "enemy-plane-l.png",
        hit: "enemy-plane-l-hit.png",
        boom: "enemy-plane-l-boom.gif",
        width: 110,
        height: 164,
        speed: 2,
        blood: 5,
        delay: 40,
        score: 10
    }]
    var randomNum = Math.floor(Math.random() * 100)
    if (randomNum < 15) {
        return enemyPlaneConfig[2]
    } else if (randomNum < 25) {
        return enemyPlaneConfig[1]
    } else {
        return enemyPlaneConfig[0]
    }
}
//buff配置
Game.prototype.buffConfig = {
    path: "buff.png",
    width: 40,
    height: 40,
    speed: 3,
    blood: 1,
    // delay: 20,
    // score: 1
}


//实例化游戏（配置）
var game = new Game()

//元素构造器
function Element(config, x, y) {
    this.path = config.path
    this.width = config.width
    this.height = config.height
    this.b = config.blood
    this.blood = config.blood
    this.x = x
    this.y = y
    this.die = false
}
//让Element构造器拥有Game的属性和方法
Element.prototype = Object.create(Game.prototype)
Element.prototype.construtor = Element
//画的方法
Element.prototype.draw = function () {
    this.node = document.createElement("img")
    this.node.src = this.srcPath + this.path
    this.gameScene.appendChild(this.node)
    //创建完节点顺便更新视图
    this.updateView()
}
// 更新视图的方法
Element.prototype.updateView = function () {
    //这里是元素的宽不是元素节点的宽
    this.node.style.top = this.y - this.height / 2 + "px"
    this.node.style.left = this.x - this.width / 2 + "px"
}


//玩家构造器 继承Element
function Player(config, x, y) {
    Element.apply(this, [config, x, y])
    this.boom = config.boom
    this.delay = config.delay
    this.score = config.score
    this.buff = config.buff
}
Player.prototype = Object.create(Element.prototype)
Player.prototype.construtor = Player
//创建玩家方法
Game.prototype.createPlayer = function () {
    var newPlayer = new Player(this.playerConfig, this.screenW / 2, this.screenH - this.playerConfig.height / 2)
    this.player = newPlayer
    newPlayer.draw()

}
//调用创建玩家方法创建玩家
game.createPlayer()

//开始游戏
Game.prototype.start = function () {
    p.style.opacity = "0"
    //因为setInterval中的this指向window 
    //所以用that中间变量让that指代原本的this指向
    var that = this
    that.intervalId = setInterval(function () {
        //背景滚动
        that.bgPos++
        that.gameScene.style.backgroundPositionY = that.bgPos + "px"

        that.frame++
        //根据帧数创建子弹
        if (that.frame % that.bulletFrame === 0) {
            //玩家创建子弹
            that.player.createBullte()
        }
        //移动所有子弹
        that.moveAllBullets()
        //检测所有元素是否超出 超出清除
        that.removeOutElement()
        //根据帧数创建敌机
        if (that.frame % that.enemyFrame === 0) {
            that.createEnemy()
        }
        //移动所有敌机
        that.moveAllEnemy()
        //检测所有碰撞
        that.checkAllCrash()
        //检测所有死亡
        that.checkAllDeath()
        //移除所有死亡
        that.removeAllDeath()
        //实时更新得分榜
        that.scoreBoard.innerText = that.player.score
        //移动所有buff
        that.moveAllBuff()

    }, 30)
    that.state = 1

    //按住拖动移动飞机的方法
    // 使用addEventListener的时候注意事件不要加on
    that.gameScene.addEventListener("touchmove", that.player.move)
    that.ranking.style.top = -that.ranking.offsetHeight + "px"
    that.dead.style.bottom = that.screenH + "px"
    that.record.style.left = that.screenW + "px"
}
// game.start()
// 游戏暂停
let p = document.querySelector(".pauseView span")
Game.prototype.pause = function () {
    p.style.opacity = "1"
    var that = this
    clearInterval(that.intervalId)
    that.state = 0
    that.gameScene.removeEventListener("touchmove", that.player.move)

}
//游戏结束
Game.prototype.gameOver = function () {
    this.pause()
    this.dead.style.bottom = "20%"
    this.gameScene.removeEventListener("touchstart", game.toggle)

}


//子弹构造器
function Bullet(config, x, y) {
    Element.call(this, config, x, y)
    this.speed = config.speed
    //子弹有检测顶部超出的方法
    this.checkTopOut = function () {
        if (this.y < -this.height / 2) {
            return true
        }
    }
}
Bullet.prototype = Object.create(Element.prototype)
Bullet.prototype.construtor = Bullet

//子弹怎么移动的方法
Bullet.prototype.move = function () {
    this.y += this.speed
    this.updateView()
}

//清除所有超出顶部的子弹 所有超出底部的敌机 所有超出底部的BUFF
Game.prototype.removeOutElement = function () {
    this.bullets.forEach(function (bullet, indexB, bullets) {
        if (bullet.checkTopOut()) {
            this.gameScene.removeChild(bullet.node)
            bullets.splice(indexB, 1)
        }
    }, this)
    this.enemys.forEach(function (enemy, indexE, enemys) {
        if (enemy.checkBottomOut()) {
            this.gameScene.removeChild(enemy.node)
            enemys.splice(indexE, 1)
        }
    }, this)
    this.buffs.forEach(function (buff, ib, buffs) {
        if (buff.checkBottomOut()) {
            this.gameScene.removeChild(buff.node)
            buffs.splice(ib, 1)
        }
    }, this)
}
//让所有子弹移动的方法
Game.prototype.moveAllBullets = function () {
    this.bullets.forEach(function (bullet, indexB, bullets) {
        bullet.move()
    })
}
//我方飞机有创建子弹的方法
Player.prototype.createBullte = function () {
    var newBullet = new Bullet(this.bulletConfig, this.x, this.y)
    newBullet.draw()
    this.bullets.push(newBullet)

    if (this.buff) {
        var leftB = new Bullet(this.bulletConfig, this.x - this.width / 2, this.y)
        var rightB = new Bullet(this.bulletConfig, this.x + this.width / 2, this.y)
        leftB.draw()
        rightB.draw()
        this.bullets.push(leftB, rightB)
    }
}


//我方飞机自身的移动方法 跟敌机子弹不一样
Player.prototype.move = function (e) {
    e.preventDefault();
    // console.log(this);
    var that = game.player
    var x = e.touches[0].pageX
    var y = e.touches[0].pageY
    // console.log(x,y);
    // console.log(that);
    //让飞机的xy等于鼠标的xy
    that.x = x
    that.y = y
    // console.log(that.x,that.y);
    that.updateView()

}
//敌方飞机构造器 
function EnemyPlane(config, x, y) {
    Element.call(this, config, x, y)
    this.speed = config.speed
    this.hit = config.hit
    this.boom = config.boom
    this.delay = config.delay
    this.score = config.score
    //敌方飞机有检测底部超出的方法
    this.checkBottomOut = function () {
        if (this.y > this.screenH + this.height / 2) {
            return true
        }
    }
}
EnemyPlane.prototype = Object.create(Element.prototype)
EnemyPlane.prototype.construtor = EnemyPlane

//Bullte下有个move方法 可以复用，拼接一下它的原型 拿到move方法
Object.assign(EnemyPlane.prototype, Bullet.prototype)
//construtor又被覆盖 重新赋值
EnemyPlane.prototype.construtor = EnemyPlane
//创建敌方飞机方法
Game.prototype.createEnemy = function () {
    var randomPos = Math.floor(Math.random() * this.screenW)
    var enemyPlaneConfig = this.enemyPlaneConfig()
    var newEnemy = new EnemyPlane(enemyPlaneConfig, randomPos, -enemyPlaneConfig.width)
    newEnemy.draw()
    this.enemys.push(newEnemy)
}

//让每一个敌机移动
Game.prototype.moveAllEnemy = function () {
    this.enemys.forEach(function (enemy, indexE, enemys) {
        enemy.move()
    }, this)
}
//是否碰撞
Element.prototype.checkCrash = function (other) {
    if (!this.die) {
        var H = Math.abs(this.x - other.x) < (this.width + other.width) / 2
        var V = Math.abs(this.y - other.y) < (this.height + other.height) / 2
        if (H && V) {
            return true
        }
    }
}
//所有碰撞检测
Game.prototype.checkAllCrash = function () {
    this.enemys.forEach(function (enemy, indexE, enemys) {
        this.bullets.forEach(function (bullet, indexB, bullets) {
            //敌机与子弹的碰撞检测
            if (enemy.checkCrash(bullet)) {
                enemy.blood--
                bullet.blood--
                // console.log("xxx");

            }
        }, this)
        //敌机与玩家碰撞检测
        if (enemy.checkCrash(this.player)) {
            enemy.blood = 0
            this.player.blood--
        }
    }, this)
    //检测buff与我方飞机碰撞
    this.buffs.forEach(function (buff, ib, buffs) {
        var timeOutId;
        if (buff.checkCrash(this.player)) {
            console.log(this.player.buff);

            if (!this.player.buff) { //false
                this.player.buff = true
                this.gameScene.removeChild(buff.node)
                buffs.splice(ib, 1)
                timeOutId = setTimeout(function () {
                    game.player.buff = false
                }, 10000)
                console.log(timeOutId);

            }

        }
    }, this)
}
//检测是否死亡
Game.prototype.checkAllDeath = function () {
    // 检测敌机是否死亡
    this.enemys.forEach(function (enemy, indexE, enemys) {
        //如果被打但是血高于0小于原始血量就换挨打图
        if (enemy.blood > 0 && enemy.blood < enemy.b && enemy.die === false) {
            enemy.node.src = this.srcPath + enemy.hit
        }
        //如果血量小于等于0 并且还未标记死亡则
        if (enemy.blood <= 0 && !enemy.die) {
            if (enemy.speed == 2) {
                game.player.createBuff(enemy.x, enemy.y)
            }
            // 让他死
            enemy.die = true
            this.player.score += enemy.score
            //并换上爆炸图片
            enemy.node.src = this.srcPath + enemy.boom


        }
    }, this)
    //检测子弹是否死亡
    this.bullets.forEach(function (bullet, indexB, bullets) {
        if (bullet.blood <= 0) {
            bullet.die = true

            this.gameScene.removeChild(bullet.node)
            bullets.splice(indexB, 1)
        }
    }, this)
    //检测玩家是否死亡
    if (this.player.blood <= 0 && !this.player.die) {
        this.player.die = true
        this.player.node.src = this.srcPath + this.player.boom

    }
}
//移除所有死亡
Game.prototype.removeAllDeath = function () {
    //移除死亡敌方飞机
    this.enemys.forEach(function (enemy, indexE, enemys) {
        if (enemy.die) {
            enemy.delay--
            if (enemy.delay < 0) {
                this.gameScene.removeChild(enemy.node)
                enemys.splice(indexE, 1)
            }
        }
    }, this)
    //玩家死亡延迟一下后 结束游戏
    if (this.player.die) {
        this.player.delay--
        if (this.player.delay < 0) {
            //玩家死亡则游戏结束
            this.gameOver()
        }
    }

}
//点击游戏界面暂停游戏
// game.gameScene.ontouchstart = function (start) {
//     var sx = start.touches[0].pageX
//     var sy = start.touches[0].pageY
//     // console.log(start);
//     game.gameScene.ontouchend = function (end) {
//         // console.log(end);
//         var ex = end.changedTouches[0].pageX
//         var ey = end.changedTouches[0].pageY
//         if (sx == ex && sy == ey) {
//             if (game.state === 1) {
//                 game.pause()
//             } else {
//                 game.start()
//             }
//         }
//     }
// }
var oldScoreArr = ""
var defeatCount = 0

function getDefeatCount() {
    //比当前分数低的总count 包括自身
    var lowerScoreCount = 0;
    // 总共玩过的人数
    var totalScoreCount = 0;
    //击败全国x%的人 = 比当前分数低的总count/总count
    for (var j = 0; j < oldScoreArr.length; j++) {
        console.log(oldScoreArr[j]);
        //找到所得分数的索引 j
        if (oldScoreArr[j].score == game.player.score) {
            // 遍历比所得分数低之前的 j-1  包括自身 j 把他们的count全部加起来
            console.log(j - 1);
            for (var k = 0; k <= j; k++) {
                for (key in oldScoreArr[k]) {
                    console.log(oldScoreArr[k][key]);
                    if (key == "count") {
                        lowerScoreCount += oldScoreArr[k][key];
                    }
                }
            }
            /* -------遍历比所得分数低之前的 j-1 把他们的count全部加起来--------- */
        }
        //将所有count加起来
        for (key in oldScoreArr[j]) {
            if (key == "count") {
                totalScoreCount += oldScoreArr[j][key];
            }
        }
    }
    console.log(lowerScoreCount);
    console.log(totalScoreCount);
    //击败全球%人
    defeatCount = parseInt(
        parseFloat((lowerScoreCount / totalScoreCount) * 100)
    );

    console.log(defeatCount);
}
// 保存分数
function saveScore(nickname) {
    //保存得分 使用localStorage存储
    if (localStorage.getItem("score") == null) {
        var newScore = [{
            score: game.player.score,
            count: 1,
            nick: nickname
        }];
        localStorage.setItem("score", JSON.stringify(newScore));
    } else {
        //遍历本地的数组对象
        for (var i = 0; i < oldScoreArr.length; i++) {
            for (key in oldScoreArr[i]) {
                if (key == "score") {
                    if (oldScoreArr[i][key] == game.player.score) {
                        console.log("相等");
                        // 如果本地有这个值了，那么count++ 并且重新存储到本地
                        oldScoreArr[i].count++;
                        localStorage.setItem("score", JSON.stringify(oldScoreArr));
                        getDefeatCount();
                        return;
                    }
                }
            }
        }
        var newobj = {
            score: game.player.score,
            count: 1,
            nick: nickname
        };
        oldScoreArr.push(newobj);
        //排序
        oldScoreArr.sort(function (a, b) {
            return a.score - b.score;
        });

        localStorage.setItem("score", JSON.stringify(oldScoreArr));
        getDefeatCount();
    }
}

//开始或暂停游戏
Game.prototype.toggle = function (start) {
    start.stopPropagation();
    var sx = start.touches[0].pageX
    var sy = start.touches[0].pageY
    // console.log(start);
    game.gameScene.ontouchend = function (end) {
        // console.log(end);
        var ex = end.changedTouches[0].pageX
        var ey = end.changedTouches[0].pageY
        if (sx == ex && sy == ey) {
            if (game.state === 1) {
                game.pause()
            } else {
                game.start()
            }
        }
    }
}
var bangdan = []

function getBangdan() {
    bangdan = []
    for (var i = oldScoreArr.length - 1; i >= oldScoreArr.length - 3; i--) {
        console.log(oldScoreArr[i]);
        bangdan.push(oldScoreArr[i])
    }

}
var sbtext = document.querySelector(".shangbang span")
//重新开始游戏
Game.prototype.restart = function (e) {
    var that = game
    that.dead.style.bottom = -that.dead.offsetHeight + "px"
    console.log(that);

    // e.stopPropagation();
    // e.preventDefault();
    console.log("重新开始");

    if (game.player.score > bangdan[bangdan.length - 1].score) {
        // 记录以下名字分数
        that.record.style.left = "0"
        that.submit.addEventListener("touchend", game.subInfo)

    } else {
        saveScore("未上榜")
        showGameoverView()
        luobang()
        setTimeout(function () {
            // 保存分数之后分数改变 重新拿数组
            oldScoreArr = JSON.parse(localStorage.getItem("score"));
            getBangdan()
            drawScore()
        }, 0)
    }

}

function shangbang() {
    console.log("恭喜上榜了");
    sbtext.innerHTML = "恭喜上榜了!"
}

function luobang() {
    console.log("落榜了，再接再厉！");
    sbtext.style.color = "gray"
    sbtext.innerHTML = "落榜了,再接再厉!"
}

// 提交事件
Game.prototype.subInfo = function () {
    // 取到玩家输入的名称
    console.log(game.input.value);
    // 保存分数 玩家昵称
    saveScore(game.input.value)
    setTimeout(function () {
        // 保存分数之后分数改变 重新拿数组
        oldScoreArr = JSON.parse(localStorage.getItem("score"));
        getBangdan()
        drawScore()
    }, 0)
    game.record.style.left = game.screenW + "px"
    setTimeout(function () {
        showGameoverView()
        shangbang()

    }, 600)

}
// 显示击败人数
function showGameoverView() {
    var node = document.createElement("button")
    if (defeatCount > 50) {
        game.record.innerHTML = `恭喜你击败了全国${defeatCount}%的对手`
        node.innerText = "再战佳绩"
    } else {
        game.record.innerHTML = `你击败了全国${defeatCount}%的对手`
        node.innerText = "不服再来"
    }
    game.record.style.left = 0
    game.ranking.style.top = "0px"
    node.classList.add("again")
    node.addEventListener("click", again)
    game.gameScene.appendChild(node)
}

function setDefautScore() {
    var defaultScore = [{
        score: 300,
        count: 1,
        nick: "Zoopen"
    }, {
        score: 200,
        count: 1,
        nick: "Aororu"
    }, {
        score: 100,
        count: 1,
        nick: "KP"
    }];
    defaultScore.sort(function (a, b) {
        return a.score - b.score;
    });
    localStorage.setItem("score", JSON.stringify(defaultScore));
}

function again() {
    window.location.reload()
}
onload = function () {
    oldScoreArr = JSON.parse(localStorage.getItem("score"));
    console.log(oldScoreArr);
    // 如果现有数组小于3 给默认
    if (oldScoreArr == null || oldScoreArr.length < 3) {
        setDefautScore()
    }

    oldScoreArr = JSON.parse(localStorage.getItem("score"));
    getBangdan()
}
// 把分数传到榜单上
function drawScore() {
    var trs = game.ranking.querySelectorAll(".ranking .ranking-score")
    trs.forEach(function (e, i, arr) {
        console.log("asfdoasdhsfhasfhkj", e);
        console.log(e.querySelector(".ranking-scoreBoard"));
        e.querySelector(".ranking-scoreBoard").innerHTML = bangdan[i].score
        e.querySelector(".ranking-nickname").innerHTML = bangdan[i].nick
    })
}

// 复活
Game.prototype.revive = function (e) {
    // console.log(this);
    e.stopPropagation();

    game.player.blood = 3
    game.player.die = false
    game.player.node.src = game.srcPath + game.player.path
    game.start()
    game.gameScene.addEventListener("touchstart", game.toggle)
}
//点击分数得buff
Game.prototype.scoreBuff = function (e) {
    e.stopPropagation();
    console.log("xxx");
    //buff
    game.player.buff = true

    setTimeout(function () {
        game.player.buff = false
    }, 10000)
}
//开始游戏按钮 点击开始游戏
Game.prototype.startGame = function () {
    console.log(this);

    game.stage.style.marginLeft = "-100%"
    game.start()
}
//Buff构造器
function Buff(config, x, y) {
    Element.call(this, config, x, y)
    this.speed = config.speed
    //Buff有检测底部超出的方法
    this.checkBottomOut = function () {
        if (this.y > this.screenH + this.height / 2) {
            return true
        }
    }
}
Buff.prototype = Object.create(Element.prototype)
Buff.prototype.construtor = Buff
//实例化buff
Game.prototype.createBuff = function (x, y) {
    var newBuff = new Buff(this.buffConfig, x, y)
    newBuff.draw()
    this.buffs.push(newBuff)
}
//Buff 移动的方法 拼接一下子弹的移动方法
Object.assign(Buff.prototype, Bullet.prototype)
Buff.prototype.construtor = Buff
//让所有BUFF移动
Game.prototype.moveAllBuff = function () {
    this.buffs.forEach(function (buff, ib, buffs) {
        buff.move()
    }, this)
}
game.gameScene.addEventListener("touchstart", game.toggle)

game.gameScene.addEventListener("touchmove", game.player.move)

game.restartBtn.addEventListener("touchstart", game.restart)
game.reviveBtn.addEventListener("touchstart", game.revive)

game.scoreBoard.addEventListener("touchstart", game.player.scoreBuff)

game.gameStartBtn.addEventListener("click", game.startGame)