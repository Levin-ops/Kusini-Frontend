import React, { useState } from "react";
import "./Faqs.css";

const faqData = [
  {
    question: "What is Kusini Liquor's delivery policy?",
    answer:
      "We offer drink delivery services in Kilifi. Orders are typically delivered within 1-2 hours from Monday to Friday.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, mobile payments (M-Pesa), Cash on Delivery and Mpesa on Delivery. Payment is processed securely through our platform.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have a 7-day return policy for unopened and undamaged products. Please contact our support team for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is dispatched, we will send you the delivery timeline via SMS. Expect delivery within 1-2 hrs after ordering.",
  },
];

function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    fetch("https://kusini-backend-1.onrender.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, message: message }),
    })
      .then((response) => {
        response.json();
      })
      .then((response) => {
        if (response.status === 200) {
          setSubmitted(true);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => setError(error));

    console.log(email, message);
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (submitted) {
    return <p>Thank you for your feedback!</p>;
  }

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">{faq.question}</div>
          <div className="faq-answer">{faq.answer}</div>
        </div>
      ))}
      <div className="feedback">
        <h2>Leave a Feedback</h2>
        <form onSubmit={submit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <br />
          <label htmlFor="message">Message</label>

          <textarea
            type="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Faqs;
