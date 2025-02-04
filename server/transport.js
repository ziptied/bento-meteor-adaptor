import { Analytics } from '@bentonow/bento-node-sdk';
import { Meteor } from 'meteor/meteor';

export class BentoTransport {
    constructor(config) {
        this.bento = new Analytics({
            authentication: {
                publishableKey: config.publishableKey,
                secretKey: config.secretKey
            },
            logErrors: true,
            siteUuid: config.siteUuid,
        });
    }

    async sendMail(mail) {
        try {
            const email = {
                to: Array.isArray(mail.to) ? mail.to.join(',') : mail.to,
                from: mail.from,
                subject: mail.subject,
                html_body: `<html><body>${mail.html || mail.text || ''}</body></html>`,
                transactional: true
            };

            const result = await this.bento.V1.Batch.sendTransactionalEmails({
                emails: [email],
                site_uuid: this.bento.V1._client._siteUuid
            });

            return {
                messageId: `bento-${Date.now()}`,
                response: `Message sent successfully: ${result} email(s) delivered`
            };
        } catch (error) {
            console.error('bento:meteor-mail error:', error);
            const message = error instanceof Error ? error.message : String(error);
            throw new Meteor.Error('email-failed', 'Failed to send email via Bento', message); // Meteor Error constructor only takes in a message
        }
    }
}