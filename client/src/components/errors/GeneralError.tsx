
type Props = {
  error: string;
}

const ErrorMessage: React.FC<Props> = ({error}) => {
  return (
  <div className="error-container">
    <span className="text-danger pb-3 error-messages" data-testid="general-error">{error}</span>
  </div>
  )
}

export default ErrorMessage;