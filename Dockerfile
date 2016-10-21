FROM nginx
COPY dist /usr/share/nginx/html/static
COPY index.html /usr/share/nginx/html/index.html
