import { TEMPLATES, Context } from './mailer.types';

export class Send {
  to: string;
  subject: string;
  template: TEMPLATES;
  context: Context;
}
