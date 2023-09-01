// 排序
export function sortCards(arr) {
  // 排大小
  arr.sort((a, b) => b.cardValue - a.cardValue);
  for (let i = 0; i < 4; i++) {
    for (const key in arr) {
      if (Number(key) != arr.length - 1) {
        if (arr[key].cardName == arr[+key + 1].cardName) {
          [arr[key], arr[+key + 1]] = [arr[+key + 1], arr[key]];
        }
      }
    }
  }
}

export const genCards = () => {
  return [
    {cardValue: 14, cardName: '小王', cardColor: 'A'},
    {cardValue: 15, cardName: '大王', cardColor: 'A'},
    ...Array.from({length: 13 * 4}, (_, index) => {
      const cardValue = Math.ceil((index + 1) / 4);
      let cardName = String(cardValue + 2);
      let cardColor;

      if (cardName == '11') {
        cardName = 'J';
      } else if (cardName == '12') {
        cardName = 'Q';
      } else if (cardName == '13') {
        cardName = 'K';
      } else if (cardName == '14') {
        cardName = 'A';
      } else if (cardName == '15') {
        cardName = '2';
      }

      if (index % 4 === 0) {
        cardColor = 'A';
      } else if (index % 4 === 1) {
        cardColor = 'B';
      } else if (index % 4 === 2) {
        cardColor = 'C';
      } else if (index % 4 === 3) {
        cardColor = 'D';
      }

      return {cardValue, cardName, cardColor};
    })
  ];
}
// 初始化牌局
export const initCards = () => {
  const originCardHeap = genCards();

  function shuffleCards(arr) {
    arr = JSON.parse(JSON.stringify(arr));
    for (const key in arr) {
      let index = parseInt(String(Math.random() * arr.length));
      [arr[key], arr[index]] = [arr[index], arr[key]];
    }
    // arr.reverse();
    return arr;
  }

  let newAll = shuffleCards(originCardHeap);

  function dealCards(arr) {
    let card1 = arr.slice(0, 17);
    let card2 = arr.slice(17, 34);
    let card3 = arr.slice(34, 51);
    let holeCards = arr.slice(51, 54);
    return {card1, card2, card3, holeCards};
  }

  let {card1, card2, card3, holeCards} = dealCards(newAll);

  sortCards(card1)
  sortCards(card2)
  sortCards(card3)
  sortCards(holeCards)

  return {
    card1, card2, card3, holeCards
  }
}


export interface Card {
  cardValue: number;
  cardName: string;
  cardColor?: string
}

export const parseArrToCards = (cardArr: Array<string>) => {
  return cardArr.map(o => {
    let cardValue;
    if (o == '大王') {
      cardValue = 15;
    } else if (o == '小王') {
      cardValue = 14;
    } else if (o == '2') {
      cardValue = 13
    } else if (o == 'A') {
      cardValue = 12
    } else if (o == 'K') {
      cardValue = 11
    } else if (o == 'Q') {
      cardValue = 10
    } else if (o == 'J') {
      cardValue = 9
    } else cardValue = Number(o) - 2;
    return {cardValue, cardName: o}
  })
}

enum CardType {
  Single = 1, // 单牌
  Pair = 2, // 对子（一对相同点数的牌）
  ThreeOfAKind = 3, // 三张相同点数的牌
  ThreeWithSingle = 4, // 三带一（三张相同点数的牌 + 单牌）
  ThreeWithPair = 5, // 三带一对（三张相同点数的牌 + 一对）
  Straight = 6, // 顺子（连续的五张或更多点数相邻的牌）
  DoubleStraight = 7, // 连对（连续的两对或更多对点数相邻的牌）
  TripleStraight = 8, // 飞机不带翅膀（连续的两个或更多个三张相同点数的牌）
  TripleStraightWithSingle = 9, // 飞机带单牌（连续的两个或更多个三张相同点数的牌 + 相同数量的单牌）
  TripleStraightWithPair = 10, // 飞机带对子（连续的两个或更多个三张相同点数的牌 + 相同数量的对子）
  Bomb = 11, // 炸弹（四张点数相同的牌）
  JokerBomb = 12, // 王炸（即大王+小王）
  Invalid = 13, // 无效牌型（不符合任何有效牌型规则）
}

