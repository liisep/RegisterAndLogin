type Props = {
  handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Logout: React.FC<Props> = ({ handleLogout }) => {
  return(
    <button data-testid="logout" onClick={handleLogout} className="btn custom-btn">
      Logout
    </button>
  )
};

export default Logout;