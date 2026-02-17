import { BasePage } from './BasePage.ts';   
import { randomReadableName } from '../Utils/RandomNameGenerators.ts';
import { expect } from '@playwright/test';
import {faker, th} from '@faker-js/faker';


export class QuickPie extends BasePage {

    public addQPButton = this.page.getByRole('button',{ name : 'File'});
    public qPNameField = this.page.getByRole('textbox', {name : 'File Name'});
    public addQPIcon = this.page.locator('._myLocationIcon_82p7r_124');
    public confirmButton = this.page.getByRole('button', {name : 'Confirm Location'});
    public addButton = this.page.getByRole('button', {name : 'File '});
    public qPLocation = this.page.getByPlaceholder('Enter the address or coordinates*').nth(1);
    public qPFileUpload = this.page.locator('input[type="file"]');
    public addFileButton = this.page.getByRole('button', {name : 'Add File'});


    public searchInput = this.page.getByPlaceholder("Search by file name, location...");



    // ---------------------------------------------------------------- Table
    public table = this.page.locator(".ant-table");
    public tableBodyRows = this.page.locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])');

    public editButton = this.page.locator("//span[text()='edit_square']").first();
    public saveChangesButton = this.page.getByRole('button', { name: 'Save Changes' });

    public deleteButton = this.page.locator("//span[text()='delete']").first();
    public confirmDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });
    public pacItem = this.page.locator('.pac-item').first();



    async createQP(name:string, country : string){
        await this.addQPButton.click();
        await this.qPNameField.fill(name);
        await this.addQPIcon.click();
        await expect(this.qPLocation).toBeVisible();
        // the qPlocation placeholder already has a default location which we need to remove to add any other addresses
          // Clear the default value properly
        await this.qPLocation.click();
        await this.page.waitForTimeout(1000); // Wait for any potential UI updates
        await this.qPLocation.press('ControlOrMeta+A');
        await this.qPLocation.press("Backspace");
        await this.qPLocation.type(country, {delay : 100});
        await this.page.waitForTimeout(1000); // Wait for any potential UI updates

        await expect(this.pacItem).toBeVisible();
        await this.pacItem.click();
        await this.page.waitForTimeout(1000); // Wait for any potential UI updates

        await this.confirmButton.click();
        await this.qPFileUpload.setInputFiles('test-files/test.png');
        await expect(this.addFileButton).toBeVisible();

        await this.addFileButton.click();

    };


    async waitForTableToLoad() {
        await expect(this.table).toBeVisible();
    }

    async getFirstQPName(val: string): Promise<string> {
        await this.waitForTableToLoad();

        const rowCount = await this.tableBodyRows.count();
        if (rowCount === 0) return "";

        const firstRow =
            val === "2" ? this.tableBodyRows.nth(2) : this.tableBodyRows.first();

        const firstNameCell = firstRow.locator("td").first();
        return (await firstNameCell.innerText()).trim();
    }


    async searchByQPName(name: string) {
        await this.searchInput.fill(name);
        await this.searchInput.press("Enter");
        await this.waitForTableToLoad();
    }

    async expectAllRowsContainQPName(searchText: string) {
        const names = await this.getAllQPNames();

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
      
    
    async getAllQPNames(): Promise<string[]> {
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

    async editFunction(name: string){
          
            await this.editButton.click();
            await this.qPNameField.fill(name);
            await this.saveChangesButton.click();
    }

    async deleteFunction(){
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }
};