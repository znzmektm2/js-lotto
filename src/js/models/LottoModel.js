import { lottoNumbers } from "./../utils/utils.js";
import { PRICE } from "./../utils/constants.js";

export default class LottoModel {
  constructor() {
    console.log("LottoModel constructor");
  }

  set lottos(inputPrice) {
    const lottoCount = inputPrice / PRICE.UNIT;

    this._lottos = Array.from({ length: lottoCount }, () => {
      return lottoNumbers();
    });
  }

  get lottos() {
    return this._lottos;
  }
}
