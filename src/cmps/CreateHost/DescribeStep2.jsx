import React, { useEffect, useState } from "react";
import CardSelectList from "../../cmps/CardSelect/CardSelectList";
import { fetchImages } from "../../services/data.service";

export default function DescribeStep2({ formik }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages()
      .then((imgs) => {
        // Map the images right after fetching
        const mappedOptions = imgs.map((image) => ({
          title: image.title,
          icon: `/assets/img/filter-category/${image.src}`,
        }));
        setOptions(mappedOptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch images:", error);
        setLoading(false);
        // Optionally set an error state and show an error message
      });
  }, []);

  if (loading) return <div>Loading...</div>; // Improved loading state check

  return (
    <section className="describe-step-2">
      <h1>Which of these best describes your place?</h1>
      <div className="describe-step-2-list">
        <CardSelectList
          options={options}
          name="propertyType"
          className="card"
        />
      </div>
    </section>
  );
}
