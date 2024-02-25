"use client";
import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import { useSearchParams } from "next/navigation";

const Id: React.FC = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("issue_id");
    const url: any = searchParams.get("issue_url");
    console.log(id)
    console.log(url)

    return (
        <div>
            {url ? (
                <Card body bg="secondary" text="light">
                    <h5>Your issue reference: #{id}</h5>
                    <Button variant="outline-light" href={url}>View issue on GitHub</Button>
                </Card>
            ) : (
                <h3>Loading</h3>
            )}
        </div>
    );
};

export default Id;