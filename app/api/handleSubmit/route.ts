import { error } from "console";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: Request){
    const incoming = await request.json()
    console.info(await incoming)
    const octokit = new Octokit({
        auth: process.env.OCTOKIT_TOKEN
      })
    const response = await octokit.request('POST /repos/declan-wade/roster-master/issues', {
    owner: 'declan-wade',
    repo: 'roster-master',
    title: 'Found a bug',
    body: `Name or Company: ${incoming.name}
    Description: ${incoming.description}
    Attachments: ${incoming.attachment}
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
    })
    return NextResponse.json(response);
    
}