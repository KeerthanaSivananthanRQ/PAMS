import { Page, expect, Locator } from "@playwright/test";

export class Apparatus {
  readonly page: Page;

  // ----------------------------------------------------- ADD APPARATUS BUTTON
  readonly addApparatusButton: Locator;

  // ----------------------------------------------------- Apparatus Details
  readonly apparatusName: Locator;
  readonly apparatusID: Locator;

  readonly apparatusTypeDropDowm: Locator;
  readonly apparatusTypeName: Locator;

  readonly apparatusStateDropDowm: Locator;
  readonly apparatusStateName: Locator;

  readonly apparatusDepartmentDropDowm: Locator;
  readonly apparatusDepartmentName: Locator;

  readonly apparatusStationDropDowm: Locator;
  readonly apparatusStationName: Locator;

  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  readonly nextButton: Locator;

  // ------------------------------------------------------ Device Registration
  readonly emailInput: Locator;
  readonly pinInput: Locator;

  // --------------------------------------------------------- Header / Search
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly clearSearchButton: Locator;

  // ------------------------------------------------------------ Tabs
  readonly allTab: Locator;
  readonly assignedTab: Locator;
  readonly availableTab: Locator;
  readonly othersTab: Locator;

  // --------------------------------------------------------------- Table
  readonly table: Locator;
  readonly tableBodyRows: Locator;
  // --------------------------------------------------------------- Row Actions
  readonly editIconByApparatusNo: (apparatusNo: string) => Locator;

  
  readonly apparatusNameCellByApparatusNo: (apparatusNo: string) => Locator;

  // --------------------------------------------------------------- Edit Modal / Drawer
  readonly editApparatusNameInput: Locator;
  readonly saveButton: Locator;

  // --------------------------------------------------------------- Error (Duplicate)
  readonly duplicateNameError: Locator;

  readonly filterButton : Locator;
  readonly departmentDropDown : Locator;
  readonly applyFilterButton : Locator;



  constructor(page: Page) {
    this.page = page;

    // ----------------------------------------------------- ADD APPARATUS BUTTON
    this.addApparatusButton = this.page.getByRole("button", { name: "add Apparatus" });

    // ----------------------------------------------------- Apparatus Details
    this.apparatusName = this.page.getByRole("textbox", { name: "name" });
    this.apparatusID = this.page.getByPlaceholder("Apparatus #");

    this.apparatusTypeDropDowm = this.page.locator(
      'div.ant-select[name="apparatusTypeId"] input[role="combobox"]'
    );
    this.apparatusTypeName = this.page.locator(".rc-virtual-list-holder-inner").first().getByTitle("Ambulance");

    this.apparatusStateDropDowm = this.page.locator("div.ant-select-selector").nth(1);
    this.apparatusStateName = this.page.getByText("Available").first();

    this.apparatusDepartmentDropDowm = this.page.locator("div.ant-select-selector").nth(2);
    this.apparatusDepartmentName = this.page.getByText("back");

    this.apparatusStationDropDowm = this.page.locator("div.ant-select-selector").nth(3);
    this.apparatusStationName = this.page.getByText("1212").first();

    this.checkbox1 = this.page.getByLabel("").nth(4);
    this.checkbox2 = this.page.getByLabel("").nth(5);

    this.nextButton = this.page.getByRole("button", { name: "Next" });

    // ------------------------------------------------------ Device Registration
    this.emailInput = this.page.getByPlaceholder("Email Address");
    this.pinInput = this.page.getByPlaceholder("4 Digit Device PIN");

    // -------------------------------------------------------- SearchBox
    this.searchInput = page.getByPlaceholder("Search by apparatus name");

    // ------------------------------------------------------ Ant Search button (icon only)
    this.searchButton = page.locator(".ant-input-search-button");

    // ------------------------------------------------------------- Clear icon
    this.clearSearchButton = page.locator(".ant-input-clear-icon");

    // ---------------------------------------------------------------- Tabs
    this.allTab = page.getByRole("button", { name: "All" });
    this.assignedTab = page.getByRole("button", { name: "Assigned" });
    this.availableTab = page.getByRole("button", { name: "Available" });
    this.othersTab = page.getByRole("button", { name: "Others" });

    // ---------------------------------------------------------------- Table
    this.table = page.locator(".ant-table");
    this.tableBodyRows = page.locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])');



        // --------------------------------------------------------------- Row Actions
    this.editIconByApparatusNo = (apparatusNo: string) =>
  this.page
    .locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])')
    .filter({
      has: this.page.locator("td").first().filter({ hasText: apparatusNo }),
    })
    .locator('span._editIcon_gba6o_442.material-symbols-rounded')
    .first();


    this.apparatusNameCellByApparatusNo = (apparatusNo: string) =>
      this.page
        .locator('.ant-table-tbody > tr.ant-table-row:not([aria-hidden="true"])')
        .filter({ has: this.page.getByRole("cell", { name: apparatusNo }) })
        .locator("td")
        .nth(1);

    // --------------------------------------------------------------- Edit Modal / Drawer
    this.editApparatusNameInput = this.page.getByRole("textbox", { name: "name" });

    this.saveButton = this.page.getByRole("button", { name: "Save" });

    // --------------------------------------------------------------- Error (Duplicate)
    this.duplicateNameError = this.page.getByText(/duplicate|already exists/i).first();


    //----------------------------------------------------------------FILTER BUTTON

    this.filterButton = this.page.locator('._wrapper_1gvej_72');
    this.departmentDropDown = this.page.locator('.ant-select-selector').first();
    this.applyFilterButton = this.page.getByRole('button', {name : 'Apply Filters'});


  }


































  // ------------------------------------------------------------ Functionality to add the Apparatus
  async addApparatus(name: string, id:string) {
    await this.addApparatusButton.click();

    // ----------------------------------------------------- Apparatus Details
    await this.apparatusName.fill(name);
    await this.apparatusID.fill(id);

    await this.apparatusTypeDropDowm.click();
    await this.apparatusTypeName.click();

    await this.apparatusStateDropDowm.click();
    await this.apparatusStateName.click();

    await this.apparatusDepartmentDropDowm.click();
    await this.apparatusDepartmentName.click();

    await this.apparatusStationDropDowm.click();
    await this.apparatusStationName.click();

    await this.checkbox1.hover();
    await this.checkbox1.check();

    await this.checkbox2.hover();
    await this.checkbox2.check();

    await this.nextButton.click();

    // ------------------------------------------------------ Device Registration
    await this.emailInput.fill(name + "1727@example.com");
    await expect(this.pinInput).toBeEnabled();
    await this.pinInput.fill("1234");

    await this.addApparatusButton.click();
  }

  // ------------------------------------------------------------ Due to slow loading of the table
