import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviesUploader from '.'; // Adjust the import path as needed
import * as hooks from '../../helper/hooks'; // Adjust the import path to your useFileReader hook

// Mock the useFileReader hook
jest.mock('../../helper/hooks', () => ({
  useFileReader: jest.fn(),
}));

describe('MoviesUploader', () => {
  it('renders correctly and triggers file change on input', () => {
    // Mock the handleFileChange function
    const handleFileChangeMock = jest.fn();
    (hooks.useFileReader as jest.Mock).mockReturnValue({
      handleFileChange: handleFileChangeMock,
    });

    // Render the MoviesUploader component
    render(<MoviesUploader />);

    // Find the input element and simulate a file change event
    const input = screen.getByTestId('file-input'); // Ensure you add 'data-testid="file-input"' to your VisuallyHiddenInput component
    fireEvent.change(input, { target: { files: [new File(['content'], 'test.txt', { type: 'text/plain' })] } });

    // Assert the handleFileChange function was called
    expect(handleFileChangeMock).toHaveBeenCalledTimes(1);
  });
});
