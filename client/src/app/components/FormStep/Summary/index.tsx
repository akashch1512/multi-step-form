import { Fragment, useEffect, useState } from "react";
import { useForm } from "../../../hooks/use-form";
import { useFormStep } from "../../../hooks/use-form-step";
import { priceFormatter } from "../../../util/price-formatter";
import { Footer } from "../../Footer";
import Form from "../../Form";
import { PostConfirmation } from "./PostConfirmation";
import { TotalPrice } from "./TotalPrice";
import { AddOnItem } from "./AddOnItem";
import axios, { AxiosError } from 'axios';  // Import AxiosError

export function Summary() {
  const [submitted, setSubmitted] = useState(false);
  const { handlePreviousStep, moveToStep } = useFormStep();
  const { addOns, selectedPlan, isYearly, clearForm, ...userInfo } = useForm();

  // Function to handle submission and send data to the server
  async function handleGoForwardStep() {
    try {
      const userData = {
        ...userInfo,
        plan: selectedPlan?.name || "No Plan Selected",
        isYearly: isYearly,
        addOns: addOns.map(addOn => ({
          title: addOn.title,
          price: addOn.price,
        })),
        totalPrice: (selectedPlan?.price || 0) + addOns.reduce((acc, addOn) => acc + addOn.price, 0),
      };

      const response = await axios.post('https://server-dusky-eight.vercel.app/api/save-data', userData, {
        timeout: 5000,
      });
      console.log('Server response:', response.data);
      setSubmitted(true);
    } catch (error) {
      const axiosError = error as AxiosError;  // Assert error as AxiosError
      console.error('Error saving data to server:', axiosError);
      
      if (axiosError.response) {
        console.error('Response data:', axiosError.response.data);
        console.error('Response status:', axiosError.response.status);
      } else if (axiosError.request) {
        console.error('Request data:', axiosError.request);
      } else {
        console.error('Error message:', axiosError.message);
      }
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
  }, [submitted, moveToStep, clearForm]);

  if (submitted) {
    return <PostConfirmation />;
  }

  const addOnsTotalPrice = addOns.reduce((acc, addOn) => acc + addOn.price, 0);
  const finalPrice = (selectedPlan?.price || 0) + addOnsTotalPrice;

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
                {`${selectedPlan?.name || 'No Plan Selected'} (${isYearly ? 'Yearly' : 'Monthly'})`}
              </strong>
              <button
                className="text-sm leading-5 font-normal text-grey underline cursor-pointer hover:text-purple duration-200"
                onClick={handleChangePlan}
              >
                Change
              </button>
            </div>
            <span className="text-sm leading-5 font-bold text-denim sm:text-base">
              {priceFormatter(selectedPlan?.price || 0)}
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
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
