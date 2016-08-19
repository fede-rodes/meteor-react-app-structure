import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const user = Meteor.settings.mailgun.user;
const password = Meteor.settings.mailgun.password;
process.env.MAIL_URL = `smtp://postmaster%40${user}:${password}@smtp.mailgun.org:587`;
/*
Accounts.emailTemplates settings goes here
*/
