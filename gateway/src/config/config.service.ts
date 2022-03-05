type RabbitQueue = {
  [key: string]: string;
};

export type EnvConfig = {
  port?: string;
  rabbit?: {
    host: string;
    queues: RabbitQueue;
  };
  aws?: {
    region: string;
    key: {
      access: string;
      secret: string;
    };
    buckets: {
      fishCover: string;
    };
  };
  globalCodename?: string;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.port = process.env.API_GATEWAY_PORT;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queues: {
        user: process.env.RABBITMQ_USER_QUEUE_NAME,
        token: process.env.RABBITMQ_TOKEN_QUEUE_NAME,
        mailer: process.env.RABBITMQ_MAILER_QUEUE_NAME,
        net: process.env.RABBITMQ_NET_QUEUE_NAME,
      },
    };

    this.envConfig.aws = {
      region: process.env.AWS_REGION,
      key: {
        access: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
      },
      buckets: {
        fishCover: process.env.AWS_BUCKET_FISH_COVER,
      },
    };

    this.envConfig.globalCodename = process.env.GLOBAL_CODENAME;
  }

  get(key: keyof EnvConfig): any {
    return this.envConfig[key];
  }
}
