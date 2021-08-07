/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// create function to generate studentCard
// param: one student's info
// access all constants needed for studentCard
// create student card
// return card

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
                  <h3>${firstName, lastName}</h3>
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



// Call functions
showPage(data, 1);