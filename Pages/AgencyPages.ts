import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.ts';   
import { randomReadableName } from '../Utils/RandomNameGenerators.ts';
import { time } from 'node:console';
import { formatWithOptions } from 'node:util';

export class AgencyPages extends BasePage {
  
  
//Locator
public AgencyIcon = this.page.locator("//span[text()='local_police']");
public StatusDD= this.page.locator("//span[text()='Active']");
public LocationField= this.page.locator("//input[@placeholder='Enter area, street name...']");
public AddDepartmentBtn = this.page.locator("//button[@type='submit']//span[text()='Add Department']");
public DepartmentCard = this.page.locator("//div[@class='_title_1q3ks_111']");
public EditIcon = this.page.locator("//span[text()='edit_square']");
public ToggleON = this.page.locator("//button[@role='switch'][@aria-checked='true']");
public ToggleOFF = this.page.locator("//button[@role='switch'][@aria-checked='false']");
public Formwrapper= this.page.locator("//div[@class='_formWrapper_qstqo_286']");
public LocationIcon= this.page.locator("//span[text()='my_location']");
public searchbar = this.page.locator("//input[@placeholder='Search']");
public ToggleBtn = this.page.locator("//div[@class='ant-switch-handle']");


async CreateDepartment(){
    const departmentName = randomReadableName();
    await this.AgencyIcon.click();
    await this.page.getByRole('button', { name: 'Department' }).click();
    await this.page.getByRole('heading', { name: 'New Department' }).isVisible();
    await this.page.getByRole('textbox', { name: 'Department Name' }).fill(departmentName);
    await expect(this.page.getByText('Active')).toBeVisible();
    await this.page.getByRole('heading', { name: 'Location' }).isVisible();
    await this.LocationField.fill('New York, NY, USA');
    await this.LocationIcon.click();
    await this.page.getByRole('button', { name: 'Confirm Location' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator('form').evaluate(
  (form) => (form as HTMLFormElement).requestSubmit());
   await this.page.waitForTimeout(5000);
    return departmentName;
}
async AssertDepartmentCreated(departmentName:string){
    await this.searchbar.click();
    await this.searchbar.fill('');
    await this.searchbar.type(departmentName, { delay: 100 });
    await this.searchbar.press('Enter');
    await this.page.getByRole('row', { name: departmentName }).isVisible();   
}
async ViewCreatedDepartment(departmentName:string){   
    await this.page.waitForTimeout(5000);
    await this.DepartmentCard.click();
    await expect(this.page.getByText(departmentName)).toBeVisible();
    await expect(this.page.getByText('230 Broadway, New York, NY 10007, USA')).toBeVisible();
    await expect(this.page.getByText('Active')).toBeVisible();
}

async EditDepartment(departmentName: string) {
  await this.EditIcon.click();
  await expect(this.page.getByRole('heading', { name: 'Edit Department' })).toBeVisible();
  const nameInput = this.page.getByRole('textbox', { name: 'Department Name' });
  await nameInput.click();
  await nameInput.press('Control+A');
  await nameInput.press('Backspace');
  await nameInput.fill(departmentName + departmentName);
  await this.page.getByRole('button', { name: 'Save Changes' }).click();
}
async AssertEditedDepartment(editedDepartmentName: string){  
  await expect(this.searchbar).toBeVisible();
  await this.searchbar.click();
  await this.searchbar.fill(editedDepartmentName);
  await this.searchbar.press('Enter');
  await expect(this.page.getByText(editedDepartmentName, { exact: true })).toBeVisible();
  }
async EnableAndDisableDepartment(departmentName:string){
    //Enable
    const card = this.page.locator(`div:has-text("${departmentName}")`);
    const toggle = card.getByRole('switch');
    await expect(toggle).toBeVisible();
    await toggle.click({ force: true });
    await this.DisableDepartmentModal();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    // Disable
    await expect(toggle).toBeVisible();
    await toggle.click({ force: true });
    await this.EnableDepartmentModal();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
}
    async DisableDepartmentModal(){
     //await expect(this.page.getByText('Disable Department')).toBeVisible();
     await expect(
  this.page.getByText(/disable department/i)
).toBeVisible();
     //await expect(this.page.getByText('All the users of this Department will no longer be able to access the app. Are you sure you want to proceed?')).toBeVisible();
     await expect(this.page.getByRole('button', { name: 'No, Cancel' })).toBeVisible();
     await expect(this.page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    }
    async EnableDepartmentModal(){
     //await expect(this.page.getByText('Enable Department')).toBeVisible();
     //await expect(this.page.getByText('All the users of this Department will be able to access the application. Are you sure you want to proceed?')).toBeVisible();  
     await expect(this.page.getByRole('button', { name: 'No, Cancel' })).toBeVisible();
     await expect(this.page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    }
}
