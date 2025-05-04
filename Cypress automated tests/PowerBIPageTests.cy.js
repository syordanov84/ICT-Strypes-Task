import { PageElements, PageActions } from "./PageObjects";
import { AssertSelectors } from "./PageAssertions";
import { DataImportElements } from "./DataImport";

describe('ICT Strypes task test cases', () => {
    beforeEach(() => {
        cy.visit(DataImportElements.BASE_URL);
    });

    it('Selects country from data table', () => {
        PageActions.SelectCountry(DataImportElements.Sections.DataTable, DataImportElements.Countries.Albania).click();
        
        AssertSelectors.AssertSelectedCountry(DataImportElements.Countries.Albania)
        .should('have.class', 'cell-selected');
    });

    it('Includes country', () => {
        PageActions.SelectCountry(DataImportElements.Sections.DataTable, DataImportElements.Countries.Albania).rightclick();
        PageElements.Selectors.IncludeOption().click();
        PageElements.Selectors.FilterBtn().click();

        AssertSelectors.AssertIncludedCountry(DataImportElements.Countries.Albania).should('have.text', ' Albania (Country) + 4.49 (Inflation) ');
    });

    it('Sorts countries in data table alphabetically descending', () => {
        PageActions.SortBy(PageElements.DataTableHeaders.Country);

        PageElements.Selectors.FirstElementInDataTable().should('have.text', 'Zambia');
    });

    it('Expands data table via focus mode button', () => {       
        PageActions.SelectCountry(DataImportElements.Sections.DataTable, DataImportElements.Countries.Albania).click();
        PageElements.Selectors.FocusModeBtn().click();

        PageElements.Selectors.BackToReportBtn().should('be.visible');
    });

    it('Verifies that the total amounts Income per person and GDP are recalculating upon country select', () => {        
        PageActions.SelectCountry(DataImportElements.Sections.TotalHealthcare, DataImportElements.Countries.France).click();
        cy.wait(500);

        AssertSelectors.AssertTotal(PageElements.TotalViews.IncomeForPerson).then((value) => {
            expect(value).to.equal('37K.');
        });
        AssertSelectors.AssertTotal(PageElements.TotalViews.GDP).then((value) => {
            expect(value).to.equal('41K.');
        });
    });
});
