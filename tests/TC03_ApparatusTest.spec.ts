// import { test, expect } from '@playwright/test';
// import { Apparatus } from '../Pages/Apparatus.ts';
// import { faker } from '@faker-js/faker/locale/zu_ZA';


// test.beforeEach(async ({page}) =>{
//   await page.goto('/apparatus#all');

// });

// const name = faker.person.firstName();
// const country = ['ooty', 'coimbatore', 'chennai', 'bangalore', 'mysore'];
// const name2 = faker.person.firstName();
// const apparatusNo = faker.person.firstName();


// function getRandomCountry() {
//   const randomIndex = Math.floor(Math.random() * country.length);
//   return country[randomIndex];
// }


// test("Add Aparatus Test", async ({page}) =>{
//     //To test the add apparatus functionality
//     const apparatus = new Apparatus(page);

//     await apparatus.addApparatus(name,apparatusNo);
//     await apparatus.searchByApparatusName(name);
    
//     await apparatus.expectAllRowsContainApparatusName(name);
// });


// test("Search for an apparatus", async ({ page }) => {
//   const apparatus = new Apparatus(page);

//   const retrievedApparatusName = await apparatus.getFirstApparatusName('2');
//   await apparatus.searchByApparatusName(retrievedApparatusName);
//   await apparatus.expectAllRowsContainApparatusName(retrievedApparatusName);
// });








// test("Manage Apparatus - Edit Apparatus and validate duplicate + update", async ({ page }) => {
//   const apparatus = new Apparatus(page);


//   // Click on the edit button
//   await apparatus.clickEditByApparatusNo(apparatusNo);

//   // Change the name with another name
//   await apparatus.updateApparatusName(name2);

//   // Save
//   await apparatus.clickNextButton();
//   await apparatus.saveEditedApparatus();


//   // Ensure it is updated
//   await apparatus.expectApparatusNameUpdated(apparatusNo, name2);
// });





// test('filter functionality ' , async ({page}) =>{
//   const apparatus = new Apparatus(page);
  
//   await apparatus.FilterFunction();
//   await apparatus.assertFilter();
// });
