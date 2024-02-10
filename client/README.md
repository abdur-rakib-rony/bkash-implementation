# React Card Component with Bkash Checkout Integration

This repository contains a React component (`Card`) that represents a product card. It includes an image, product details, pricing information, and a "Buy Now" button. Additionally, it integrates Bkash checkout functionality to facilitate payments.

## Features

- Displays product image, name, price, and rating.
- Implements Bkash checkout integration for seamless payments.
- Provides a responsive and visually appealing design.

## Installation

1. Call backend bkash api:

   ```bash
    await axios
     .post("http://localhost:8000/bkash-checkout", {
       amount: 1200 || 0,
       orderID: "123456", // add your orderID
       reference: "ref01", // add your reference
       callbackURL: "http://localhost:8000/bkash-callback", //bkash backend callback url
    })
     .then((response) => {
      console.log(response?.data?.bkashURL)
    window.location.href = response?.data?.bkashURL
   })
    .catch((error) => {
     console.log("An error occurred:", error)
   })
   }
   ```
