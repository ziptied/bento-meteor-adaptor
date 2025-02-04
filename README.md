# Bento Meteor Mail

A Meteor package that provides Bento email transport integration for your Meteor application.

Usually, you could just use the Bento SDK, but this package enables you to integrate into Meteor's email system, which is useful for baked-in features like account verification emails, password reset emails, etc.

This was created for Meteor 3.1.1 (using meteor-email 3.1.1).

If you're running an older version, you could try editing `api.versionsFrom('3.1.1');` in the `package.js` file to accept older versions of Meteor (although this has not been tested).

## Installation

Put this package in your `packages` directory, then run:
```bash
meteor add bento:meteor-mail
```

## Configuration

### 1. Environment Variables

You can configure the package using environment variables:

```bash
BENTO_SITE_UUID=your_site_uuid
BENTO_PUBLISHABLE_KEY=your_publishable_key
BENTO_SECRET_KEY=your_secret_key
```

### 2. Meteor Settings

Alternatively, you can configure through `settings.json`:

```json
{
  "private": {
    "bento": {
      "siteUuid": "your_site_uuid",
      "publishableKey": "your_publishable_key",
      "secretKey": "your_secret_key"
    }
  }
}
```

### 3. Server Setup

In your server's main entry point (e.g., `server/main.ts`), add the following configuration:

```typescript
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { configureBentoMail } from 'meteor/bento:meteor-mail';

Meteor.startup(() => {
  // Configure Bento Mail Transport
  configureBentoMail();

  // Configure email templates
  Accounts.emailTemplates.from = 'your-email@domain.com';
  Accounts.emailTemplates.siteName = 'Your Site Name';

  // Configure verification email template
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return 'Verify your email address';
    },
    text(user, url) {
      return `Hello ${user.profile?.name || 'there'}!\n\n`
        + 'To verify your email address, simply click the link below:\n\n'
        + url;
    }
  };
});
```

## Usage

Once configured, you can use Meteor's standard email functionality, and emails will be sent through Bento:

```typescript
import { Email } from 'meteor/email';

Email.send({
  to: 'recipient@example.com',
  from: 'sender@yourdomain.com',
  subject: 'Hello',
  text: 'This is a test email sent through Bento!'
});
```

## Types

The package includes TypeScript definitions for configuration and email options:

```typescript
interface BentoMailConfig {
  siteUuid: string;
  publishableKey: string;
  secretKey: string;
}

interface BentoMailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
}
```

## Error Handling

The package will throw a `Meteor.Error` with the code 'email-failed' if there are any issues sending emails through Bento. Make sure to handle these errors appropriately in your application.

## Dependencies

- @bentonow/bento-node-sdk: ^1.0.4
- meteor-node-stubs (peer dependency)