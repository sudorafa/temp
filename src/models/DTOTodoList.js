import { normalizeForUrl } from "../api/urlHelpers/normalizeForUrl"
export default class DTOTodoList {
  static create(name) {
    return { name: name, permalink: '/list/' + normalizeForUrl(name), itens: [] }
  }

  static createItem(name, order) {
    return { item: name, order: order }
  }
}