export function getCardType(cards: Card[]): CardType {
  const length = cards.length;

  if (length === 1) {
    return CardType.Single;
  } else if (length === 2 && isJokerBomb(cards)) {
    return CardType.JokerBomb;
  } else if (length === 2 && isPair(cards)) {
    return CardType.Pair;
  } else if (length === 4 && isBomb(cards)) {
    return CardType.Bomb;
  } else if (length === 3) {
    return isThreeOfAKind(cards) ? CardType.ThreeOfAKind : CardType.Invalid;
  } else if (length === 4) {
    if (isThreeWithSingle(cards)) {
      return CardType.ThreeWithSingle;
    } else {
      return CardType.Invalid;
    }
  } else if (length >= 5) {
    if (isStraight(cards)) {
      return CardType.Straight;
    } else if (isThreeWithPair(cards)) {
      return CardType.ThreeWithPair;
    } else if (isDoubleStraight(cards)) {
      return CardType.DoubleStraight;
    } else if (isTripleStraight(cards)) {
      return CardType.TripleStraight;
    } else if (isTripleStraightWithSingle(cards)) {
      return CardType.TripleStraightWithSingle;
    } else if (isTripleStraightWithPair(cards)) {
      return CardType.TripleStraightWithPair;
    } else {
      return CardType.Invalid;
    }
  } else {
    return CardType.Invalid;
  }
}

function isJokerBomb(cards: Card[]): boolean {
  return cards.every(card => card.cardValue === 14 || card.cardValue === 15);
}

function isBomb(cards: Card[]): boolean {
  return cards.every(card => card.cardValue === cards[0].cardValue);
}

function isThreeOfAKind(cards: Card[]): boolean {
  return cards.every(card => card.cardValue === cards[0].cardValue);
}

function isPair(cards: Card[]): boolean {
  return cards.every(card => card.cardValue === cards[0].cardValue);
}

function isThreeWithSingle(cards: Card[]): boolean {
  const cardCountMap = countCards(cards);
  const values = Object.values(cardCountMap);

  return (
    values.length === 2 &&
    (values[0] === 3 || values[1] === 3) &&
    cards.length === 4
  );
}

function isThreeWithPair(cards: Card[]): boolean {
  const cardCountMap = countCards(cards);
  const values = Object.values(cardCountMap);

  return (
    values.length === 2 &&
    (values[0] === 3 || values[1] === 3) &&
    cards.length === 5
  );
}

function isStraight(cards: Card[]): boolean {
  const sortedCards = cards.sort((a, b) => a.cardValue - b.cardValue);

  for (let i = 0; i < sortedCards.length - 1; i++) {
    if (sortedCards[i].cardValue + 1 !== sortedCards[i + 1].cardValue) {
      return false;
    }
  }

  return true;
}

function isDoubleStraight(cards: Card[]): boolean {
  if (cards.length % 2 !== 0) {
    return false;
  }

  const sortedCards = cards.sort((a, b) => a.cardValue - b.cardValue);

  for (let i = 0; i < sortedCards.length; i += 2) {
    if (sortedCards[i].cardValue !== sortedCards[i + 1].cardValue) {
      return false;
    }
  }

  for (let i = 0; i < sortedCards.length - 2; i += 2) {
    if (sortedCards[i].cardValue + 1 !== sortedCards[i + 2].cardValue) {
      return false;
    }
  }

  return true;
}

function isTripleStraight(cards: Card[]): boolean {
  if (cards.length % 3 !== 0) {
    return false;
  }

  const cardCountMap = countCards(cards);
  const values = Object.values(cardCountMap);

  if (values.length !== 1 || values[0] !== 3) {
    return false;
  }

  const sortedCards = cards.sort((a, b) => a.cardValue - b.cardValue);

  for (let i = 0; i < sortedCards.length - 3; i += 3) {
    if (sortedCards[i].cardValue + 1 !== sortedCards[i + 3].cardValue) {
      return false;
    }
  }

  return true;
}

