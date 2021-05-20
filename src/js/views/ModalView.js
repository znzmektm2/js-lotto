import View from "./View.js";
import { $ } from "../utils/DOM.js";
import {
  getWinningNumberArr,
  getWinningResult,
  insertProfitResult,
} from "../utils/utils.js";
import { PRIZE_MONEY } from "./../utils/constants.js";

export default class ModalView extends View {
  constructor($element, result) {
    super($element);
    this.result = result;
    this.closeModal();
    this.profit = $("#profit");
    this.tbody = $("#modalWrap tbody");
  }

  closeModal() {
    $(".modal-close").addEventListener("click", () => {
      this.hide();
    });
  }

  reset() {
    this.hide();
    setTimeout(() => {
      this.tbody.innerText = "";
      this.profit.innerText = "0";
    }, 250);
  }

  renderWinningResult($winningInputs, lottos, price) {
    const winningNumsArr = getWinningNumberArr($winningInputs);
    const winningResultArr = getWinningResult(winningNumsArr, lottos);
    let count = "0";
    let tbody = "";

    PRIZE_MONEY.forEach((prizeRank) => {
      winningResultArr.forEach((winningRank) => {
        if (Object.keys(prizeRank).join() === Object.keys(winningRank).join()) {
          count = winningRank[Object.keys(winningRank).join()];
        }
      });

      tbody += `<tr class="text-center">
                    <td class="p-3">${
                      Object.keys(prizeRank).join() === "BONUS_BALL"
                        ? "5개 + 보너스볼"
                        : Object.keys(prizeRank) + "개"
                    }</td>
                    <td class="p-3">${prizeRank[Object.keys(prizeRank)]}</td>
                    <td class="p-3">${count}개</td>
                    </tr>`;
    });

    this.tbody.innerHTML = tbody;
    this.profit.innerText = insertProfitResult(winningResultArr, price);
  }
}
