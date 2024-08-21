FROM nginx:1.27.1-alpine

# WORKDIR /app

#configuration
copy ./deployment/nginx.conf /etc/nginx/nginx.conf

#content, comment out the ones you dont need!
copy ./build/ /usr/share/nginx/html/smartclock/
#copy ./*.css /usr/share/nginx/html/
#copy ./*.png /usr/share/nginx/html/
#copy ./*.js /usr/share/nginx/html/

EXPOSE 3001