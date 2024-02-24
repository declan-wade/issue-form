import { error } from "console";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: Request){
    const incoming = await request.json()
    const body = incoming.body
    console.info(incoming)
    try {
    const octokit = new Octokit({
        auth: process.env.OCTOKIT_TOKEN
      })
    await octokit.request('POST /repos/declan-wade/roster-master/issues', {
    owner: 'declan-wade',
    repo: 'roster-master',
    title: 'Found a bug',
    body: `Name or Company: ${body.name}
    Description: ${body.description}
    Attachments: ${body.attachments}
    `,
    assignees: [
        'declan-wade'
    ],
    labels: [
        'bug'
    ],
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
    }).then((response)=> {
        return NextResponse.json(response);
    })

    
  } catch {
    console.error("GitHub POST request failed: ", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}