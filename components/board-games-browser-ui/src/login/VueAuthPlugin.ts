import { getCurrentInstance, inject, type App, type InjectionKey } from 'vue'
import { computed, readonly, ref, watch, type Ref } from 'vue'
import { OAuthClient, type OAuthClientOptions } from './OAuthClient'
export { OAuthClient }
export { Storage } from './Storage'
export { LocalStorage } from './LocalStorage'

export const authClientInjectionKey = Symbol() as InjectionKey<OAuthClient>

export class OAuthClientPlugin {

	private _oauthClient:OAuthClient

	constructor(options:OAuthClientOptions) {
		this._oauthClient = new OAuthClient(options)
	}

	public install(app: App, { global = false } = {}) {
		if (global) {
			app.config.globalProperties.$vueAuth = this
		}
		app.provide(authClientInjectionKey, this._oauthClient)
	}

	get client():OAuthClient {
		return this._oauthClient
	}

	get loggedIn() {
		return computed<Boolean>(() => !!this._oauthClient.accessToken)
	}

	get accessToken() {
		return computed<string | undefined | null>(() => this._oauthClient.accessToken)
	}

	get refreshToken() {
		return computed<string | undefined | null>(() => this._oauthClient.refreshToken)
	}

	get idToken() {
		return computed<string | undefined | null>(() => this._oauthClient.idToken)
	}

	get decodedIdToken() {
		return computed<Object>(() => this._oauthClient.decodedIdToken)
	}

	get expiryTime() {
		return computed<Date | undefined | null>(() => this._oauthClient.expiryTime)
	}

	async initialize() {
		return this._oauthClient.initialize()
	}

	async authorize() {
		return this._oauthClient.authorize()
	}

	async userInfo() {
		return this._oauthClient.userInfo()
	}

	async logout(logoutHint?: string, local?: boolean) {
		return this._oauthClient.logout(logoutHint, local)
	}
}

/**
 * Create a new OAuthClient instance.
 * @param options - The OAuthClient options, see {@link OAuthClientOptions}.
 * @returns {@link OAuthClient} instance.
 * @example
 * ```typescript
 * import { createOAuthClient } from './login/VueAuthPlugin'
 * import { createApp } from 'vue'
 * import App from './App.vue'
 *
 * const app = createApp(App)
 * const authClient = createOAuthClient({
 * 	url: 'https://example.com',
 * 	clientId: 'my-client-id',
 * })
 *
 * app.use(authClient, { global: true })
 * ```
 */
export function createOAuthClient (options: OAuthClientOptions) {
	return new OAuthClientPlugin(options)
}

/**
 * Use the composition API to get the OAuthClient instance.
 * @param options - The OAuthClient options, see {@link OAuthClientOptions}.
 * @returns {@link OAuthClient} instance.
 * @remarks This function must be called in the `setup` function of a component.
 * @throws if the OAuthClient is not installed.
 * @throws if the function is not called in the `setup` function.
 *
 * @example
 * ```html
 * <template>
 *  <button @click="authorize">Login</button>
 * </template>
 *
 * <script setup>
 * 	import { useOAuthClient } from './login/VueAuthPlugin'
 * 	const authClient = useOAuthClient()
 * 	const authorize = () => authClient.authorize()
 * </script>
 * ```
 */
export function useOAuthClient (options?: OAuthClientOptions) {
	const client = inject(authClientInjectionKey)
	const instance = getCurrentInstance()
	if (!instance) {
		throw new Error('useOAuthClient must be called in the setup function')
	}
	if (!client) {
		throw new Error('OAuthClient is not installed')
	}
	if (options) {
		client.extend(options)
	}
	return client
}