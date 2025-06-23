"use strict";

export default class Templates {
  #name;

  static MODERNO = new Templates('moderno');
  static COLORIDO = new Templates('colorido');
  static CLASSICO = new Templates('classico');

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
