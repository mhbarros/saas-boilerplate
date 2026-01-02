import { Global, Module } from '@nestjs/common'
import { CognitoProvider } from './providers/cognito.provider'
import { AwsCognitoService } from './services/aws-cognito.service'

@Global()
@Module({
  providers: [CognitoProvider, AwsCognitoService],
  exports: [AwsCognitoService],
})
export class CognitoModule {}
