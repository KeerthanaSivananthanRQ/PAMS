import { BasePage } from './BasePage.ts';   
import { randomReadableName } from '../Utils/RandomNameGenerators.ts';
import { expect } from '@playwright/test';
import {faker} from '@faker-js/faker';


export class Hydrants extends BasePage {

    //----------------------------------------------LOCATORS--------------------------------------------------------------
    public addHydrantButton = this.page.getByRole('button',{ name : 'Add Hydrant'});
    public hydrantNameField = this.page.getByPlaceholder('Enter the address or coordinates*');
    public addHydrantIcon = this.page.locator('._myLocationIcon_82p7r_124');
    public confirmButton = this.page.getByRole('button', {name : 'Confirm Location'});
    public addButton = this.page.getByRole('button', {name : 'Add hydrant'});
    public hydrantLocation = this.page.getByPlaceholder('Enter the address or coordinates*').nth(1);


    public searchInput = this.page.getByPlaceholder("Search by Hydrant #, location...");

    // ---------------------------------------------------------------- Table
    public table = this.page.locator(".ant-table");
    public tableBodyRows = this.page.locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])');

    public editButton = this.page.locator("//span[text()='edit_square']").first();
    public saveChangesButton = this.page.getByRole('button', { name: 'Save Changes' });

    public deleteButton = this.page.locator("//span[text()='delete']").first();
    public confirmDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });

    public text = this.page.locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])').locator('td').first();





    async createHydrant(cityName : string){
        await this.addHydrantButton.click();
        await this.addHydrantIcon.click();
        await this.page.waitForTimeout(3000);
        await this.hydrantLocation.fill(cityName);
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.addButton.click();
    };


    async waitForTableToLoad() {
        await expect(this.table).toBeVisible();
    }


    async getFirstHydrantName(val: string): Promise<string> {
        await this.waitForTableToLoad();

        const rowCount = await this.tableBodyRows.count();
        if (rowCount === 0) return "";

        const firstRow =
            val === "2" ? this.tableBodyRows.nth(2) : this.tableBodyRows.first();

        const firstNameCell = firstRow.locator("td").first();
        console.log((await firstNameCell.innerText()).trim());
        return (await firstNameCell.innerText()).trim();
    }

    async searchByHydrantName(name: string) {
        await this.searchInput.fill(name);
        await this.searchInput.press("Enter");
        await this.waitForTableToLoad();
    }

      async expectAllRowsContainHydrantsName(searchText: string) {
        const names = await this.getAllHydrantNames();

        if (names.length === 0) {
        return;
        }

        for (const n of names) {
        expect(n.toLowerCase()).toContain(searchText.toLowerCase());
        }
    }

    async expectNoRows() {
        await expect(this.tableBodyRows).toHaveCount(0);
    };
      
    
    async getAllHydrantNames(): Promise<string[]> {
            const rows = this.tableBodyRows;
            const count = await rows.count();

            const names: string[] = [];

            for (let i = 0; i < count; i++) {
            // Column 2 = Apparatus Name (based on your table)
            const nameCell = rows.nth(i).locator("td").first();
            names.push((await nameCell.innerText()).trim());
            }

            return names;
        }

    async editFunction(){
          
            await this.editButton.click();
            await this.saveChangesButton.click();
    }

    async deleteFunction(){
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }
};