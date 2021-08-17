/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
showPage function
- creates and appends a studentCard to the DOM and displays nine cards to the page
*/

function showPage(list, page) { 
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
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
         studentList.insertAdjacentHTML('beforeend', studentCard);
      }
   }
}

/*
addPagination function
- creats and appends pagination buttons to the botton of the page
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

showPage(data, 1);
addPagination(data);

const linkListLiButton = linkList.firstElementChild.firstElementChild;
linkListLiButton.className = 'active';

// functionality for pagination buttons
linkList.addEventListener('click', (e) => {

   const targetButton = e.target;
   const linkListLiChildren = linkList.children;

   if (targetButton.tagName === 'BUTTON') {
      if (targetButton.className !== 'active') {
         for (let i = 0; i < linkListLiChildren.length; i++) {
            const currentButton = linkListLiChildren[i].firstElementChild;
            if (currentButton.className === 'active') {
               currentButton.className = '';
               targetButton.className = 'active';
               const pageNumber = targetButton.textContent;
               showPage(data, pageNumber);
            }
         }
      } 
   }
});