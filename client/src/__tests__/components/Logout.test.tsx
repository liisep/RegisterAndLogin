import { render, screen, fireEvent } from "@testing-library/react";
import Logout from "../../components/Logout";

describe("Logout button", () => {
  const mockSubmit = jest.fn();
  beforeEach(() => {
    render(<Logout handleLogout={mockSubmit}/>)
  });

  it("should be in the document", () => {
    const logout = screen.getByTestId("logout");
    expect(logout).toBeInTheDocument();
  });

  it("click should call 1 time", () => {
    const logout = screen.getByTestId("logout");
    fireEvent.click(logout);
    expect(mockSubmit).toHaveBeenCalledTimes(1)
  });
});