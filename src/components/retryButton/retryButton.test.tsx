import { render, screen, fireEvent } from '@testing-library/react';
import RetryButton from './retryButton';

describe('retryButton', () => {
  test('disabled 상태', () => {
    render(<RetryButton isDisabled={true} />);
    const button: HTMLButtonElement = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
  });

  test('disabled 상태 → 버튼 클릭 → enabled 상태', () => {
    const state = {
      isDisabled: true,
      toggle(value: boolean) {
        this.isDisabled = value;
      },
    };

    render(
      <RetryButton
        isDisabled={state.isDisabled}
        onRetry={() => state.toggle(!state.isDisabled)}
      />
    );

    const button: HTMLButtonElement = screen.getByRole('button');

    expect(button).toHaveAttribute('disabled');
    
    fireEvent.click(button);
    
    expect(button).toHaveAttribute('disabled');

  });
});
