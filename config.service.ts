import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3333),
      SESSION_SECRET: Joi.string(),
      TYPEORM_CONNECTION: Joi.string()
      .valid(['mysql', 'postgres', 'mariadb', 'sqlite', 'cordova', 'nativescript', 'oracle', 'mssql', 'mongodb', 'sqljs', 'react-native'])
      .required(),
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_USERNAME: Joi.string(),
      TYPEORM_PASSWORD: Joi.string(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_PORT: Joi.number().default(3306),
      TYPEORM_SYNCHRONIZE: Joi.boolean().default(true),
      TYPEORM_ENTITIES: Joi.string().default(['src/**/**.entity{.ts,.js}']),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get nodeEnv(): string {
    return String(this.envConfig.NODE_ENV);
  }

  get port(): string {
    return String(this.envConfig.PORT);
  }

  get sessionSecret(): string {
      return String(this.envConfig.SESSION_SECRET);
  }
}