import OpenAPIClientAxios from 'openapi-client-axios'
import Auth from '../login/Auth'
import { Client } from './BoardGamesAPIClientTypes'

interface ServerInfo {
  baseUrl: string
  headers: {
    [param: string]: string
  }
}

async function getServerInfo (): Promise<ServerInfo> {
  const authToken = await Auth.getLatestAccessToken()
  const server: ServerInfo = {
    baseUrl: 'https://boardgames-api.dev.connected-web.services',
    headers: {
      Authorization: `Bearer ${authToken as string}`
    }
  }

  return server
}

export default class BoardGamesApiClient {
  static readonly singleton: BoardGamesApiClient = new BoardGamesApiClient()

  static getSingleton (): BoardGamesApiClient {
    return BoardGamesApiClient.singleton
  }

  async getInstance (): Promise<Client> {
    const serverInfo = await getServerInfo()
    const local = window.location.origin
    const client = new OpenAPIClientAxios({
      definition: `${local}/boardgames-api-services.json`,
      axiosConfigDefaults: { headers: serverInfo.headers }
    })

    return await client.getClient<Client>()
  }
}
