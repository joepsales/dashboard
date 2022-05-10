import { KeycloakService } from "keycloak-angular";


export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8085/auth',
                realm: 'angular-web',
                clientId: 'angular-web-client'
            },
            initOptions: {
                checkLoginIframe: false,
                checkLoginIframeInterval: 25,
                onLoad: 'login-required',
                flow: 'standard'
            }
        });
}