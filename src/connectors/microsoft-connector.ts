import fetch from "node-fetch"
import * as FormData from "form-data"
import { clientId, clientSecret, redirect } from "../configs/microsoft-config";

type UserInfos = {
  username: string;
  email: string;
};

const defaultScopes = ["user.read", "mail.read"];

export function createMicrosoftUrl(discordUserId: string): string {
  const url = new URL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")
  url.searchParams.append("response_type", "code")
  url.searchParams.append("client_id", clientId)
  url.searchParams.append("redirect_uri", redirect)
  url.searchParams.append("response_mode", "query")
  url.searchParams.append("scope", defaultScopes.join(" "))
  url.searchParams.append("state", discordUserId)

  return url.toString()
}

async function getAccessToken(accessCode: string): Promise<string> {
  const body = new URLSearchParams()
  body.append("client_id", clientId)
  body.append("scope", defaultScopes.join(" "))
  body.append("code", accessCode)
  body.append("grant_type", "authorization_code")
  body.append("client_secret", clientSecret)
  body.append("redirect_uri", redirect)

  const response = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  })
  const tokenResponse = await response.json()
  return tokenResponse["access_token"]
}

export async function getUserInfos(accessCode: string): Promise<UserInfos> {
  const access_token = await getAccessToken(accessCode)

  const userResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  const user = await userResponse.json()
  console.log(user)
  return { username: user.displayName, email: user.mail };
}
