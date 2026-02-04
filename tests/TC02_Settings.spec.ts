import { test, expect } from '@playwright/test'; 
import { SettingsPages } from '../Pages/SettingsPages';

test('Create, edit and delete Apparatus Type', async ({ page }) => {
  const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
const ApparatusName = await settings.CreateApparatusType();
const editedApparatusName = ApparatusName + ApparatusName;
await settings.AssertApparatusTypeCreated(ApparatusName);
await settings.EditApparatusType(ApparatusName);
await settings.AssertApparatusTypeEdited(editedApparatusName);
//await settings.DeleteApparatusType(editedApparatusName);
});
 
test ('Create, edit and delete Incident Type', async ({ page }) => {
   const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
const IncidentTypeName = await settings.CreateIncidentType();
const editedIncidentTypeName = IncidentTypeName + IncidentTypeName;
await settings.AssertIncidentTypeCreated(IncidentTypeName);
await settings.EditIncidentType(IncidentTypeName);
await settings.AssertIncidentTypeEdited(editedIncidentTypeName);
await settings.DeleteIncidentType(editedIncidentTypeName);
});
 
test ('Add, assert and delete status', async ({ page }) => {
   const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
const StatusName = await settings.AddStatus();
//const editedIncidentTypeName = StatusName + StatusName;
await settings.AssertStatusAdded(StatusName);
await settings.EditIncidentType(StatusName);
await settings.deletestatus(StatusName);
});
 
test ('Create, edit and delete Rank', async ({ page }) => {
   const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
const RankName = await settings.AddRank();
const editedRankName = RankName + RankName;
await settings.AssertRankAdded(RankName);
await settings.editRank(RankName);
await settings.AssertRankEdited(editedRankName);
await settings.deleteRank(editedRankName);
});
 
test ('Create, edit and delete Checklist', async ({ page }) => {
   const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
const ChecklistName = await settings.CreateChecklist();
const editedChecklistName = ChecklistName + ChecklistName;
await settings.AssertChecklistCreated(ChecklistName);
await settings.EditChecklist(ChecklistName);
await settings.AssertEditedChecklist(editedChecklistName);
await settings.DeleteChecklist(editedChecklistName);
});
 
test ('Verify duplicate Rank', async ({ page }) => {
   const settings = new SettingsPages(page);
 
  await page.goto('/dashboard'); // already logged in
  await settings.ValidateDuplicateRank();
  await settings.AssertValidateDuplicateRank();

});

test ('Verify duplicate Incident Type', async ({ page }) => {
   const settings = new SettingsPages(page);
   const IncidentTypeName = `Incident_${Date.now()}`;
  await page.goto('/dashboard'); // already logged in
  await settings.ValidateDuplicateIncidentType(IncidentTypeName);
  await settings.AssertValidateDuplicateIncidentType();

});
