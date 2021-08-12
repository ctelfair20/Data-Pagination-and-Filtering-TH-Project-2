/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// created search bar
const headerDiv = document.querySelector('.header');
headerDiv.innerHTML = '';
const H2Element = `<h2>Students</h2>`;
const searchBar = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   
headerDiv.insertAdjacentHTML('beforeend', H2Element);
headerDiv.insertAdjacentHTML('beforeend', searchBar);

// search bar functionality mostly works
headerDiv.addEventListener('keyup', (e) => {
   // create a collection of all the h3 tags...gives me all  names
   const fullNamesList = document.getElementsByTagName('h3'); 
   const inputVal = e.target.value.toUpperCase();
   // iterate over collection...one full name each iteration
   for (let i = 0; i < fullNamesList.length; i++) {
      fullNamesList[i].className = '';
      // accessing each elements text.content...whats in the h3
      const name = fullNamesList[i].textContent.toUpperCase();
      // access the h3's grandparent...li.class='student-item-cf'
      const fullNamesGrandParentLi = fullNamesList[i].parentNode.parentNode;
      // compare the target's input value with the textContent
      // if the input value !== a substring of current h3
      if (!name.includes(inputVal)) {
         // set grandparent's display value to none 
         fullNamesGrandParentLi.style.display = 'none';
      } else if (inputVal === '') {
         fullNamesGrandParentLi.style.display = 'initial';
      }
   }
});


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

let studentListItems = [];

function showPage(list, page) { 
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   
   for (let i = 0; i < list.length; i++) {
      const firstName = list[i].name.first;
      const lastName = list[i].name.last;
      const email = list[i].email;
      const date = list[i].registered.date;
      const largePicture = list[i].picture.large;
      const studentCard = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${largePicture} alt="Profile Picture">
               <h3>${firstName} ${lastName}</h3>
               <span class="email">${email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${date}</span>
            </div>
         </li>
      `
      studentListItems.push(studentCard);

      if (i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML('beforeend', studentCard);
      }
   }
}

headerDiv.addEventListener('input', (e) => {
   
   const fullNamesList = document.getElementsByTagName('h3'); 
   const inputVal = e.target.value.toUpperCase();
   
   for (let i = 0; i < fullNamesList.length; i++) {
      fullNamesList[i].className = '';
      const name = fullNamesList[i].textContent.toUpperCase();
      const fullNamesGrandParentLi = fullNamesList[i].parentNode.parentNode;
      if (!name.includes(inputVal)) {
         fullNamesGrandParentLi.style.display = 'none';
      } else if (inputVal === '') {
        fullNamesGrandParentLi.style.display = 'initial';
      }
   }
});

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const linkList = document.querySelector('ul.link-list');

function addPagination(list) {
   const pagesNeeded = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   for (let i = 1; i <= pagesNeeded; i++ ) {
      const pageButton = `<li><button type="button">${i}</button></li>`;
      linkList.insertAdjacentHTML('beforeend', pageButton);
   }
}

// Call functions
showPage(data, 1);
addPagination(data);



const linkListLiButton = linkList.firstElementChild.firstElementChild;
linkListLiButton.className = 'active';

linkList.addEventListener('click', (e) => {

   const button = e.target;
   const linkListLiChildren = linkList.children;

   if (button.tagName === 'BUTTON') {
      if (button.className !== 'active') {
         for (let i = 0; i < linkListLiChildren.length; i++) {
            const liButton = linkListLiChildren[i].firstElementChild;
            if (liButton.className === 'active') {
               liButton.className = '';
               button.className = 'active';
               const pageNumber = button.textContent;
               showPage(data, pageNumber);
            }
         }
      } 
   }
});