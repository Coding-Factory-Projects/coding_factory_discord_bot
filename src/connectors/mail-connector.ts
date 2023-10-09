import fetch from "node-fetch";
import { logger } from "../loggers/logger";
import { mailgun_api_url, mailgun_domain } from "configs/mailgun-config";


export async function sendEmail(url: string, to: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Basic api:${mailgun_api_url}`
            },
            body: JSON.stringify({
                from: `Coding Bot <bot@${mailgun_domain}>`,
                to,
                subject: "Inscription au serveur de la Coding factory",
                text: `
                    Salut !
                    Pour finaliser ton inscription au serveur, suis ce lien ${url} !
                `
            })
        })

        const json = await response.json()

        return true;
    } catch(error) {
        logger.error("An error occured white sending the email, " + JSON.stringify(error));
        return false;
    }
}