// Build-Konfiguration "app-dev": native App gegen das lokale Docker-Test-Backend.
// Hinweis: "localhost" funktioniert nur im iOS-Simulator — auf einem echten
// Gerät stattdessen die LAN-IP des Macs eintragen (z.B. http://192.168.x.y:4300).
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4300/keller-backend',
  apiUrlSelf: 'http://localhost:4300',
};
