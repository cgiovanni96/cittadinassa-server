import { TEMPLATES, Context } from './mailer.types';

export class Send {
  to: string;
  subject: string;
  from?: string;
  templated?: {
    template?: TEMPLATES;
    context?: Context;
  };
  html?: string;
}
