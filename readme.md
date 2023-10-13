# koishi-plugin-fightlandlord

[![npm](https://img.shields.io/npm/v/koishi-plugin-fight-landlord?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-fightlandlord)

## koishi斗地主游戏

使用任意数据库均可，免去了安装额外依赖之苦。对于小型使用场景来说，基于关系型数据库的操作尽管理论上效率一般，但胜在轻巧简便。

### 快速开始

* 使用ddz.list查询是否已经有可用房间。如果没有的话，赶紧呼朋唤友准备开始吧
* 要加入准备中的房间，使用ddz.join ID，如ddz.join 1
* 要创建房间，使用ddz.create。添加参数-m以指定模式。0：经典模式，1：魔改模式，2：万宁模式。如ddz.create -m 1
* 当人满后，房主使用ddz.start开始游戏
* 私聊机器人，使用ddz.info 或 手牌 以获取手牌等信息
* 使用ddz.play 或 出 以出牌，输入ddz.play 过 / 出 过 则可以直接跳过本轮
* 使用ddz.quit退出当前房间。若房主退出，则房主身份会顺延到下一位玩家
* 使用ddz.disband解散当前房间（仅房主可用）
* 当出现问题时，使用ddz.reset以重置数据表

### 规则：当玩家人数为4~6人时

#### 4人场

分地主队和农民队，地主没有额外的牌。使用一副完整牌 + 去掉黑桃、草花、大小王的半副牌。每人20张牌。

#### 5人场

2地主对3农民。使用两副完整牌。每人20张牌，每个地主有4张地主牌。

#### 6人场

分地主队和农民队，地主没有额外的牌。使用三副完整牌。每人27张牌。

### 规则：经典斗地主

本游戏采用经典斗地主规则：

* 单牌
* 对子（一对相同点数的牌）
* 三张相同点数的牌
* 三带一（三张相同点数的牌 + 单牌）
* 三带一对（三张相同点数的牌 + 一对）
* 顺子（连续的五张或更多点数相邻的牌）
* 连对（连续的两对或更多对点数相邻的牌）
* 飞机不带翅膀（连续的两个或更多个三张相同点数的牌）
* 飞机带单牌（连续的两个或更多个三张相同点数的牌 + 相同数量的单牌）
* 飞机带对子（连续的两个或更多个三张相同点数的牌 + 相同数量的对子）
* 炸弹（四张点数相同的牌）
* 王炸（即大王+小王）

### 规则：魔改斗地主

在经典斗地主的基础上扩充而来，在出牌阶段随机触发事件。使用ddz.create -m 1以启用。 事件如下：

* 以小博大-最大的手牌变为2
* 昙花一现-随机让一位玩家明牌
* 散财童子-当手牌数大于1时，随机丢掉一张手牌
* 阳光普照-每人获得一张牌
* 偷天换日-将一名玩家的一张手牌和自己的一张手牌交换
* 狸猫换太子-将一名玩家的身份和自己的身份交换
* 乾坤大挪移-将一名玩家的全部手牌和自己的全部手牌交换
* 反转了-翻转出牌顺序
* 摇滚狂欢-每名手牌数大于1的玩家均失去点数最大的一张手牌

### 规则：万宁斗地主

在魔改斗地主的基础上扩充而来，技能触发概率增大。使用ddz.create -m 2以启用。

### 更新日志

#### 1.1.12

* 调整：狸猫换太子、偷天换日、乾坤大挪移现在将会选择一名其它玩家作为目标，不会出现选择自己作为目标的情况了
* 新增：三山四海-当前玩家随机获得1~4张3或1~4张4

#### 1.1.11

* 修复：退出房间时的提示语错误
* 修复：将对子视作两张单牌在飞机中打出时，不允许出牌的情况
* 新增：摇滚狂欢-每名手牌数大于1的玩家均失去点数最大的一张手牌

#### 1.1.10

* 调整：6人局将会发3副牌，以加快对局速度

#### 1.1.9

* 修复：以小博大不能正确地改变手牌

#### 1.1.8

* 新增：插件设置页增加提示信息
* 调整：6人局现在会发3副牌了

#### 1.1.7

* 修复：反转了-无法正确反转出牌顺序
* 修复：输入无效手牌来尝试触发魔改、万宁技能
* 调整：万宁模式的技能触发概率变为25%

#### 1.1.6

* 新增：万宁斗地主模式
* 新增：乾坤大挪移-将一名玩家的全部手牌和自己的全部手牌交换
* 新增：反转了-翻转出牌顺序

#### 1.1.5

* 新增：魔改斗地主技能：偷天换日-将一名玩家的一张手牌和自己的一张手牌交换
* 新增：魔改斗地主技能：狸猫换太子-将一名玩家的身份和自己的身份交换
* 调整：ddz.reset现在会返回提示语了
* 修复：ddz.quit在活动房间中依然可以退出
* 修复：魔改斗地主技能：阳光普照会固定发牌
* 修复：点数小的炸弹可以管住点数大的炸弹（如3333>4444）

#### 1.1.4

* 修复：ddz.play指令at不到人
* 调整：暂时关闭魔改斗地主技能：阳光普照

#### 1.1.3

* 修复：ddz.start指令显示玩家昵称错误
* 修复：ddz.start指令和ddz.play指令对玩家at时的错误

#### 1.1.2

* 新增：ddz主指令提供帮助信息
* 调整：完善ddz.rule和ddz.help指令

#### 1.1.1

* 修复：ddz.reset的bug

#### 1.1.0

* 这是一个RC版本
* 重大更新：调整架构
* 重大更新：每场对局最多支持6人同时游玩，具体规则请参阅说明
* 修复：王炸可以管住王炸
* 调整：更友好的手牌信息和其它系统播报等
* 调整：魔改斗地主技能：阳光普照 进行了平衡性调整，现在不会每次都发特别大的牌了

#### 1.0.126

* 新增：添加了一些群友特别标志位

#### 1.0.125

* 调整：不再强制以空格分割出牌

#### 1.0.124

* 修复：手牌数播报更新不及时

#### 1.0.123

* 修复：魔改斗地主触发事件时会吃牌

#### 1.0.122

* 修复：当三连牌的主体大于上家但尾巴小于上家时压不住（包括三带一、三带二、飞机）
* 修复：ddz.create -m参数类型错误
* 调整：魔改斗地主的事件触发判定放在检测手牌后，防止玩家通过打出不存在的牌来尝试触发事件
* 调整：ddz.play指令可以接受小写字母了
* 调整：获胜时将会播报胜利阵营

#### 1.0.121

* 新增：魔改斗地主模式技能：阳光普照

#### 更早

* 懒得写了

### Roadmap

* 为ai预留接口
* 增加积分系统
