import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "../../../components/forms/RegisterForm";

it("Register button click should call 1 time", () => {
  const mockSubmit = jest.fn();
  const mockInputs = jest.fn();
  render(<RegisterForm 
        handleInputs={mockInputs}
        handleSubmit={mockSubmit}
        firstName="Liina"
        firstNameErr=""
        lastName="Test"
        lastNameErr=""
        email="liina@test.net"
        emailErr=""
        password="1398083"
        passwordErr=""
    />);
  const login = screen.getByTestId("form-submit");
  fireEvent.submit(login);
  expect(mockSubmit).toHaveBeenCalledTimes(1)
});