import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(request: Request){
    try {
    const octokit = new Octokit({
        auth: process.env.OCTOKIT_TOKEN
      })
    await octokit.request('POST /repos/declan-wade/roster-master/issues', {
    owner: 'declan-wade',
    repo: 'roster-master',
    title: 'Found a bug',
    body: request.body,
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}