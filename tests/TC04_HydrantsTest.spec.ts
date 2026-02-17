import { test, expect } from '@playwright/test';
import { HydrantsPage } from '../Pages/HydrantPage'; 

test.beforeEach(async ({page}) =>{
  await page.goto('/hydrant-quick-pi');

});
test.use({
  geolocation: { latitude: 12.9716, longitude: 77.5946 },
  permissions: ['geolocation'],
});

let id : string;


test("Adding a hydrant properly", async({page}) =>{
  
  const hyd = new HydrantsPage(page);

  id = await hyd.createQP('coonoor');
})


test('Searching a hydrant', async ({page}) =>{
  
  const hyd = new HydrantsPage(page);
  
  await hyd.searchByQPName(id);

  await hyd.expectAllRowsContainHydName(id);
})


test('edit Hydrant', async ({page}) =>{
  const hyd = new HydrantsPage(page);

  await hyd.editFunction('ooty', id);
})


test('Delete Hydrant', async ({page}) =>{

  const hyd = new HydrantsPage(page);

  await hyd.deleteHydrant(id);
})