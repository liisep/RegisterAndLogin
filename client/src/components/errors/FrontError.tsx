
type Props = {
  dataId: string,
  error: string 
};

const FrontError: React.FC<Props> = ({dataId, error}) => {
  return (
    <div className="text-danger form-error-messages pb-3" data-testid={dataId}>{error}</div>
  )
}

export default FrontError;