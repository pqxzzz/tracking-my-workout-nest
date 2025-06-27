import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SendGridService {
  private readonly logger = new Logger(SendGridService.name);

  constructor() {
    const apiKey = process.env.SENDGRID_KEY;
    if (!apiKey) {
      this.logger.error('SENDGRID_KEY environment variable is not defined');
      throw new Error('SENDGRID_KEY environment variable is not defined');
    }
    sgMail.setApiKey(apiKey);
    this.logger.log('SendGrid service initialized successfully');
  }

  async sendEmail(to: string, subject: string, html: string) {
    const sender = process.env.SENDGRID_SENDER;
    if (!sender) {
      this.logger.error('SENDGRID_SENDER environment variable is not defined');
      throw new Error('SENDGRID_SENDER environment variable is not defined');
    }

    const msg = {
      to,
      from: sender,
      subject,
      html,
    };

    this.logger.log(`Attempting to send email to: ${to} from: ${sender}`);

    try {
      await sgMail.send(msg);
      this.logger.log(`Email sent successfully to: ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendAccountConfirmationEmail(
    email: string,
    token: string,
    name?: string,
  ) {
    this.logger.log(
      `Sending confirmation email to: ${email} with token: ${token}`,
    );

    // Try multiple possible paths for the template
    const possiblePaths = [
      join(__dirname, '../../emails/account-confirmation.html'), // Production path
      join(__dirname, '../../../src/common/emails/account-confirmation.html'), // Development path
      join(process.cwd(), 'src/common/emails/account-confirmation.html'), // Alternative development path
    ];

    let html: string | undefined;
    let templatePath: string | undefined;

    for (const path of possiblePaths) {
      try {
        html = readFileSync(path, 'utf8');
        templatePath = path;
        this.logger.log(`Email template found at: ${path}`);
        break;
      } catch (error) {
        this.logger.debug(`Template not found at: ${path}`);
        // Continue to next path if this one doesn't exist
        continue;
      }
    }

    if (!html) {
      const errorMsg = `Email template not found. Tried paths: ${possiblePaths.join(', ')}`;
      this.logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    html = html.replace('{{name}}', name || 'there');
    html = html.replace('{{token}}', token);
    html = html.replace(
      '{{frontendUrl}}',
      process.env.FRONTEND_URL || 'http://localhost:3000',
    );

    await this.sendEmail(email, 'Confirm your account', html);
  }
}
