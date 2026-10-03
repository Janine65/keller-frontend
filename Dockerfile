# Vorkompiliertes dist/ wird direkt ausgeliefert, kein Build im Container nötig
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/apps/keller-frontend/browser /usr/share/nginx/html/

EXPOSE 4300

