import { test, expect } from '@playwright/test';
import { Hydrants } from '../Pages/HydrantPage';
import {faker} from '@faker-js/faker';

test.beforeEach(async ({page}) =>{
  await page.goto('/hydrant-quick-pi');

});
test.use({
  geolocation: { latitude: 12.9716, longitude: 77.5946 },
  permissions: ['geolocation'],
});


const name = faker.person.firstName();
const country = ['ooty', 'coimbatore', 'chennai', 'bangalore', 'mysore'];
const name2 = faker.person.firstName();

function getRandomCountry() {
  const randomIndex = Math.floor(Math.random() * country.length);
  return country[randomIndex];
}


// test('adding hydrants', async ({page}) =>{
//     const hydrants = new Hydrants(page);
//     await hydrants.createHydrant(getRandomCountry());
// });



test("Search for an hydrant", async ({ page }) => {
  const hydrant = new Hydrants(page);

  const retrievedHydrantName = await hydrant.getFirstHydrantName('1');
  await hydrant.searchByHydrantName(retrievedHydrantName);
  await page.pause();
  await hydrant.expectAllRowsContainHydrantsName(retrievedHydrantName);
});

// test('Edit functionality', async ({page}) =>{
//   const hydrant = new Hydrants(page);
//   await hydrant.searchByHydrantName('HYD-020');
//   await hydrant.editFunction();
//   await page.pause();
// })

// test('Delete functionality', async ({page}) =>{
//   const hydrant = new Hydrants(page);
//   await hydrant.searchByHydrantName('HYD-020');
//   await hydrant.deleteFunction();
//   await page.pause();
// })

