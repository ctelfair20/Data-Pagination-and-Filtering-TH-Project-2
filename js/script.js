/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
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

// headerDiv('input', (e) => {
//    // iterate over data
//    // access the first and last name values
//    //
// })

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
// function showPage 
function showPage(list, page) { 
   // takes in a list of student data and a page number
   // set index start
   let startIndex = (page * 9) - 9;
   // set index end
   let endIndex = page * 9;
   // set ul to the ul element with the class student-list
   const studentList = document.querySelector('ul.student-list');
   // use innerHTML to set student-list to ''
   studentList.innerHTML = '';
      // loop over list param 
   for (let i = 0; i < list.length; i++) {
      // if the current index (i) is greater than or equal to the start index variable and less than the end index variable. 
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
   // Remove the active class from any other pagination button.
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
            // Add the active class to the pagination button that was just clicked.
            // Call the showPage function passing the list parameter and the page number to display as arguments.
            }
         }
      } 
   }
});