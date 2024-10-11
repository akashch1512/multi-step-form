'use client';

import { Fragment, useEffect, useState } from "react";
import { useFormStep } from "../../../hooks/use-form-step";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";
import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

// Define a type for the form data
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  whatYouDo: string;
  department: string;
  branchName: string;
}

export function YourInfo() {
  const {
    nameField,
    dispatchNameField,
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField,
    collegeNameField,
    dispatchCollegeNameField,
    whatYouDoField,
    dispatchWhatYouDoField,
    departmentField,
    dispatchDepartmentField,
    branchNameField,
    dispatchBranchNameField
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  // Debounced values for inputs
  const [debouncedName, setDebouncedName] = useState(nameField.value);
  const [debouncedEmail, setDebouncedEmail] = useState(emailField.value);
  const [debouncedPhoneNumber, setDebouncedPhoneNumber] = useState(phoneNumberField.value);
  const [debouncedCollegeName, setDebouncedCollegeName] = useState(collegeNameField.value);
  const [debouncedWhatYouDo, setDebouncedWhatYouDo] = useState(whatYouDoField.value);
  const [debouncedDepartment, setDebouncedDepartment] = useState(departmentField.value);
  const [debouncedBranchName, setDebouncedBranchName] = useState(branchNameField.value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(nameField.value);
      setDebouncedEmail(emailField.value);
      setDebouncedPhoneNumber(phoneNumberField.value);
      setDebouncedCollegeName(collegeNameField.value);
      setDebouncedWhatYouDo(whatYouDoField.value);
      setDebouncedDepartment(departmentField.value);
      setDebouncedBranchName(branchNameField.value);
    }, 300); // Debounce time of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [
    nameField.value,
    emailField.value,
    phoneNumberField.value,
    collegeNameField.value,
    whatYouDoField.value,
    departmentField.value,
    branchNameField.value,
  ]);

  function validateForm() {
    let formHasError = false;

    // Existing validations
    if (!debouncedName) {
      dispatchNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Name is required' });
      formHasError = true;
    }

    if (!debouncedEmail) {
      dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is required' });
      formHasError = true;
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(debouncedEmail)) {
        dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is invalid' });
        formHasError = true;
      }
    }

    if (!debouncedPhoneNumber) {
      dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is required' });
      formHasError = true;
    } else {
      if (debouncedPhoneNumber.length < 6) {
        dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is invalid' });
        formHasError = true;
      }
    }

    // New field validations
    if (!debouncedCollegeName) {
      dispatchCollegeNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'College name is required' });
      formHasError = true;
    }

    if (!debouncedWhatYouDo) {
      dispatchWhatYouDoField({ type: ACTIONS.SET_ERROR, errorMessage: 'What you do is required' });
      formHasError = true;
    }

    if (!debouncedDepartment) {
      dispatchDepartmentField({ type: ACTIONS.SET_ERROR, errorMessage: 'Department is required' });
      formHasError = true;
    }

    if (!debouncedBranchName) {
      dispatchBranchNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Branch name is required' });
      formHasError = true;
    }

    return !formHasError;
  }

  // Store data locally without sending to server
  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      const formData: FormData = {
        name: debouncedName,
        email: debouncedEmail,
        phoneNumber: debouncedPhoneNumber,
        collegeName: debouncedCollegeName,
        whatYouDo: debouncedWhatYouDo,
        department: debouncedDepartment,
        branchName: debouncedBranchName,
      };

      // Store the formData for instance
      console.log('Form Data:', formData); // Use this to handle the data as needed

      handleNextStep(); // Move to the next step after successful validation
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Personal Info"
          description="Please provide your name, email address, phone number, college name, occupation, department, and branch name. Kindly note that this information will be displayed on your certificates and goodies."
        />

        <div className="mt-5 flex flex-col gap-4">
          <TextInput
            label="Name"
            placeholder="e.g. Akash Bapurao Chaudhari"
            value={debouncedName} // Use the debounced value
            onChange={(name, value) => dispatchNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={nameField.errorMessage}
            clearError={() => dispatchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={nameField.hasError}
            name="name"
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. akash@domain.com"
            value={debouncedEmail} // Use the debounced value
            onChange={(name, value) => dispatchEmailField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={emailField.errorMessage}
            clearError={() => dispatchEmailField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={emailField.hasError}
            name="email"
          />
          <TextInput
            label="Phone Number"
            placeholder="e.g. +91 1234 567 890"
            value={debouncedPhoneNumber} // Use the debounced value
            onChange={(name, value) => dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={phoneNumberField.errorMessage}
            clearError={() => dispatchPhoneNumberField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={phoneNumberField.hasError}
            name="phoneNumber"
          />
          <TextInput
            label="College Name"
            placeholder="e.g. Jawaharlal Nehru Engineering College"
            value={debouncedCollegeName} // Use the debounced value
            onChange={(name, value) => dispatchCollegeNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={collegeNameField.errorMessage}
            clearError={() => dispatchCollegeNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={collegeNameField.hasError}
            name="collegeName"
          />
          <TextInput
            label="What You Do"
            placeholder="e.g. Student, Faculty, Business, Entrepreneur"
            value={debouncedWhatYouDo} // Use the debounced value
            onChange={(name, value) => dispatchWhatYouDoField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={whatYouDoField.errorMessage}
            clearError={() => dispatchWhatYouDoField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={whatYouDoField.hasError}
            name="whatYouDo"
          />
          <TextInput
            label="Department"
            placeholder="e.g. Mechanical"
            value={debouncedDepartment} // Use the debounced value
            onChange={(name, value) => dispatchDepartmentField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={departmentField.errorMessage}
            clearError={() => dispatchDepartmentField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={departmentField.hasError}
            name="department"
          />
          <TextInput
            label="Branch Name"
            placeholder="e.g. Robotics"
            value={debouncedBranchName} // Use the debounced value
            onChange={(name, value) => dispatchBranchNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={branchNameField.errorMessage}
            clearError={() => dispatchBranchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={branchNameField.hasError}
            name="branchName"
          />
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
