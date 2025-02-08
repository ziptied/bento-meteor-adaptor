# Bento Meteor SDK
<img align="right" src="https://app.bentonow.com/brand/logoanim.gif">

> [!TIP]
> Need help? Join our [Discord](https://discord.gg/ssXXFRmt5F) or email jesse@bentonow.com for personalized support.

The Bento Meteor SDK makes it quick and easy to send emails through Meteor's built-in email system. We provide seamless integration with Meteor's email functionality, including account verification emails, password reset emails, and custom transactional emails.

Get started with our [📚 integration guides](https://docs.bentonow.com), or [📘 browse the SDK reference](https://docs.bentonow.com/subscribers).

🐶 Battle-tested by [Artist.tools](https://artist.tools) (a Bento customer)!

❤️ Thank you [@aarongainz](https://github.com/aarongainz) for your contribution.

Table of contents
=================

<!--ts-->
* [Features](#features)
* [Requirements](#requirements)
* [Getting started](#getting-started)
    * [Installation](#installation)
    * [Configuration](#configuration)
* [Usage](#usage)
* [Things to Know](#things-to-know)
* [Contributing](#contributing)
* [License](#license)
<!--te-->

## Features

* **Native Meteor Integration**: Seamlessly integrates with Meteor's built-in email system
* **Account Email Support**: Works with Meteor's account verification and password reset emails
* **Simple Configuration**: Easy setup with environment variables or Meteor settings
* **Type Safety**: Includes TypeScript definitions for all configurations and options

## Requirements

- Meteor 3.1.1+
- meteor-email 3.1.1+
- Bento API Keys

## Getting started

### Installation

Install the package via Meteor:

```bash
meteor add bento:meteor-mail
```

### Configuration

You can configure the package in three ways:

1. Using environment variables:

```bash
BENTO_SITE_UUID=your_site_uuid
BENTO_PUBLISHABLE_KEY=your_publishable_key
BENTO_SECRET_KEY=your_secret_key
```

2. Using Meteor settings (`settings.json`):

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

3. Server setup in your main entry point:

```typescript
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  Accounts.emailTemplates.from = 'your-email@domain.com';
  Accounts.emailTemplates.siteName = 'Your Site Name';

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

Once configured, use Meteor's standard email functionality to send emails through Bento:

```typescript
import { Email } from 'meteor/email';

Email.send({
  to: 'recipient@example.com',
  from: 'sender@yourdomain.com',
  subject: 'Hello',
  text: 'This is a test email sent through Bento!'
});
```

## Things to Know

1. The sender email address (`from`) MUST be configured as an author in your Bento account
2. Bento does not support `no-reply` sender addresses
3. The package will throw a `Meteor.Error` with code 'email-failed' if there are sending issues
4. For older Meteor versions, you may try editing `api.versionsFrom('3.1.1')` in `package.js`, but this is untested
5. For more advanced usage, refer to the [Bento API Documentation](https://docs.bentonow.com)

## Contributing

We welcome contributions! Please see our [contributing guidelines](CODE_OF_CONDUCT.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

The Bento SDK for Meteor is available as open source under the terms of the [MIT License](LICENSE.md).