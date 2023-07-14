import memoizee from 'memoizee'
import { OAuthClientPlugin, createOAuthClient } from '../login/VueAuthPlugin' // use ./login/OAuthClient.ts directly for non-vue apps

const uatIdentityDetails = {
  name: 'Connected Web (UAT)',
  auth: 'https://connected-web-dev.auth.eu-west-2.amazoncognito.com',
  url: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_VBRbzaly6',
  clientId: '5rgdg0eeeeu043fbfvl12ehrmg',
  scopes: 'openid email profile'
}

const prodIdentityDetails = {
  name: 'Connected Web (Prod)',
  auth: 'https://connected-web.auth.eu-west-2.amazoncognito.com',
  url: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_rt9QhO9KA',
  clientId: '2fomt3amj0luqe3o5ce8ou76m8',
  scopes: 'openid email profile'
}

const makeOAuthClient = memoizee(function (identityConfig) {
  const authClient = createOAuthClient({
    ...identityConfig,
    redirectUri: `${window.location.origin}/boardgames-browser/`, // Return to execute auth handler code
    useLocalLoginRedirectUrl: true, // Return users back to the page they were viewing before auth
    postLogoutRedirectUri: `${window.location.origin}/boardgames-browser/`
  })
  authClient.initialize() // Deliberate side-effect, process auth conditions in current browser context
  return authClient
})

export default class Auth {
  static getOAuthClient():OAuthClientPlugin {
    // See also: 'this.$vueAuth' for bindable vue properties in VueAuthPlugin.ts
    const identityConfig = Auth.getIdentityDetails()
    return makeOAuthClient(identityConfig)
  }

  static getIdentityDetails() {
    const uatMode = false
    return uatMode ? uatIdentityDetails : prodIdentityDetails
  }
}