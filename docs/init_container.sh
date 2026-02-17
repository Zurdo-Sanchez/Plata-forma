#!/bin/bash

#windows compatibility
cat /scripts/.bashrc >> /home/innovait/.bashrc
dos2unix /home/innovait/.bashrc


cd /var/www
echo "secret" | sudo -S chown -R innovait:www-data /var/www
echo "secret" | sudo -S chmod -R 777 /var/www/cache
echo "secret" | sudo -S chmod -R 777 /var/www/tmp
echo "secret" | sudo -S chmod -R 777 /var/www/logs
echo "secret" | sudo -S chmod -R 777 /var/www/backup
echo "secret" | sudo -S chmod -R 777 /var/www/user


# init apache
echo "secret" | sudo -S apache2ctl -D FOREGROUND
