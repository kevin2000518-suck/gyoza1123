// 倉庫盤點規則：打烊後每樣菜的盤點狀態、明天建議備幾份
// 對應規則書：「倉庫盤點」；盤點結果顯示在「倉庫盤點」頁
// 驗收：npm run check 的「倉庫盤點規則」

import { INVENTORY } from '../config.js';

// 輸入（都是這樣菜今天的數字）：
//   stocked  早上備了幾份
//   sold     賣出幾份
//   waste    打烊報廢幾份
//   missed   賣完之後，還有幾位客人想買卻買不到
// 回傳：'ok'（正常）| 'out'（缺貨）| 'over'（報廢過多）
export function checkDish({ stocked, sold, waste, missed }) {
  // 規則書表格：由上往下看
  if (missed > 0) {
    return 'out'; // 賣完後有人沒買到 → 缺貨
  }
  if (waste >= INVENTORY.wasteAlert) {
    return 'over'; // 報廢 5 份以上 → 報廢過多
  }
  return 'ok'; // 其他情況（剛好賣完、沒有人沒買到，也算正常）
}

// 輸入：今天賣出幾份、賣完後沒買到的人數
// 回傳：明天建議備幾份
export function suggestQty({ sold, missed }) {
  return sold + missed; // 今天真正想買的人數
}
