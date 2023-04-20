
export class Search {
   constructor(api, view) {
     this.api = api;
     this.view = view;
     this.view.searchInput.addEventListener(
       "keyup",
       this.debounce(this.searchUsers.bind(this), 1000)
     );
     this.view.searchInput.addEventListener(
       "focus",
       this.searchUsers.bind(this)
     );
     this.target = document.querySelector(".autocomplete");
     this.addedRepos = null;
     this.promise = new Promise((resolve) => {
       this.target.addEventListener("click", this.addRepo.bind(this, resolve)); //Здесь привязываю контекст тк хочу использовать функуию CreateElement из объекта view
     }).then((addedRepos) => {
       addedRepos.addEventListener("click", function (evt) {
         if (evt.target.tagName == "BUTTON") evt.target.parentElement.remove();
       });
     });
   }
 
   addRepo(resolve, evt) {
     if (
       evt.target.tagName !== "INPUT" &&
       evt.target.tagName !== "UL" &&
       evt.target.parentElement.tagName !== "UL"
     ) {
       const addedNode = evt.target.parentElement.cloneNode(true);
       this.addedRepos = document.querySelector(".addedRepos");
       addedNode.childNodes[2].classList.remove("owner");
       addedNode.childNodes[4].classList.remove("stars");
       const btn = this.view.createElement("button", "btn-remove");
       addedNode.classList.remove("searchingRepo");
       addedNode.classList.add("addedRepo");
       addedNode.append(btn);
       this.addedRepos.append(addedNode);
       const searchInput = document.querySelector(".search-input");
       searchInput.value = "";
       searchInput.focus();
       resolve(this.addedRepos);
     }
   }
 
   // Выполняем поиск пользователей при каждом вводе символа в поисковую строку
   searchUsers() {
     if (this.view.searchInput.value) {
       this.api
         .loadRepos(this.view.searchInput.value)
         .then((response) => this.updateRepos(response));
     } else {
       // console.log("else");
       this.view.clearRepos();
     }
   }
 
   // Обновляем текущее состояние пользователей
   updateRepos(response, isUpdate = false) {
     let repos;
     if (response.ok) {
       response.json().then((res) => {
         if (res.items) {
           repos = res.items;
           repos.forEach((repo) => this.view.createRepo(repo));
         }
       });
     } else {
       console.log("Error 1" + response.status);
     }
   }
 
   // Задержка ввода данных для отправки запроса
   debounce(func, wait, immediate) {
     let timeout;
     return function () {
       const context = this,
         args = arguments;
       const later = function () {
         timeout = null;
         if (!immediate) func.apply(context, args);
       };
       const callNow = immediate && !timeout;
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
       if (callNow) func.apply(context, args);
     };
   }
 }
 