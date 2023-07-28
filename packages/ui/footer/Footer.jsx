import React, { useState } from "react";
import { Button } from "@mantine/core";
import "./footer.css";
export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-02">
        <div className="footer-item">
          <h5 className="footer-title">EYCommerce</h5>
        </div>
        <div className="footer-item">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">FAQ</a>
        </div>
        <div className="footer-item">
          <div className="footer-item-03">
            <p>@2019 All Rights Reserved</p>
            <div className="footer-item-bottom">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
