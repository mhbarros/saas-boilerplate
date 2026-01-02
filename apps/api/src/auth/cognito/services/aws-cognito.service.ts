import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
  SetUserMFAPreferenceCommand,
  SignUpCommand,
  VerifySoftwareTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AWS_COGNITO_CLIENT } from '../providers/cognito.provider'
import * as crypto from 'crypto'

@Injectable()
export class AwsCognitoService {
  private readonly userPoolId: string
  private readonly clientId: string
  private readonly clientSecret?: string

  constructor(
    @Inject(AWS_COGNITO_CLIENT)
    private readonly cognitoClient: CognitoIdentityProviderClient,
    private readonly configService: ConfigService
  ) {
    this.userPoolId = this.configService.getOrThrow('AWS_COGNITO_USER_POOL_ID')
    this.clientId = this.configService.getOrThrow('AWS_COGNITO_CLIENT_ID')
    this.clientSecret = this.configService.get('AWS_COGNITO_CLIENT_SECRET')
  }

  private calculateSecretHash(username: string): string {
    if (!this.clientSecret) return ''

    const message = username + this.clientId
    return crypto.createHmac('sha256', this.clientSecret).update(message).digest('base64')
  }

  async register(email: string, password: string, name?: string) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: email,
      Password: password,
      SecretHash: this.calculateSecretHash(email),
      UserAttributes: [{ Name: 'email', Value: email }, ...(name ? [{ Name: 'name', Value: name }] : [])],
    })

    return await this.cognitoClient.send(command)
  }

  async login(username: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.calculateSecretHash(username),
      },
    })

    return await this.cognitoClient.send(command)
  }

  async forgotPassword(username: string) {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.calculateSecretHash(username),
    })

    return await this.cognitoClient.send(command)
  }

  async confirmForgotPassword(username: string, code: string, newPassword: string) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
      SecretHash: this.calculateSecretHash(username),
    })

    return await this.cognitoClient.send(command)
  }

  async confirmSignUp(username: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: username,
      ConfirmationCode: code,
      SecretHash: this.calculateSecretHash(username),
    })

    return await this.cognitoClient.send(command)
  }

  async setupMFA(accessToken: string) {
    const command = new AssociateSoftwareTokenCommand({
      AccessToken: accessToken,
    })

    return await this.cognitoClient.send(command)
  }

  async verifyMFASetup(accessToken: string, code: string) {
    const verifyCommand = new VerifySoftwareTokenCommand({
      AccessToken: accessToken,
      UserCode: code,
    })

    await this.cognitoClient.send(verifyCommand)

    const preferenceCommand = new SetUserMFAPreferenceCommand({
      AccessToken: accessToken,
      SoftwareTokenMfaSettings: {
        Enabled: true,
        PreferredMfa: true,
      },
    })

    return await this.cognitoClient.send(preferenceCommand)
  }

  // UTILITY: Refresh tokens
  async refreshTokens(refreshToken: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    })

    return await this.cognitoClient.send(command)
  }
}
