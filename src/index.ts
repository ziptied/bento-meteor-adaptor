import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { BentoTransport } from './transport';
import type { BentoMailConfig } from './types';

export function configureBentoMail() {
    const settings = Meteor.settings.private?.bento || {};
    const config: BentoMailConfig = {
        siteUuid: settings.siteUuid || process.env.BENTO_SITE_UUID,
        publishableKey: settings.publishableKey || process.env.BENTO_PUBLISHABLE_KEY,
        secretKey: settings.secretKey || process.env.BENTO_SECRET_KEY
    };

    if (!config.siteUuid || !config.publishableKey || !config.secretKey) {
        throw new Error(
            'Bento credentials not configured. Set in Meteor.settings.private.bento or environment variables'
        );
    }

    const transport = new BentoTransport(config);
    process.env.MAIL_URL = 'bento://configured';
    Email._interchange = () => transport;
}

export * from './types';