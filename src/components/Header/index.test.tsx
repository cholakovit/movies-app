import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.'; // Adjust the import path as needed
import { ColorModeContext } from '../../helper/Context'; // Adjust the import path as needed

describe('Header', () => {
  it('renders correctly and toggles theme mode on switch click', () => {
    // Mock toggleColorMode function
    const toggleColorModeMock = jest.fn();

    // Wrap Header component with ColorModeContext provider
    render(
      <ColorModeContext.Provider value={{ toggleColorMode: toggleColorModeMock }}>
        <Header />
      </ColorModeContext.Provider>
    );

    // Find the switch by test ID and click it
    const materialUiSwitch = screen.getByTestId('material-ui-switch');
    fireEvent.click(materialUiSwitch);

    // Assert the toggleColorMode function was called
    expect(toggleColorModeMock).toHaveBeenCalledTimes(2);
  });
});
