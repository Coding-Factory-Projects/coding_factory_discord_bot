import fetch from "node-fetch";
import { logger } from "../loggers/logger";
import { mailgun_api_key, mailgun_domain } from "../configs/mailgun-config";


export async function sendEmail(url: string, to: string): Promise<boolean> {
    try {
        const body = new URLSearchParams({
            'from': `Coding Bot <bot@${mailgun_domain}>`,
            'to': to,
            'subject': 'Inscription au serveur de la Coding factory',
            'text': `
                Salut !
                Pour finaliser ton inscription au serveur, suis ce lien ${url} !
            `
        });


        const credentials = Buffer.from(`api:${mailgun_api_key}`).toString("base64")
        const response = await fetch(`https://api.eu.mailgun.net/v3/${mailgun_domain}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Basic ${credentials}`
            },
            body
        })

        const json = await response.text()

        return true;
    } catch(error) {
        logger.error("An error occured white sending the email, " + JSON.stringify(error));
        return false;
    }
}