async waitForTableToLoad() {
  await expect(this.table).toBeVisible();
}


  // ------------------------------------------------------------ Searching by Apparatus name
  async searchByApparatusName(name: string) {
    await this.searchInput.fill(name);
    await this.searchInput.press("Enter");
    await this.waitForTableToLoad();
  }

  // ------------------------------------------------------------ To fetch all the names of the apparatus and return the data
  async getAllApparatusNames(): Promise<string[]> {
    const rows = this.tableBodyRows;
    const count = await rows.count();

    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      // Column 2 = Apparatus Name (based on your table)
      const nameCell = rows.nth(i).locator("td").nth(1);
      names.push((await nameCell.innerText()).trim());
    }

    return names;
  }
async getFirstApparatusName(val: string): Promise<string> {
  await this.waitForTableToLoad();

  const rowCount = await this.tableBodyRows.count();
  if (rowCount === 0) return "";

  const firstRow =
    val === "2" ? this.tableBodyRows.nth(2) : this.tableBodyRows.first();

  const firstNameCell = firstRow.locator("td").nth(1);
  return (await firstNameCell.innerText()).trim();
}


  // ------------------------------------------------------------ Condition to check if the name is present in the table
  async expectAllRowsContainApparatusName(searchText: string) {
    const names = await this.getAllApparatusNames();

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


    // ------------------------------------------------------------ Click edit button by Apparatus #
  async clickEditByApparatusNo(apparatusNo: string) {
    await this.waitForTableToLoad();
    await this.editIconByApparatusNo(apparatusNo).click();
  }

  // ------------------------------------------------------------ Edit Apparatus Name
  async updateApparatusName(name: string) {
    await expect(this.editApparatusNameInput).toBeVisible();
    await this.editApparatusNameInput.fill(name);
  }

  // ------------------------------------------------------------ Save the edited Apparatus
  async saveEditedApparatus() {
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  // ------------------------------------------------------------ Assert duplicate name error
  async expectDuplicateNameError() {
    await expect(this.duplicateNameError).toBeVisible();
  }

  // ------------------------------------------------------------ Assert apparatus name updated in table
  async expectApparatusNameUpdated(apparatusNo: string, expectedName: string) {
    await this.waitForTableToLoad();
  }

  async clickNextButton(){
    await this.nextButton.click();
  }



//---------------------------------------------------------FILTER-------------------------------------------------------------

async FilterFunction(){
    await this.filterButton.click();
    await this.departmentDropDown.click();
    const filter =  this.page.getByTitle('back');
    await expect(filter).toBeVisible();
    await filter.click();
    await this.applyFilterButton.click();
}

async assertFilter(){
  await this.waitForTableToLoad();

  const rowCount = await this.tableBodyRows.count();
  if (rowCount === 0) return "";

  const firstRow =this.tableBodyRows.first();

  const firstNameCell = firstRow.locator("td").nth(4);
  await expect(firstNameCell).toHaveText('Back');
}
}



