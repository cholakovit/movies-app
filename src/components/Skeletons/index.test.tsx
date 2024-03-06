import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeletons from '.'; // Adjust the import path as necessary

describe('Skeletons Component', () => {
  it('renders the correct number of skeletons', () => {
    const testProps = {
      width: 100,
      height: 100,
      number: 3,
    };

    render(<Skeletons {...testProps} />);

    const skeletonElements = screen.getAllByTestId('skeletons');
    expect(skeletonElements.length).toBe(testProps.number);

    for (let index = 0; index < testProps.number; index++) {
      const skeleton = screen.getByTestId(`skeleton-${index}`);
      expect(skeleton).toHaveStyle(`width: ${testProps.width}px`);
      expect(skeleton).toHaveStyle(`height: ${testProps.height}px`);
    }
  });
});
