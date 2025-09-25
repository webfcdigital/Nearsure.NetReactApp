// @ts-ignore
import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'http://localhost:8181',
  realm: 'nearsure',
  clientId: 'nearsure-client'
});

export default keycloak;
