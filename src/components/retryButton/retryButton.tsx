import React from 'react';
import './retryButton.css';

interface RetryButtonProps {
  isDisabled?: boolean;
  onRetry?: () => void;
}

const RetryButton: React.FC<RetryButtonProps> = ({
  isDisabled = false,
  onRetry,
}) => (
  <button
    type="button"
    className="retryButton"
    disabled={isDisabled}
    onClick={onRetry}
  >
    재실행
  </button>
);

export default RetryButton;
