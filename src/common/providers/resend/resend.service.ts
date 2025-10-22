import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ResendService {
  private readonly logger = new Logger(ResendService.name);

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not defined');
    }
  }

  private getTemplate(
    templateName: string,
    replacements: Record<string, string>,
  ) {
    const filePath = join(process.cwd(), 'templates', `${templateName}.html`);

    if (!filePath) {
      this.logger.error(`Email template not found: ${templateName}`);
      throw new Error(`Email template not found: ${templateName}`);
    }

    this.logger.log(`Loading email template from: ${filePath}`);
    let template = readFileSync(filePath, 'utf8');

    for (const key in replacements) {
      template = template.replace(
        new RegExp(`{{${key}}}`, 'g'),
        replacements[key],
      );
    }

    return template;
  }

  async sendEmail(to: string, subject: string, html: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Tracking My Workout <welcome@trackingmyworkout.com>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      this.logger.error(`Error sending email: ${JSON.stringify(error)}`);
      throw error;
    }

    this.logger.log(`Email sent successfully: ${JSON.stringify(data)}`);
  }

  async sendAccountConfirmationEmail(
    email: string,
    token: string,
    name?: string,
  ) {
    this.logger.log(
      `Sending confirmation email to: ${email} with token: ${token}`,
    );
    const html = this.getTemplate('account-confirmation', {
      name: name || 'User',
      token,
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
    });

    await this.sendEmail(
      email,
      // 'pericles.code@gmail.com', // TODO: remover depois dos testes
      'Tracking My Workout - Confirm your email',
      html,
    );
  }
}
