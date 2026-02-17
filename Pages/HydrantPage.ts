import { Page,expect } from '@playwright/test'; 

export class HydrantsPage {
  page: Page;
    hydrantRows;
    addQPButton;
    addQPIcon;
    qPLocation;
    pacItem;
    confirmButton;
    addHydrant;
    searchInput;
    table;
    tableBodyRows;
    editButton;
    saveChangesButton;
    deleteButton;
    confirmDeleteButton;

  constructor(page: Page) {
    this.page = page;
    this.hydrantRows = this.page.locator('tbody tr').nth(2); 
    this.addQPButton = this.page.getByRole('button',{ name : 'Add Hydrant'});
    this.addQPIcon = this.page.locator('._myLocationIcon_82p7r_124');
    this.qPLocation = this.page.getByPlaceholder('Enter the address or coordinates*').nth(1);
    this.pacItem = this.page.locator('.pac-item').first();
    this.confirmButton = this.page.getByRole('button', {name : 'Confirm Location'});
    this.addHydrant = this.page.getByRole('button', {name : 'Add Hydrant'});
    this.searchInput = this.page.getByPlaceholder("Search by Hydrant #, location...");



    // ---------------------------------------------------------------- Table
    this.table = this.page.locator(".ant-table");
    this.tableBodyRows = this.page.locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])');

    this.editButton = this.page.locator("//span[text()='edit_square']").first();
    this.saveChangesButton = this.page.getByRole('button', { name: 'Save Changes' });
    this.deleteButton = this.page.locator("//span[text()='delete']").first();
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });

  }







    async createQP( country : string): Promise<string> {
        await this.addQPButton.click();
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
         
          await this.addHydrant.click();


        const alert = this.page.getByRole('alert');
        await expect(alert).toBeVisible();

        const alertText = await alert.textContent();
        const hydIdMatch = alertText?.match(/HYD-\d+/);

        if(!hydIdMatch){
            throw new Error('Hydrant already exists');
        }

        return hydIdMatch[0];
  
    };


    async searchByQPName(name: string) {
        await this.searchInput.fill(name);
        await this.searchInput.press("Enter");
        await this.waitForTableToLoad();
    }


    async waitForTableToLoad() {
        await expect(this.table).toBeVisible();
    }

    async getAllHydNames(): Promise<string[]> {
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

    async expectAllRowsContainHydName(searchText: string) {
        const names = await this.getAllHydNames();

        if (names.length === 0) {
        return;
        }

        for (const n of names) {
        expect(n.toLowerCase()).toContain(searchText.toLowerCase());
        }
    }

    async editFunction(country: string, id: string){
        
        this.searchByQPName(id);
        await this.editButton.click();

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
        await this.saveChangesButton.click();
    }
    

    async deleteHydrant(id: string){
        this.searchByQPName(id);
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }
}