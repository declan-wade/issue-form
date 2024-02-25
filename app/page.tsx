"use client";
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import type { PutBlobResult } from "@vercel/blob";
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [blobUrl, setBlobUrl] = React.useState("")
  const [filename, setFilename] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const updateFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
  }

  const handleUpload = async (e: any) => {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = inputFileRef.current.files[0];
    const response = await fetch(
      `/api/handleUpload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );
    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    setBlobUrl(newBlob.url)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name.length > 1) {
      const response = await fetch(
        `/api/handleSubmit`,
        {
          method: "POST",
          body: JSON.stringify({"name": name, "description": description, "attachment": blobUrl}),
        }
      );
      const payload = await response.json()
        console.log(payload)
        if (response.ok) {
          window.location.assign(`/success?issue_id=${payload.data.number}&issue_url=${payload.data.html_url}`);
        } else {
          setOpenError(true);
        }
    } else {
      setNameValid(false);
    }

  };


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
        <h3>👋 Start Here</h3>
        <br></br>
        <ToastContainer
          className="p-3"
          position='top-end'
          style={{ zIndex: 1 }}
        >
        <Toast show={openError} delay={6000}>
        <Toast.Header>Error</Toast.Header>
        <Toast.Body>
          There was an error submitting the form!
        </Toast.Body>
      </Toast>
      <Toast show={openSuccess} delay={6000}>
        <Toast.Header>Success</Toast.Header>
        <Toast.Body>
          Form submitted successfully!
        </Toast.Body>
      </Toast>
      </ToastContainer>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label className="form-label">Name or Company</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Label className="form-label">Description of issue</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Screenshots or supporting images</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="file" multiple ref={inputFileRef} onChange={updateFilename} />
              <Button onClick={handleUpload} disabled={filename.length <= 0}>Upload</Button>
            </InputGroup>
          </div>
          <br></br>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
