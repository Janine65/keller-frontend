# Keller Organisator – Frontend

Angular-Frontend (PrimeNG, Tailwind CSS) des Keller Organisators, ausgeliefert über Nginx. Benötigt das Backend-Image [janine65/keller-backend](https://hub.docker.com/r/janine65/keller-backend).

## Image

```bash
docker pull janine65/keller-frontend
```

## Schnellstart

```bash
docker run -d \
  --name keller-frontend \
  -p 4300:4300 \
  janine65/keller-frontend
```

## Konfiguration

Das Backend wird über den Nginx-Pfad `/keller-backend` angesprochen. Das Proxy-Ziel ist zur Build-Zeit in der `nginx.conf` konfiguriert (Standard: `http://olconet:3000`). Für ein anderes Ziel das Image mit angepasster `nginx.conf` neu bauen oder die Datei per Volume überschreiben:

```bash
docker run -d -p 4300:4300 \
  -v ./nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  janine65/keller-frontend
```

## Zusammenspiel mit dem Backend (docker compose)

```yaml
services:
  keller-backend:
    image: janine65/keller-backend
    env_file: .env
    ports:
      - "3000:3000"

  keller-frontend:
    image: janine65/keller-frontend
    depends_on:
      - keller-backend
    ports:
      - "4300:4300"
```

Die App ist danach unter `http://localhost:4300` erreichbar; API-Aufrufe werden über den Pfad `/keller-backend` an das Backend weitergeleitet.

## Quellcode

https://github.com/Janine65/keller-frontend
