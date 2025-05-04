export const AssertSelectors = {
    AssertSelectedCountry: (country) => cy.contains(country).parent(),
    AssertIncludedCountry: (country) => cy.get('li').contains(country),
    AssertTotal: (type) => cy.contains(type).parent().parent().parent()
    .invoke('attr', 'aria-label')
    .then((ariaLabel) => {
        let index;
        if (type === 'Income for person') {
            index = 3;
        }
        else if (type === 'GDP') {
            index = 1;
        } else {
            throw new Error('Invalid type provided. Use "Income for person" or "GDP".');
        }
        return ariaLabel.split(' ')[index];
    })
}
