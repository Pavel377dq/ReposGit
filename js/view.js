export class VIEW {
   constructor(api) {
     this.api = api;
 
     this.app = document.querySelector(".autocomplete");
 
     // Заголовок
     this.title = this.createElement("h1", "title");
     this.title.textContent = "Git Repos";
 
     // Основной блок
     this.mainContent = this.createElement("div", "main");
 
     // Список пользователей
     this.reposListWrapper = this.createElement("div", "repos-wrapper");
     this.reposList = this.createElement("ul", "repos");
     this.reposListWrapper.append(this.reposList);
 
     // Поле поиска
     this.searchLine = this.createElement("div", "search-line");
     this.searchInput = this.createElement("input", "search-input");
     this.searchLine.append(this.searchInput);
 
     //Добавление всех блоков в приложение
     this.app.append(this.title);
     this.app.append(this.searchLine);
     this.mainContent.append(this.reposListWrapper);
 
     this.app.append(this.mainContent);
   }
 
   clearRepos() {
     this.reposList.innerHTML = "";
   }
 
   // Функция для создания элемента
   createElement(elementName, className) {
     const element = document.createElement(elementName);
     if (className) {
       element.classList.add(className);
     }
     return element;
   }
 
   // Создаем каждого найденного пользователя
   createRepo(repoData) {
     const repoInfo = this.createElement("li", "searchingRepo");
     repoInfo.classList.add("searchingRepo:hover");
     //user.addEventListener('click', () => this.showUser(userData));//поменять на добавление юзера в список
     repoInfo.innerHTML = `<span class="name"> name ${repoData.name}</span>  <span class="owner"> owner ${repoData.owner.login}</span> <span class="stars"> stars  ${repoData.stargazers_count}</span>`;
 
     this.reposList.append(repoInfo);
   }
 }
 