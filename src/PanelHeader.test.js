import { render, fireEvent } from '@testing-library/react';
import PanelHeader from './PanelHeader';

const findDropdownButton = (headerButtons) => {
    var dropdownButton = null;
    for (var i = 0; i < headerButtons.length; i++) {
        const allImages = headerButtons[i].getElementsByTagName('img');
        for (var j = 0, len = allImages.length; i < len; ++i) {
            if (allImages[j].alt === "Config") {
                dropdownButton = headerButtons[i];
            }
        }
    }
    return dropdownButton;
}

test('renders PanelHeader buttons', () => {
    const { container } = render(<PanelHeader />);
    const headerButtonsContainer = container.getElementsByClassName('headerButtons')[0];
    const headerButtons = headerButtonsContainer.getElementsByClassName('factoryButton imageButton');
    expect(headerButtons.length).toBeGreaterThanOrEqual(1);
});
  
test('renders Dropdown menu', () => {
    const { container } = render(<PanelHeader />);
    const headerButtonsContainer = container.getElementsByClassName('headerButtons')[0];
    const headerButtons = headerButtonsContainer.getElementsByClassName('factoryButton imageButton');
    var dropdownButton = findDropdownButton(headerButtons);
    fireEvent.click(dropdownButton);
    const dropdownMenu = container.getElementsByClassName('dropdownMenu')[0];
    const dropdownButtons = dropdownMenu.getElementsByClassName('factoryButton imageButton');
    expect(dropdownButtons.length).toBe(2);
});
  
test('renders Color Popup menu', () => {
    const { container } = render(<PanelHeader />);
    const headerButtonsContainer = container.getElementsByClassName('headerButtons')[0];
    const headerButtons = headerButtonsContainer.getElementsByClassName('factoryButton imageButton');
    var dropdownButton = findDropdownButton(headerButtons);
    fireEvent.click(dropdownButton);
    const dropdownMenu = container.getElementsByClassName('dropdownMenu')[0];
    const dropdownColorButton = dropdownMenu.getElementsByClassName('factoryButton imageButton')[1];
    fireEvent.click(dropdownColorButton);
    expect(container.getElementsByClassName('iasdialog').length).toBe(1);
    const popupMenu = container.getElementsByClassName('iasdialog')[0];
    const popupMenuTitle = popupMenu.getElementsByClassName('dialogTitle')[0];
    expect(popupMenuTitle).toHaveTextContent('Farbe editieren');
    const cpmTableColumns = popupMenu.getElementsByTagName('td');
    expect(cpmTableColumns[0]) === "Red";
    expect(cpmTableColumns[1]) === "Green";
    expect(cpmTableColumns[2]) === "Blue";
});

test('renders Settings Popup menu', () => {
    const { container } = render(<PanelHeader />);
    const headerButtonsContainer = container.getElementsByClassName('headerButtons')[0];
    const headerButtons = headerButtonsContainer.getElementsByClassName('factoryButton imageButton');
    var dropdownButton = findDropdownButton(headerButtons);
    fireEvent.click(dropdownButton);
    const dropdownMenu = container.getElementsByClassName('dropdownMenu')[0];
    const dropdownSettingsButton = dropdownMenu.getElementsByClassName('factoryButton imageButton')[0];
    fireEvent.click(dropdownSettingsButton);
    expect(container.getElementsByClassName('iasdialog').length).toBe(1);
    const popupMenu = container.getElementsByClassName('iasdialog')[0];
    const popupMenuTitle = popupMenu.getElementsByClassName('dialogTitle')[0];
    expect(popupMenuTitle).toHaveTextContent('Einstellungen');
});