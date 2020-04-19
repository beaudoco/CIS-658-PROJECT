const {defineFeature, loadFeature} = require('jest-cucumber');
//const feature = loadFeature('../community_component.feature');
const {CommunityComponent} = require('../../community_component');

defineFeature(feature, test => {
    test('checks ScrollMenu', ({given, when, then}) => {
        let scrollMenu;

        given('checks ScrollMenu', () => {
            scrollMenu = new CommunityComponent();
        });

        when('When <ScrollMenu>', () => {
            scrollMenu.componentDidMount();
        });

        then('Then menu equals data', () => {
            expect(scrollMenu.componentDidMount()).toBe(true);
        })
    });
});