// 飞机带单牌（连续的两个或更多个三张相同点数的牌 + 相同数量的单牌）
// 如：3 3 3 4 4 4 7 9
function isTripleStraightWithSingle(cards: Card[]): boolean {
  const cardCountMap = countCards(cards);
  const tripleCards = [];
  const singleCards = [];

  for (const cardValue in cardCountMap) {
    if (cardCountMap[cardValue] === 3) {
      tripleCards.push(parseInt(cardValue));
    } else if (cardCountMap[cardValue] === 1) {
      singleCards.push(parseInt(cardValue));
    } else {
      return false; // 非法输入
    }
  }

  if (tripleCards.length !== singleCards.length) {
    return false; // 飞机牌和单牌数量不匹配
  }

  tripleCards.sort((a, b) => a - b);

  for (let i = 0; i < tripleCards.length - 1; i++) {
    if (tripleCards[i + 1] - tripleCards[i] !== 1) {
      return false; // 飞机牌不连续
    }
  }

  return true;
}

// 飞机带对子（连续的两个或更多个三张相同点数的牌 + 相同数量的对子）
function isTripleStraightWithPair(cards: Card[]): boolean {
  const cardCountMap = countCards(cards);
  const tripleCards = [];
  const pairCards = [];

  for (const cardValue in cardCountMap) {
    if (cardCountMap[cardValue] === 3) {
      tripleCards.push(parseInt(cardValue));
    } else if (cardCountMap[cardValue] === 2) {
      pairCards.push(parseInt(cardValue));
    } else {
      return false; // 非法输入
    }
  }

  if (tripleCards.length !== pairCards.length) {
    return false; // 飞机牌和对子数量不匹配
  }

  tripleCards.sort((a, b) => a - b);

  for (let i = 0; i < tripleCards.length - 1; i++) {
    if (tripleCards[i + 1] - tripleCards[i] !== 1) {
      return false; // 飞机牌不连续
    }
  }

  return true;
}

function countCards(cards: Card[]): { [cardValue: number]: number } {
  const cardCountMap: { [cardValue: number]: number } = {};

  for (const card of cards) {
    if (cardCountMap.hasOwnProperty(card.cardValue)) {
      cardCountMap[card.cardValue]++;
    } else {
      cardCountMap[card.cardValue] = 1;
    }
  }

  return cardCountMap;
}

// 分组统计同点数的牌
function classifyAndCount(arr: { cardValue: number; cardName: string }[]) {
  let countMap: { [key: number]: number } = {};
  let result: { [key: number]: number[] } = {};
  arr.forEach((item) => {
    if (countMap[item.cardValue]) {
      countMap[item.cardValue]++;
    } else {
      countMap[item.cardValue] = 1;
    }
  });
  for (let key in countMap) {
    if (result[countMap[key]]) {
      result[countMap[key]].push(parseInt(key));
    } else {
      result[countMap[key]] = [parseInt(key)];
    }
  }
  return result;
}

// 判断待出的牌能否管住上家的牌
export function canBeatPreviousCards(currentCards: Card[], previousCards: Card[]): boolean {
  const currentCardType = getCardType(currentCards);
  const previousCardType = getCardType(previousCards);

  if (currentCardType === CardType.Invalid) {
    return false;
  } else if (currentCardType === CardType.JokerBomb) {
    return true;
  } else if (currentCardType === CardType.Bomb && previousCardType !== CardType.JokerBomb) {
    return true;
  } else if (currentCardType === previousCardType && currentCards.length === previousCards.length) {
    const cardTypesToCheck = [
      CardType.ThreeWithSingle,
      CardType.ThreeWithPair,
      CardType.TripleStraightWithSingle,
      CardType.TripleStraightWithPair
    ];
    if (cardTypesToCheck.includes(currentCardType)) {
      const prevCardGroupCount = classifyAndCount(previousCards)
      const currentCardGroupCount = classifyAndCount(currentCards)
      // 提出两组牌的三连牌点数并查找最大值，然后比较
      const prevMaxTriple = Math.max(...prevCardGroupCount['3'])
      const currMaxTriple = Math.max(...currentCardGroupCount['3'])
      return currMaxTriple > prevMaxTriple;
    } else if (currentCards[0].cardValue > previousCards[0].cardValue) {
      return true;
    }
  }

  return false;
}
