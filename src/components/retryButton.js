const RetryButton = ({ onRetry, isDisabled }) => (
  <button className="retryButton" disabled={isDisabled} onClick={onRetry}>
    재실행
  </button>
);