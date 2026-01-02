import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'

export const AWS_COGNITO_CLIENT = 'AWS_COGNITO_CLIENT'

export const CognitoProvider: Provider = {
  provide: AWS_COGNITO_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const region = configService.getOrThrow<string>('AWS_COGNITO_REGION')
    const accessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID')
    const secretAccessKey = configService.get<string>('AWS_SECRET_ACCESS_KEY')

    // Suporta IAM roles (sem credentials) ou access keys
    const clientConfig = {
      region,
      ...(accessKeyId && secretAccessKey ? { credentials: { accessKeyId, secretAccessKey } } : {}),
    }

    return new CognitoIdentityProviderClient(clientConfig)
  },
}
