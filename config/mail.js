"use strict";

const Helpers = use("Helpers");
const Env = use("Env");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | Connection to be used for sending emails. Each connection needs to
  | define a driver too.
  |
  */
  connection: Env.get("MAIL_CONNECTION", "smtp"),

  /*
  |--------------------------------------------------------------------------
  | SMTP
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for sending emails via SMTP.
  |
  */
  smtp: {
    driver: "smtp",
    pool: true,
    port: Env.get("SMTP_PORT"),
    host: Env.get("SMTP_HOST"),
    secure: Env.get("SMTP_SECURE"),
    requireTLS: Env.get("SMTP_TLS"),
    auth: {
      user: Env.get("MAIL_USERNAME"),
      pass: Env.get("MAIL_PASSWORD")
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  },

  /*
  |--------------------------------------------------------------------------
  | SparkPost
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for spark post. Extra options can be defined
  | inside the `extra` object.
  |
  | https://developer.sparkpost.com/api/transmissions.html#header-options-attributes
  |
  | extras: {
  |   campaign_id: 'sparkpost campaign id',
  |   options: { // sparkpost options }
  | }
  |
  */
  sparkpost: {
    driver: "sparkpost",
    apiKey: Env.get("SPARKPOST_API_KEY"),
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Mailgun
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for mailgun. Extra options can be defined
  | inside the `extra` object.
  |
  | https://mailgun-documentation.readthedocs.io/en/latest/api-sending.html#sending
  |
  | extras: {
  |   'o:tag': '',
  |   'o:campaign': '',,
  |   . . .
  | }
  |
  */
  mailgun: {
    driver: "mailgun",
    domain: Env.get("MAILGUN_DOMAIN"),
    apiKey: Env.get("MAILGUN_API_KEY"),
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Ethereal
  |--------------------------------------------------------------------------
  |
  | Ethereal driver to quickly test emails in your browser. A disposable
  | account is created automatically for you.
  |
  | https://ethereal.email
  |
  */
  ethereal: {
    driver: "ethereal"
  },

  /*
   |--------------------------------------------------------------------------
   | Amazon SES
   |--------------------------------------------------------------------------
   |
   | Here we define api credentials for Amazon SES account. Make sure you have
   | verified your domain and email address, before you can send emails.
   |
   */
  ses: {
    driver: "ses",
    accessKeyId: Env.get("SES_KEY"),
    secretAccessKey: Env.get("SES_ACCESS_KEY"),
    region: Env.get("SES_REGION")
  },

  /*
   |--------------------------------------------------------------------------
   | Log
   |--------------------------------------------------------------------------
   |
   | Log driver is mainly for testing your emails expectations. Emails are
   | written inside a log file, which can be used for inspection.
   |
   */
  log: {
    toPath: Helpers.tmpPath("mail.eml")
  }
};
