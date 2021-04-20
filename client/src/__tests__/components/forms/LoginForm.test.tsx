import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../../../components/forms/LoginForm";

it("Login button click should call 1 time", () => {
  const mockSubmit = jest.fn();
  const mockInputs = jest.fn();
  render(<LoginForm 
        handleInputs={mockInputs}
        handleSubmit={mockSubmit}
        email="liina@test.net"
        emailErr=""
        password="1398083"
        passwordErr=""
    />);
  const login = screen.getByTestId("form-submit");
  fireEvent.submit(login);
  expect(mockSubmit).toHaveBeenCalledTimes(1)
});