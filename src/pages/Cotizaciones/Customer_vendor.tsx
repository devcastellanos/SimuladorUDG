import React, { useState } from "react";
import './Form.css';  // o el nombre de tu archivo CSS
import Layout from '@/components/Layout';

const Form: React.FC = () => {
  const [customer, setCustomer] = useState("");
  const [representative, setRepresentative] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street_address, setStreet_address] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { customer, representative, phone, email, street_address, city, state, country, zip_code };

    try {
      const response = await fetch("http://localhost:5000/save-data", {
        //const response = await fetch("https://simulador-udg.vercel.app/api/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResponseMessage(result.message);
      setCustomer("");
      setRepresentative("");
      setPhone("");
      setEmail("");
      setStreet_address("");
      setCity("");
      setState("");
      setCountry("");
      setZip_code("");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setResponseMessage("Hubo un error al guardar los datos.");
    }
  };

  return (
    <Layout>
    <div className="form-container">
      <h1 className="title">Customer-Vendor</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="customer">Customer/Lead:</label>
          <input
            type="text"
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="representative">Representative:</label>
          <input
            type="text"
            id="representative"
            value={representative}
            onChange={(e) => setRepresentative(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street_address">Street Address:</label>
          <input
            type="text"
            id="street_address"
            value={street_address}
            onChange={(e) => setStreet_address(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip_code">Zip Code:</label>
          <input
            id="zip_code"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit" className="submit-button">Guardar</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
    </Layout>
  );
};

export default Form;
