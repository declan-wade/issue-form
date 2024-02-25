"use client";
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {useSearchParams } from 'next/navigation'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';

export default function Success() {
    const searchParams = useSearchParams()
    const id = searchParams.get("issue_id");
    const url: any = searchParams.get("issue_url");
    console.log(id)
    console.log(url)
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
        <Card body bg="secondary" text="light">
        <h5>Your issue reference: #{id}</h5>
        <Button variant="outline-light" href={url}>View issue on GitHub</Button>
        </Card>
        <br></br>

      </div>
    </div>
  );
}
