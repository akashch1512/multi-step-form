import { createContext, useEffect, useReducer, useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

type Field = {
  value: string;
  hasError: boolean;
  errorMessage: string;
}

const initialState: Field = {
  value: '',
  hasError: false,
  errorMessage: ''
}

type FormContextData = {
  nameField: Field;
  dispatchNameField: React.Dispatch<any>;
  emailField: Field;
  dispatchEmailField: React.Dispatch<any>;
  phoneNumberField: Field;
  dispatchPhoneNumberField: React.Dispatch<any>;
  collegeNameField: Field; // New field
  dispatchCollegeNameField: React.Dispatch<any>; // New dispatch
  whatYouDoField: Field; // New field
  dispatchWhatYouDoField: React.Dispatch<any>; // New dispatch
  departmentField: Field; // New field
  dispatchDepartmentField: React.Dispatch<any>; // New dispatch
  branchNameField: Field; // New field
  dispatchBranchNameField: React.Dispatch<any>; // New dispatch
  isYearly: boolean;
  setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlan: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<Plan>>;
  addOns: { title: string, description: string, price: number }[];
  setAddOns: React.Dispatch<React.SetStateAction<{ title: string; description: string; price: number; }[]>>;
  clearForm: () => void;
}

export const FormContext = createContext({
  nameField: initialState,
  dispatchNameField: () => {},
  emailField: initialState,
  dispatchEmailField: () => {},
  phoneNumberField: initialState,
  dispatchPhoneNumberField: () => {},
  collegeNameField: initialState, // Initialize new field
  dispatchCollegeNameField: () => {}, // Initialize new dispatch
  whatYouDoField: initialState, // Initialize new field
  dispatchWhatYouDoField: () => {}, // Initialize new dispatch
  departmentField: initialState, // Initialize new field
  dispatchDepartmentField: () => {}, // Initialize new dispatch
  branchNameField: initialState, // Initialize new field
  dispatchBranchNameField: () => {}, // Initialize new dispatch
  isYearly: false,
  setIsYearly: () => {},
  selectedPlan: null as any,
  setSelectedPlan: () => {},
  addOns: [],
  setAddOns: () => {},
  clearForm: () => {}
} as FormContextData);

export const ACTIONS = {
  SET_VALUE: 'SET_VALUE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

function handleFormState(state: Field, action: any) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: ''
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
        hasError: false
      }
    default:
      return state
  }
}

export type Plan = {
  name: string;
  price: number
}

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  // Your Info
  const [nameField, dispatchNameField] = useReducer(handleFormState, initialState)
  const [emailField, dispatchEmailField] = useReducer(handleFormState, initialState)
  const [phoneNumberField, dispatchPhoneNumberField] = useReducer(handleFormState, initialState)

  // New Fields
  const [collegeNameField, dispatchCollegeNameField] = useReducer(handleFormState, initialState);
  const [whatYouDoField, dispatchWhatYouDoField] = useReducer(handleFormState, initialState);
  const [departmentField, dispatchDepartmentField] = useReducer(handleFormState, initialState);
  const [branchNameField, dispatchBranchNameField] = useReducer(handleFormState, initialState);

  // Plan
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null as any);

  // Add Ons
  const [addOns, setAddOns] = useState<{ title: string, description: string, price: number }[]>([]);

  const { getValueFromLocalStorage, removeValueFromLocalStorage } = useLocalStorage()

  function clearForm() {
    removeValueFromLocalStorage('your-info')
    removeValueFromLocalStorage('plan')
    removeValueFromLocalStorage('add-ons')

    dispatchNameField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchEmailField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: '' })
    dispatchCollegeNameField({ type: ACTIONS.SET_VALUE, value: '' }); // Clear new field
    dispatchWhatYouDoField({ type: ACTIONS.SET_VALUE, value: '' }); // Clear new field
    dispatchDepartmentField({ type: ACTIONS.SET_VALUE, value: '' }); // Clear new field
    dispatchBranchNameField({ type: ACTIONS.SET_VALUE, value: '' }); // Clear new field
    setIsYearly(false)
    setSelectedPlan(null as any)
    setAddOns([])
  }

  useEffect(() => {
    const yourInfoFromLocalStorage = getValueFromLocalStorage('your-info')
    if (yourInfoFromLocalStorage) {
      dispatchNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.name })
      dispatchEmailField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.email })
      dispatchPhoneNumberField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.phoneNumber })
      dispatchCollegeNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.collegeName }) // Load new field
      dispatchWhatYouDoField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.whatYouDo }); // Load new field
      dispatchDepartmentField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.department }); // Load new field
      dispatchBranchNameField({ type: ACTIONS.SET_VALUE, value: yourInfoFromLocalStorage.branch }); // Load new field
    }

    const planFromLocalStorage = getValueFromLocalStorage('plan')
    if (planFromLocalStorage) {
      setSelectedPlan(planFromLocalStorage.name)
      setIsYearly(planFromLocalStorage.isYearly)
    }

    const addOnsFromLocalStorage = getValueFromLocalStorage('add-ons')
    if (addOnsFromLocalStorage) {
      setAddOns(addOnsFromLocalStorage)
    }
  }, [])

  const value = {
    nameField,
    dispatchNameField,
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField,
    collegeNameField, // Add new field
    dispatchCollegeNameField, // Add new dispatch
    whatYouDoField, // Add new field
    dispatchWhatYouDoField, // Add new dispatch
    departmentField, // Add new field
    dispatchDepartmentField, // Add new dispatch
    branchNameField, // Add new field
    dispatchBranchNameField, // Add new dispatch
    isYearly,
    setIsYearly,
    selectedPlan,
    setSelectedPlan,
    addOns,
    setAddOns,
    clearForm
  }

  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
    </FormContext.Provider>
  );
};
