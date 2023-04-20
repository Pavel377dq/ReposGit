
const USER_PER_PAGE = 5;
const URL = "https://api.github.com/search/repositories?q=";

export class API {
  constructor() {}

  // Загрузка пользователей
  async loadRepos(searchValue) {
    return await fetch(`${URL}${searchValue}&per_page=${USER_PER_PAGE}`);
  }
}
