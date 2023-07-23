import sharedModel from '../../helpers/sharedModel'

export default async function checkServiceSelection ($vueAuth) {
  const oauthEnabled = $vueAuth?.loggedIn?.value
  if (oauthEnabled) {
    const userInfo = await this.$vueAuth.userInfo()
    return {
      name: 'Board Games CDK API',
      service: 'OAuth',
      message: `Using OAuth SSO Token for ${userInfo?.email} (AWS CDK API)`
    }
  }

  const apiKeyAuthHeaders = sharedModel.getAuthHeaders()
  const apiKeyUserName = apiKeyAuthHeaders['calisaurus-user']
  if (apiKeyUserName) {
    return {
      name: 'Board Games SAM API',
      service: 'APIKey',
      message: `Using API Key for ${apiKeyUserName} (AWS SAM API)`
    }
  }

  return {
    name: 'No Service',
    service: 'None',
    message: 'No credentials available; please login!'
  }
}
