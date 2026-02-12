import { AgencyPages } from "../Pages/AgencyPages.ts";
import { Page, expect } from '@playwright/test';
import { BasePage } from "./BasePage.ts";
import { randomReadableName } from "../Utils/RandomNameGenerators.ts";

export class SettingsPages extends BasePage {
   
    public AgencyIcon = this.page.locator("//span[text()='local_police']");
    public settingsIcon = this.page.locator("//span[text()='settings']");
    public Counter = this.page.locator("//input[@name='counter']");
    public DefaultPosition = this.page.locator("//input[@name='positionItems.0.name']");
    public DefaultSeatCount = this.page.locator("//input[@name='positionItems.0.seatCount']");
    public ApparatusIcon = this.page.locator("//img[@alt='Truck']");
    public CounterIncrementButton = this.page.locator("(//span[text()='add'])[1]");
    public CounterDecrementButton = this.page.locator("(//span[text()='remove'])[1]");
    public prioritydropdown = this.page.locator("//span[@class='ant-select-arrow']");
    public priorityoption = this.page.locator("//div[text()= 'P4 - Silent for all']");
    public IncidentIcon = this.page.locator("//img[@alt='Bio Hazard']");
    public NewStatusField = this.page.locator("//input[@placeholder='New status']");
    public AddTrainingBtn = this.page.locator("//span[text()='Add Training']");
    public AddApparatustypebtn = this.page.locator("//span[text()='Apparatus Type']")
    public IncpositionOne= this.page.locator("(//span[text()='add'])[3]")
//Apparatus Types
async CreateApparatusType(){
    const ApparatusName = randomReadableName();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Apparatus Types' }).click();
    await this.page.locator('button span:text("Apparatus Type")').click();
    //await this.page.getByRole('button', { name: 'Apparatus Type' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('heading', { name: 'New Apparatus Type' }).isVisible();
    //await expect(this.page.getByText('Apparatus')).toBeVisible();
    //await this.page.getByRole('textbox', { name: 'apparatusTypeTitle' }).fill(ApparatusName);
    await this.page.getByPlaceholder('Apparatus name').fill(ApparatusName);
    await expect(this.Counter).toHaveValue('1');
    await expect(this.page.getByText('Riding Position')).toBeVisible();
    await expect(this.DefaultPosition).toHaveValue('Driver');
    await expect(this.DefaultSeatCount).toHaveValue('1');
    await this.page.locator('button:has-text("Add Position")').click();
     await this.page.waitForTimeout(5000);
    //await this.page.getByRole('textbox', { name: 'Position' }).isVisible();
    //await this.page.locator('button:has-text("Add Position")').click();
    await this.page
    .getByPlaceholder('Position')
    .first()
    .fill('Captain');
    //await this.page.getByRole('textbox', { name: 'Seat Count' }).fill('2');
    await this.IncpositionOne.click();
    await expect(this.Counter).toHaveValue('3');
    await this.CounterIncrementButton.click();
    await expect(this.page.getByText('Select Apparatus Icon')).toBeVisible();
    await this.ApparatusIcon.click();
    await this.page.locator('form').evaluate(
  (form) => (form as HTMLFormElement).requestSubmit());
    return ApparatusName;
}


async AssertApparatusTypeCreated(ApparatusName:string){
    await this.page.getByRole('row', { name: ApparatusName }).isVisible();
    await this.page.waitForTimeout(5000);
    //await expect(this.ApparatusIcon).toBeVisible();
    await expect(
  this.page.locator('div', { hasText: 'Positions pending' }).last()
).toBeVisible();
    //await expect(this.page.getByText('4')).toBeVisible();
    //await expect(this.page.getByText(' Seats')).toBeVisible();
}
 

async EditApparatusType(ApparatusName: string) {
   await this.page
  .locator('div._card_1wp7q_74', { hasText: ApparatusName })
  .locator('span._editIcon_1wp7q_121')
  .click();
  await expect(this.page.getByRole('heading', { name: 'Edit Apparatus' })).toBeVisible();
  const nameInput = this.page.getByRole('textbox', { name: 'Apparatus Name' });
  await nameInput.click();
  await nameInput.press('Control+A')
  await nameInput.press('Backspace');
  await nameInput.fill(ApparatusName + ApparatusName);
  await this.CounterDecrementButton.click();
  await this.page.getByRole('button', { name: 'Save Changes' }).click();
}
async AssertApparatusTypeEdited(ApparatusName:string){
    const editedApparatusName = ApparatusName + ApparatusName;
    await this.page.getByRole('row', { name: editedApparatusName }).isVisible();
    //await expect(this.ApparatusIcon).toBeVisible();
   await expect(
  this.page.locator('div', { hasText: 'Positions added' }).last()
).toBeVisible();
   // await expect(this.page.getByText('3')).toBeVisible();
   // await expect(this.page.getByText(' Seats')).toBeVisible();
}
async DeleteApparatusType(ApparatusName:string){
    const editedApparatusName = ApparatusName + ApparatusName;
  await this.page
  .locator('div._card_1wp7q_74')
  .filter({
    has: this.page.locator('div._title_1wp7q_97', { hasText: editedApparatusName }),
  })
  .locator('span._deleteIcon_1wp7q_130')
  .click();
  await this.page.getByRole('button', { name: 'Yes, Delete' }).click();   
}



//Incident Types
async CreateIncidentType(){
    const IncidentTypeName = randomReadableName();
    const Keyword = randomReadableName();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Incident Types' }).click();
    await this.page.locator('button span:text("Incident Type")').click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('heading', { name: 'New Incident Type' }).isVisible();
    await this.page.getByPlaceholder('Incident Type').fill(IncidentTypeName);
    await this.page.getByPlaceholder('Enter # to add new keyword').fill('#' + Keyword);
    await this.page.keyboard.press('Enter');
    await this.page
  .locator('.ant-select-selector')
  .click();
await this.page.keyboard.type('P1');
await this.page.keyboard.press('Enter');
await this.IncidentIcon.click();
   await this.page.locator('form').evaluate(
  (form) => (form as HTMLFormElement).requestSubmit());
    return IncidentTypeName;
}
async AssertIncidentTypeCreated(IncidentTypeName:string){
    await this.page.getByRole('row', { name: IncidentTypeName }).isVisible();
    await expect(this.IncidentIcon).toBeVisible();
}

async EditIncidentType(IncidentTypeName: string) {
    const editedIncidentTypeName = IncidentTypeName + IncidentTypeName;
     await this.page
  .locator('div._card_19s6u_74', { hasText: IncidentTypeName })
  .locator('span._editIcon_19s6u_115')
  .click();
    await expect(this.page.getByRole('heading', { name: 'Edit Incident' })).toBeVisible();
    await this.page.getByPlaceholder('Incident Type').clear();
    await this.page.getByPlaceholder('Incident Type').fill(editedIncidentTypeName);
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
}
async AssertIncidentTypeEdited(IncidentTypeName:string){
    const editedIncidentTypeName = IncidentTypeName + IncidentTypeName;
    await this.page.getByRole('row', { name: editedIncidentTypeName }).isVisible();
}
async DeleteIncidentType(editedIncidentTypeName:string){
  await this.page.locator('span._deleteIcon_19s6u_125').last().click();
   await this.page.waitForTimeout(3000);
  await this.page.getByRole('button', { name: 'Yes, Delete' }).click();   
}
 

//statuses
async AddStatus(){
    const StatusName = randomReadableName();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Statuses' }).click();
    await this.page
  .locator('div._statusHeader_gp9xx_65', { hasText: 'Department' })
  .locator('div._addBtn_gp9xx_42')
  .click();
  await this.NewStatusField.fill(StatusName);
  await this.page
  .locator('span.material-symbols-sharp', { hasText: 'check_circle' })
  .click();
    return StatusName;
}
async AssertStatusAdded(StatusName:string){
    await this.page.getByText(StatusName).isVisible(); 
    await this.AgencyIcon.click();
    await this.page.getByRole('button', { name: 'Department' }).click();
    await this.page.locator('div[name="statusId"]').click();
    await this.page.getByRole('option', { name: StatusName }).isVisible();
    const closeIcon = this.page.getByText('cancel');
await expect(closeIcon).toBeVisible();
await closeIcon.click();

}


async deletestatus(StatusName:string){
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Statuses' }).click();
    await this.page.locator('span._deleteIcon_gp9xx_95').first().click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();   
}
    
//Ranks
async AddRank(){
    const RankName = randomReadableName();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Ranks' }).click();
    await this.page.locator('button span:text("Rank")').click();
    await this.page.getByRole('heading', { name: 'New Rank' }).isVisible();
    await this.page.getByPlaceholder('Rank name').fill(RankName);
     await this.page.getByPlaceholder('Required training').fill('Test Rank Item 1');
    await this.page.locator('button:has-text("Add Training")').click();
    await this.page.locator('form').evaluate(
  (form) => (form as HTMLFormElement).requestSubmit());
    return RankName;
}
async AssertRankAdded(RankName:string){
    await this.page.getByRole('row', { name: RankName }).isVisible();   
    //await expect(
  //this.page.locator('p', { hasText: /^1\s+Required Trainings$/ })
//).toBeVisible();
}
async editRank(RankName:string){
    const editedRankName = RankName + RankName;
    await this.page
    .locator('div', { hasText: RankName })
    .locator('span', { hasText: 'edit_square' })
    .first()
    .click();
     await this.page.getByText('Edit Rank').isVisible(); 
     await this.page.getByPlaceholder('Rank name').clear();
      await this.page.getByPlaceholder('Rank name').fill(editedRankName);
      await this.page.getByRole('button', { name: 'Save Rank' }).click();
}
async AssertRankEdited(RankName:string){
    const editedRankName = RankName + RankName;
    await this.page.getByRole('row', { name: editedRankName }).isVisible();   
   // await expect(
  //this.page.locator('p', { hasText: /^1\s+Required Trainings$/ })
//).toBeVisible();    
}
async olddeleteRank(RankName:string){
    const editedRankName = RankName + RankName;
    await this.page
    .locator('div', { hasText: editedRankName })
    .locator('span', { hasText: 'delete' })
    .first()
    .click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();   
}
async deleteRank(RankName:string){
  
   await this.page.locator('span._deleteIcon_1xknt_76').last().click();
    await this.page.waitForTimeout(3000);
     await this.page
    .locator('span', { hasText: 'Yes, Delete' })
    .first()
    .click(); 
   
}

//Checklists
async CreateChecklist(){
    const ChecklistName = randomReadableName();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Checklists' }).click();
     await this.page.waitForTimeout(3000);
    await this.page.locator('button span:text("Checklist")').click();
    await this.page.getByRole('heading', { name: 'New Checklist' }).isVisible();
    await this.page.getByPlaceholder('Checklist name').fill(ChecklistName);
   await this.page.getByPlaceholder('Checklist items').fill('Test Checklist Item 1');
  await this.page.getByRole('button', { name: 'Add Items' }).click();
   //await this.page.getByPlaceholder('Checklist items').fill('Test Checklist Item 2');
    //await this.page.getByRole('button', { name: 'Add Items' }).click();
    await this.page.locator('form').evaluate(
    (form) => (form as HTMLFormElement).requestSubmit());
    return ChecklistName;
}

async AssertChecklistCreated(ChecklistName:string){
    await this.page.getByRole('row', { name: ChecklistName }).isVisible();   

}
async EditChecklist(ChecklistName: string) {
const editedChecklistName = ChecklistName + 'new';
  await this.page
    .locator('div._headerContainer_no81z_60', { hasText: ChecklistName })
    .locator('span._editIcon_no81z_74')
    .click();
  await expect(
    this.page.getByRole('heading', { name: 'Edit Checklist' })
  ).toBeVisible();
  const input = this.page.getByPlaceholder('Checklist name');
  await expect(input).toHaveValue(ChecklistName);
  await input.click();
  await input.press('Meta+A');
  await input.press('Backspace');
  await input.type(editedChecklistName, { delay: 50 });
  await expect(input).toHaveValue(editedChecklistName);
  await this.page.waitForTimeout(500);
  await this.page.locator('button[type="submit"]').click();
  return editedChecklistName;
}

async AssertEditedChecklist(editedChecklistName:string){
    await this.page.getByRole('row', { name: editedChecklistName }).isVisible();
   
}
async DeleteChecklist(editedChecklistName:string){
/*await this.page
  .locator('[data-testid="checklist-cards"]')
  .locator('div._headerContainer_no81z_60', { hasText: editedChecklistName })
  .getByText('delete')
  .click()
  await this.page.locator('[data-testid="checklist-cards"]')
  .last()
  .getByText('delete')
  .click();
await this.page.waitForTimeout(3000);
await this.page.getByRole('button', { name: 'Yes, Delete' }).click();**/


  /*const checklist = this.page
    .locator('div._headerContainer_no81z_60')
    .filter({ hasText: editedChecklistName });

  await expect(checklist).toBeVisible();

  await checklist
    .locator('span:has-text("delete")')
    .click();**/

  //await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  await this.page
  .locator('span._deleteIcon_no81z_79')
  .last()
  .click();
  await this.page.waitForTimeout(5000);
  await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
}



async ValidateDuplicateIncidentType(){
    const IncidentTypeName = await this.CreateIncidentType();
    await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Incident Types' }).click();
    await this.page.locator('button span:text("Incident Type")').click();
    await this.page.waitForTimeout(3000);
    await this.page.getByPlaceholder('Incident Type').fill(IncidentTypeName);
    await this.page.getByPlaceholder('Enter # to add new keyword').click();
    await this.page.waitForTimeout(5000);
}
async AssertValidateDuplicate() {
  const duplicateError = this.page.getByText(
    'This name is already taken',
    { exact: true }
  );
  await expect(duplicateError).toBeVisible();
  await expect(duplicateError).toHaveCSS(
    'color',
    'rgb(255, 79, 79)'
  );
}

async ValidateDuplicateRank(){
     const RankName = await this.AddRank();
     await this.settingsIcon.click();
    await this.page.getByRole('button', { name: 'Ranks' }).click();
    await this.page.locator('button span:text("Rank")').click();
    await this.page.getByRole('heading', { name: 'New Rank' }).isVisible();
    await this.page.getByPlaceholder('Rank name').fill(RankName);
     await this.page.getByPlaceholder('Required training').fill('Test Rank Item 1');
    await this.page.locator('button:has-text("Add Training")').click();
    await this.page.locator('form').evaluate(
  (form) => (form as HTMLFormElement).requestSubmit());
   await this.page.waitForTimeout(5000);    
}
}





