'use client';

import { Fragment } from "react";

import { useFormStep } from "../../../hooks/use-form-step";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { useForm } from "../../../hooks/use-form";
import { ACTIONS } from "../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";

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
  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    let formHasError = false;

    // Existing validations
    if (!nameField.value) {
      dispatchNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Name is required' });
      formHasError = true;
    }

    if (!emailField.value) {
      dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is required' });
      formHasError = true;
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(emailField.value)) {
        dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is invalid' });
        formHasError = true;
      }
    }

    if (!phoneNumberField.value) {
      dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is required' });
      formHasError = true;
    } else {
      if (phoneNumberField.value.length < 6) {
        dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is invalid' });
        formHasError = true;
      }
    }

    // New field validations
    if (!collegeNameField.value) {
      dispatchCollegeNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'College name is required' });
      formHasError = true;
    }

    if (!whatYouDoField.value) {
      dispatchWhatYouDoField({ type: ACTIONS.SET_ERROR, errorMessage: 'What you do is required' });
      formHasError = true;
    }

    if (!departmentField.value) {
      dispatchDepartmentField({ type: ACTIONS.SET_ERROR, errorMessage: 'Department is required' });
      formHasError = true;
    }

    if (!branchNameField.value) {
      dispatchBranchNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Branch name is required' });
      formHasError = true;
    }

    return !formHasError;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage('your-info', JSON.stringify({
        name: nameField.value,
        email: emailField.value,
        phoneNumber: phoneNumberField.value,
        collegeName: collegeNameField.value,
        whatYouDo: whatYouDoField.value,
        department: departmentField.value,
        branchName: branchNameField.value,
      }));
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Personal Info"
          description="Please provide your name, email address, phone number, college name, occupation, department, and branch name. Kindly note that this information will be displayed on your certificates and goodies"
        />

        <div className="mt-5 flex flex-col gap-4">
          <TextInput
            label="Name"
            placeholder="e.g. Akash Bapurao Chaudhari"
            value={nameField.value}
            onChange={(value: string) => dispatchNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={nameField.errorMessage}
            clearError={() => dispatchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={nameField.hasError}
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. akash@domain.com"
            value={emailField.value}
            onChange={(value: string) => dispatchEmailField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={emailField.errorMessage}
            clearError={() => dispatchEmailField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={emailField.hasError}
          />
          <TextInput
            label="Phone Number"
            placeholder="e.g. +91 1234 567 890"
            value={phoneNumberField.value}
            onChange={(value: string) => dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={phoneNumberField.errorMessage}
            clearError={() => dispatchPhoneNumberField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={phoneNumberField.hasError}
          />
          <TextInput
            label="College Name"
            placeholder="e.g. Jawaharlal Nehru Engineering College"
            value={collegeNameField.value}
            onChange={(value: string) => dispatchCollegeNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={collegeNameField.errorMessage}
            clearError={() => dispatchCollegeNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={collegeNameField.hasError}
          />
          <TextInput
            label="What You Do"
            placeholder="e.g. Student, Faculty, Business ,Entrepreneur "
            value={whatYouDoField.value}
            onChange={(value: string) => dispatchWhatYouDoField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={whatYouDoField.errorMessage}
            clearError={() => dispatchWhatYouDoField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={whatYouDoField.hasError}
          />
          <TextInput
            label="Department"
            placeholder="e.g. Mechanical"
            value={departmentField.value}
            onChange={(value: string) => dispatchDepartmentField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={departmentField.errorMessage}
            clearError={() => dispatchDepartmentField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={departmentField.hasError}
          />
          <TextInput
            label="Branch Name"
            placeholder="e.g. Robotics"
            value={branchNameField.value}
            onChange={(value: string) => dispatchBranchNameField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={branchNameField.errorMessage}
            clearError={() => dispatchBranchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={branchNameField.hasError}
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
