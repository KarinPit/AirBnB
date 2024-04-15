import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Steppers } from "../cmps/Steppers";
import IntroStep1 from "../cmps/CreateHost/IntroStep1";
import CreateHostHeader from "../cmps/Header/CreateHostHeader";
import DescribeStep2 from "../cmps/CreateHost/DescribeStep2";
import PlaceTypeStep3 from "../cmps/CreateHost/PlaceTypeStep3";
import LocationStep4 from "../cmps/CreateHost/LocationStep4";
import AmenitiesStep5 from "../cmps/CreateHost/AmenitiesStep5";
import ImagesStep6 from "../cmps/CreateHost/ImagesStep6";
import TitleStep7 from "../cmps/CreateHost/TitleStep7";
import SummaryStep8 from "../cmps/CreateHost/SummaryStep8";
import PriceStep9 from "../cmps/CreateHost/PriceStep9";
import { saveStay } from "../store/actions/stay.actions";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  name: Yup.string().max(32, "Title must not exceed 32 characters"),
  summary: Yup.string().max(
    500,
    "The maximum number of characters allowed is 500."
  ),
});
const steps = [
  {
    isIntro: true,
    section: {
      components: [{ title: "Introduction", component: IntroStep1 }],
    },
  },
  {
    section: {
      components: [
        {
          title: "Which of these best describes your place?",
          component: DescribeStep2,
        },
        { title: "Section 1 - Skills & Expertise", component: PlaceTypeStep3 },

        {
          title: "Where's your place located?",
          component: LocationStep4,
        },
      ],
    },
  },
  {
    section: {
      components: [
        {
          title: "Tell guests what your place has to offer",
          component: AmenitiesStep5,
        },
        {
          title: "Images",
          component: ImagesStep6,
        },
        {
          title: "Title",
          component: TitleStep7,
        },
        {
          title: "Summary",
          component: SummaryStep8,
        },
      ],
    },
  },
  {
    section: {
      components: [
        {
          title: "Tell guests what your place has to offer",
          component: PriceStep9,
        },
      ],
    },
  },
  // {
  //   section: {
  //     components: [],
  //   },
  // },
];
export default function CreateHostIndex() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  async function handleSubmit(values) {
    console.log("values", values);
    try {
      const payload = {
        ...values,
        imgUrls: values.imgUrls
          .map((img) => img?.imgUrl)
          .filter((notUndefined) => notUndefined),
        labels: values.propertyType,
      };

      saveStay(payload);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    // if (response) {
    //   console.log(res);
    // }
  }

  const onNext = (isValid, dirty, submitForm) => {
    console.log({ isValid });
    if (!isValid) return;
    const allSteps = steps.flatMap((step) => step.section.components);
    if (activeStep === allSteps.length - 1) {
      submitForm();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const onBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const initialValues = {
    amenities: [],
    loc: {},
    type: "",
    imgUrls: [],
    name: "",
    price: 0,
  };
  console.log({ validationSchema });
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CreateHostHeader />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log({ values });
          handleSubmit(values);
        }}
      >
        {({ isValid, dirty, submitForm }) => (
          <Steppers
            steps={steps}
            activeStep={activeStep}
            handleNext={() => onNext(isValid, dirty, submitForm)}
            handleBack={onBack}
            isValid={isValid}
            dirty={dirty}
          />
        )}
      </Formik>
    </div>
  );
}
