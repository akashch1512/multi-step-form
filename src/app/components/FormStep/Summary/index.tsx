import { Fragment, useEffect, useState } from "react";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import { priceFormatter } from "../../../util/price-formatter";
import { Footer } from "../../Footer";
import Form from "../../Form";
import { PostConfirmation } from "./PostConfirmation";
import { TotalPrice } from "./TotalPrice";
import { AddOnItem } from "./AddOnItem";
import axios from 'axios';  // Already imported

export function Summary() {
  const [submitted, setSubmitted] = useState(false);

  const { handlePreviousStep, moveToStep } = useFormStep();
  const { addOns, selectedPlan, isYearly, clearForm } = useForm();

  // New function to handle submission and send data to server
  async function handleGoForwardStep() {
    try {
      const userData = {
        plan: selectedPlan.name,
        isYearly: isYearly,
        addOns: addOns.map(addOn => ({
          title: addOn.title,
          price: addOn.price
        })),
        totalPrice: selectedPlan.price + addOns.reduce((acc, addOn) => acc + addOn.price, 0)
      };

      // Send POST request to server
      const response = await axios.post('http://localhost:5000/api/save-data', userData);
      console.log('Server response:', response.data);  // Log the response from the server

      // If successful, mark the form as submitted
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving data to server:', error);
    }
  }

  function handleChangePlan() {
    moveToStep(2);
  }

  useEffect(() => {
    if (submitted) {
      clearForm();

      setTimeout(() => {
        moveToStep(1);
      }, 4000);
    }
  }, [submitted, moveToStep]);

  if (submitted) {
    return (
      <PostConfirmation />
    );
  }

  const addOnsTotalPrice = addOns.reduce((acc, addOn) => acc + addOn.price, 0);
  const finalPrice = selectedPlan.price + addOnsTotalPrice;

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Finishing up"
          description="Double-check everything looks OK before confirming."
        />

        <div className="mt-5 flex flex-col gap-3 bg-very-light-grey rounded-lg p-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 items-start">
              <strong className="text-sm font-medium text-denim sm:text-base">
                {`${selectedPlan.name} (${isYearly ? 'Yearly' : 'Monthly'})`}
              </strong>
              <button
                className="text-sm leading-5 font-normal text-grey underline cursor-pointer hover:text-purple duration-200"
                onClick={handleChangePlan}
              >
                Change
              </button>
            </div>

            <span className="text-sm leading-5 font-bold text-denim sm:text-base">
              {priceFormatter(selectedPlan.price)}
            </span>
          </div>

          {addOns.length > 0 && (
            <div className="h-px w-full bg-border-grey" />
          )}

          {addOns.map((addOn, index) => (
            <AddOnItem
              key={index}
              title={addOn.title}
              price={addOn.price}
              isYearly={isYearly}
            />
          ))}
        </div>

        <TotalPrice
          finalPrice={finalPrice}
          isYearly={isYearly}
        />
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}  // Submitting data when clicking next
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
