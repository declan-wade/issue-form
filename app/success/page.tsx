"use client";
import React, { Suspense, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Id from "./id";

export default function Success() {

  return (
    <div>
      <Navbar expand="lg" bg="warning" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/avatar.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Raise an Issue</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <h3>Submitted successfully!</h3>
        <p>We have got your issue, leave it with us while we investigate!</p>
        <Suspense>
          <Id></Id>
        </Suspense>
        <br></br>

      </div>
    </div>
  );
}
