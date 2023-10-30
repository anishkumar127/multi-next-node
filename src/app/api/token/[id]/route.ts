import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

import { promises as fs } from "fs";

import path from "path";

async function acquireTokens(tenant: any) {
  const currentDir = process.cwd();

  const filePath = path.resolve(currentDir, "public/private-key.pem");

  const file = await fs.readFile(filePath, "utf8");

  let tokens;
  const config = {
    auth: {
      // clientId: "f3a16a31-d908-4145-b5ef-1d7ce6e03f68", // azure cubic logics.
      clientId: "afb54906-660f-4a68-8178-74c638699fcc", // azure shan cubicdirect.
      authority:
        // "https://login.microsoftonline.com/common",
        `https://login.microsoftonline.com/${tenant}.onmicrosoft.com`,
      clientCertificate: {
        thumbprint: "EC0763FD45A99CF857765451DAF32ABD1BCDCA1A",
        privateKey: file,
      },
    },
  };
  const clientApplication = new ConfidentialClientApplication(config);
  const request = {
    scopes: [`https://${tenant}.sharepoint.com/.default`],
  };
  try {
    const response = await clientApplication.acquireTokenByClientCredential(
      request
    );
    console.log("response =>", response);

    const accessToken = response?.accessToken;
    tokens = accessToken;
  } catch (error) {
    console.error(`Failed to obtain access token for tenant `, error);
  }
  return tokens;
}

export async function GET(req: Request, res: Response) {
  try {
    const siteUrl = req?.url?.split("token/")[1];
    console.log("siteUrl", siteUrl);
    if (siteUrl) {
      const tokens = await acquireTokens(siteUrl);
      console.log(`API AC Token ${siteUrl}`, tokens);
      if (tokens) {
        return NextResponse.json({ tokens });
      }
      return NextResponse.json({ error: false });
    }
    return NextResponse.json({ error: "Failed to acquire tokens" });
  } catch (error) {
    console.error("Error GETTING Token", error);
    return NextResponse.json({ error: "Failed to acquire tokens" });
  }
}
