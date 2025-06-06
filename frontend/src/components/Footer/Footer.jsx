import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets.js";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
            pariatur.
          </p>
          <div className="footer-social-icons">
            <a href="">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="">
              <img src={assets.twitter_icon} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/tarunjangra41/"
              target="_blank"
            >
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@cravix.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        Copyright 2024 © cravix.com - All Right Reserved. <br />
        Made By Tarun Jangra
      </div>
    </div>
  );
};

export default Footer;
