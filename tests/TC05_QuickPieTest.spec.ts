// import { test, expect } from '@playwright/test';
// import { QuickPie } from '../Pages/QuickPiePage';
// import {faker} from '@faker-js/faker';



// const name = faker.person.firstName();
// const country = ['ooty', 'coimbatore', 'chennai', 'bangalore', 'mysore'];
// const name2 = faker.person.firstName();

// function getRandomCountry() {
//   const randomIndex = Math.floor(Math.random() * country.length);
//   return country[randomIndex];
// }


// test.beforeEach(async ({page}) =>{
//   await page.goto('/hydrant-quick-pi#property-info');
// });
// test.use({
//   geolocation: { latitude: 12.9716, longitude: 77.5946 },
//   permissions: ['geolocation'],
// });


// test('Adding quickPie', async ({page}) =>{
//     const qp = new QuickPie(page);

//     await qp.createQP(name, getRandomCountry());
// })


// test("Search for an quickPie", async ({ page }) => {
//   const qp = new QuickPie(page);

//   await qp.searchByQPName(name);
//   await qp.expectAllRowsContainQPName(name);

// });

// test('Edit functionality', async ({page}) =>{
//   const qp = new QuickPie(page);
//   await qp.searchByQPName(name);
//   await qp.editFunction(name2);
//   await qp.searchByQPName(name2);
//   await qp.expectAllRowsContainQPName(name);
// })

// test('Delete functionality', async ({page}) =>{
//   const qp = new QuickPie(page);
//   await qp.searchByQPName(name2);
//   await qp.deleteFunction();
// })
