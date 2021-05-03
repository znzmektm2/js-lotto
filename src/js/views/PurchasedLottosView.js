import { $ } from "../utils/DOM.js";
import View from "./View.js";
import LottoModel from "./../models/LottoModel.js";

export default class PurchasedLottosView extends View {
  constructor($element) {
    console.log("PurchasedLottosView constructor");
    super($element);
  }

  reset() {
    $("#switchInput").checked = false;
    $(".lottoNumberLists").classList.remove("showLottoNumbers");
    this.hide();
  }

  update(lottos) {
    const lottoLists = lottos
      ?.map(
        (lotto) =>
          `<li>
            <span class="icon">🎟️</span>
            <span class="lottoNumbers"
              ><span>${[...lotto.values()].join(", ")}</span></span
            >
          </li>`
      )
      .join("");

    $("#total").innerText = lottos.length;
    $(".lottoNumberLists").innerHTML = lottoLists;
  }
}
