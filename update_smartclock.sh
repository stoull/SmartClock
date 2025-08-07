#!/bin/bash
if [ -z "$SUDO_PASSWORD"]; then
    echo "Error: sudo password not set!"
    exit 1
fi

echo "Starting update ...."
unzip -d . ~/smartclock_build.zip
sudo -S rm -rf /var/www/smartclock/ <<< "$SUDO_PASSWORD"
sudo -S mv ~/build/ /var/www/smartclock <<< "$SUDO_PASSWORD"
rm ~/smartclock_build.zip
unset SUDO_PASSWORD
echo "Update finished!"