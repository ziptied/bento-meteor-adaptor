declare module 'meteor/bento:meteor-mail' {
  export function configureBentoMail(): void;
  
  export interface BentoMailConfig {
    siteUuid: string;
    publishableKey: string;
    secretKey: string;
  }

  export interface BentoMailOptions {
    to: string | string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    headers?: Record<string, string>;
  }
} 