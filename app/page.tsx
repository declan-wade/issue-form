"use client";
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import type { PutBlobResult } from "@vercel/blob";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [blobUrl, setBlobUrl] = React.useState("")
  const [filename, setFilename] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);

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
        `/api/handleUpload`,
        {
          method: "POST",
          body: JSON.stringify({"name": name, "description": description}),
        }
      );
        console.log(response)
    } else {
      setNameValid(false);
    }
  };


  return (
    <div>
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
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
        <h4>👋 Start Here</h4>
        <br></br>
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
