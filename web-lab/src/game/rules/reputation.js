// 口碑規則：打烊時星等怎麼變
// 對應規則書：「來客數與口碑星等」
// 驗收：npm run check 的「口碑規則」

import { MIN_STARS, MAX_STARS } from '../config.js';

// 輸入：
//   stars        今天開店時的星等
//   satisfied    滿意的客人數
//   neutral      普通的客人數
//   unsatisfied  不滿的客人數
// 回傳：打烊後的新星等
export function updateStars({ stars, satisfied, neutral, unsatisfied }) {
  const total = satisfied + neutral + unsatisfied;
  if (total === 0) {
    return stars; // 沒有任何客人進店，星等不變
  }

  // 比例用整數比較（人數 × 100 對 門檻 % × 進店人數），避免小數誤差
  const satAtLeast = (pct) => satisfied * 100 >= pct * total;
  const satBelow = (pct) => satisfied * 100 < pct * total;
  const unsatAtLeast = (pct) => unsatisfied * 100 >= pct * total;

  // 規則書表格：由上往下看，符合就停
  let change = 0;
  if (satAtLeast(75)) {
    change = 1;
  } else if (satAtLeast(60)) {
    change = 0.5;
  } else if (satBelow(15) || unsatAtLeast(40)) {
    change = -1;
  } else if (satBelow(30) || unsatAtLeast(25)) {
    change = -0.5;
  }

  return Math.min(MAX_STARS, Math.max(MIN_STARS, stars + change));
}
