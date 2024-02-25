import { error } from "console";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: Request){
    const incoming = await request.json()
    console.info(await incoming)
    const octokit = new Octokit({
        auth: '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'
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