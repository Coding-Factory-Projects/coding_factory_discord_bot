import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { clientId, clientSecret, redirect } from "../configs/google-config";

type UserInfos = {
  username: string;
  email: string;
};

const defaultScopes = ["profile", "https://www.googleapis.com/auth/userinfo.email"];

const connection = createConnection();

function createConnection() {
  return new google.auth.OAuth2(clientId, clientSecret, redirect);
}

function getConnectionUrl(discordUserId: string, auth: OAuth2Client): string {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScopes,
    state: discordUserId,
  });
}

export function createGoogleUrl(discordUserId: string): string {
  return getConnectionUrl(discordUserId, connection);
}

export async function getUserInfos(accessCode: string): Promise<UserInfos> {
  const token = await connection.getToken({ code: accessCode });
  connection.setCredentials(token.tokens);
  const request = await google
    .people("v1")
    .people.get({ resourceName: "people/me", personFields: "names,emailAddresses", auth: connection });
  return { username: request.data.names[0].displayName, email: request.data.emailAddresses[0].value };
}
