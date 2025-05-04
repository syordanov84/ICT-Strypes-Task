const Sections = {
    IncomePerPerson: 0,
    GDPTotal: 1,
    Top8Inflation: 2,
    TotalHealthcare: 3,
    GoodsAndServiceImport: 4,
    GoodsAndServiceExport: 5,
    DataTable: 6,
}
export const PageElements ={
    Selectors: {
        FirstElementInDataTable: () => cy.get('div[row-index="0"][aria-rowindex="2"] div[column-index="0"][aria-colindex="2"]'),
        FilterBtn: () => cy.get('.vcFilterRestatementBtn'),
        IncludeOption: () => cy.contains('Include'),
        ExcludeOption: () => cy.contains('Exclude'),
        FocusModeBtn: () => cy.get("[data-testid=focus-mode-btn]"),
        BackToReportBtn: () => cy.contains('Back to report'),
        HeadersSelector: () => cy.get('div[role="columnheader"]'),
        VisualContainer: () => cy.get('[data-testid="visual-container"]'),
        Top8InflationCountrySelector: (country) => cy.get(`[aria-label*="Country ${country}"]`)
    },
    DataTableHeaders: {
        Country: 'Country',
        Inflation: 'Inflation',
        Health: 'Health',
        Export: 'Export',
        Import: 'Import',
        GDP: 'GDP',
    },
    TotalViews: {
        IncomeForPerson: 'Income for person',
        GDP: 'GDP',
    }
}
export const PageActions = {
    SelectCountry(view, country) {
        const sectionIndex = Sections[view];
        if (sectionIndex === undefined) {
            throw new Error(`Invalid section: ${view}`);
        }

        switch (sectionIndex) {
            case 6: // DataTable
                return PageElements.Selectors.VisualContainer().eq(sectionIndex).contains(country);
            case 2: // Top8Inflation
                return PageElements.Selectors.Top8InflationCountrySelector();
            default: // Other sections
                return PageElements.Selectors.VisualContainer().eq(sectionIndex).contains(country).parent();
        }
    },
    SortBy(DataTableHeader) {
        PageElements.Selectors.HeadersSelector().contains(DataTableHeader).click();
    },
}


