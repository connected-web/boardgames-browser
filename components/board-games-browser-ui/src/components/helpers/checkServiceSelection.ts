export interface ServiceSummary {
  name: string
  service: string
  message: string
  authed: boolean
}

export default async function checkServiceSelection ($vueAuth: any): Promise<ServiceSummary> {
  const oauthEnabled = $vueAuth?.loggedIn?.value
  if (oauthEnabled === true) {
    const userInfo = await $vueAuth.userInfo()
    return {
      name: 'Board Games API',
      service: 'OAuth',
      message: `🔑 Logged in as ${String(userInfo?.email)} using Connected Web Auth.`,
      authed: true
    }
  }

  return {
    name: 'No Service',
    service: 'None',
    message: '🔒 No credentials available; please login!',
    authed: false
  }
}
