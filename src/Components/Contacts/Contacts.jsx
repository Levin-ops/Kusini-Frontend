import React, { useState } from "react";
import "./Contacts.css";

function Contacts() {
  return (
    <div className="contacts">
      <h2> Location & Contacts</h2>

      <div className="location-details">
        <p>
          <strong>Store Location:</strong> 123 Kusini Avenue, Kilifi, 00100
        </p>
        <p>
          <strong>Store Hours:</strong>
        </p>
        <ul>
          <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
          <li>Saturday: 10:00 AM - 6:00 PM</li>
          <li>Sunday: 11:00 AM - 5:00 PM</li>
        </ul>
        <p>
          <strong>Delivery/Pickup Zones:</strong> Kilifi town, Outside Kilifi
        </p>
        <p>
          <strong>Contact Information:</strong> Phone: +254-700-123-456 | Email:
          contact@kusiniliquor.com
        </p>
      </div>
    </div>
  );
}

export default Contacts;
