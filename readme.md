# koishi-plugin-fightlandlord

[![npm](https://img.shields.io/npm/v/koishi-plugin-fight-landlord?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-fightlandlord)

## koishi斗地主游戏

使用任意数据库均可，免去了安装额外依赖之苦。对于小型使用场景来说，基于关系型数据库的操作尽管理论上效率一般，但胜在轻巧简便。

### 快速开始

* 使用ddz.list查询是否已经有可用房间。如果没有的话，赶紧呼朋唤友准备开始吧
* 要加入准备中的房间，使用ddz.join ID，如ddz.join 1
* 要创建房间，使用ddz.create
* 当人满后，房主使用ddz.start开始游戏
* 私聊机器人，使用ddz.info获取手牌等信息
* 使用ddz.play出牌，输入ddz.play 过 则可以直接跳过本轮
* 使用ddz.quit退出当前房间。请注意，房主退出房间会导致本房间直接解散。游戏中有人退出则回到准备状态

### 模式：经典斗地主

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

### 模式：魔改斗地主

在经典斗地主的基础上扩充而来，在出牌阶段随机触发事件。使用ddz.create -m 1以启用。 事件如下：

* 以小博大-最大的手牌变为2
* 昙花一现-随机让一位玩家明牌
* 散财童子-当手牌数大于1时，随机丢掉一张手牌
* 阳光普照-每人获得一张牌

### 更新日志

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

* 为魔改斗地主模式增加技能：阳光普照

#### 更早

* 懒得写了

