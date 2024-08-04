import React, { useState } from "react";
import "./App.css";
import emailjs from "emailjs-com";
function App() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // LiqPay payment integration
    const liqpay = window.LiqPay;
    liqpay.config({
      public_key: process.env.REACT_APP_LIQPAY_PUBLIC_KEY,
      action: "pay",
      amount: 10, // Example amount
      currency: "USD",
      description: "Ticket for MULTIRAVE",
      result_url: window.location.href,
      server_url: "https://your-server-url/liqpay", // You should replace this if needed
    });
    liqpay.checkout();

    // Send email using EmailJS
    const result = await emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { email },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Квиток успішно придбано!");
        },
        (error) => {
          alert("Сталася помилка при покупці квитка.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div className="container">
      <a href="https://www.instagram.com/multi.rave/" target="_blank">
        <img className="icon" src="insta.webp" alt="instagram" srcset="" />
      </a>
      <img src="logo.png" alt="MULTIRAVE" className="event-image" />

      {/* <form onSubmit={handleSubmit}> */}
      {/* <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          placeholder="Введіть ваш email"
          required
          autoComplete="on"
        /> */}
      <button
        type="submit"
        className="btn"
        onClick={() => {
          window.location.replace(
            "https://www.privat24.ua/rd/send_qr/liqpay_static_qr/qr_d03c5a908292449290ab3adf938b82d1"
          );
        }}
      >
        Купити квиток
      </button>
      {/* </form> */}
    </div>
  );
}

export default App;
