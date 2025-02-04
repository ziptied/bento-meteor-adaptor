import { Analytics } from '@bentonow/bento-node-sdk';
import { Meteor } from 'meteor/meteor';
import type { BentoMailConfig, BentoMailOptions } from './types';

export class BentoTransport {
    private bento: Analytics;

    constructor(private readonly config: BentoMailConfig) {
        this.bento = new Analytics({
            siteUuid: config.siteUuid,
            authentication: {
                publishableKey: config.publishableKey,
                secretKey: config.secretKey
            }
        });
    }

    async sendMail(mail: BentoMailOptions) {
        try {
            const email = {
                to: Array.isArray(mail.to) ? mail.to.join(',') : mail.to,
                from: mail.from,
                subject: mail.subject,
                html_body: mail.html || mail.text || '',
                transactional: true
            };

            const result = await this.bento.V1.Batch.sendTransactionalEmails({
                emails: [email]
            });

            return {
                messageId: `bento-${Date.now()}`,
                response: `Message sent successfully: ${result} email(s) delivered`
            };
        } catch (error) {
            throw new Meteor.Error('email-failed', 'Failed to send email via Bento', error);
        }
    }
}