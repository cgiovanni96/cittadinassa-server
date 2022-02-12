import { Context } from 'src/types/context.type';
import { TEMPLATES } from 'src/types/template.type';

export type EmailDto = {
  to: string;
  subject: string;
  from?: string;
  templated?: {
    template?: TEMPLATES;
    context?: Context;
  };
  html?: string;
};
