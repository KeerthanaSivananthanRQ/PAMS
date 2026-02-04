import { test, expect } from '@playwright/test';
import { AgencyPages } from '../Pages/AgencyPages'; 



test('Create,View,Edit ,Enable and Disable Agency', async ({ page }) => {
  const agency = new AgencyPages(page);

await page.goto('/dashboard'); // already logged in
const departmentName = await agency.CreateDepartment();
const editedDepartmentName = departmentName + departmentName;

await agency.AssertDepartmentCreated(departmentName);
await agency.ViewCreatedDepartment(departmentName);

await agency.EditDepartment(departmentName);
await agency.AssertEditedDepartment(editedDepartmentName);

await agency.EnableAndDisableDepartment(editedDepartmentName);
});