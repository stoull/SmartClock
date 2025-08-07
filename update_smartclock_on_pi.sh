#!/bin/bash
unzip -d . ~/smartclock_build.zip
sudo rm -rf /var/www/smartclock/
sudo mv ~/build/ /var/www/smartclock
rm ~/smartclock_build.zip