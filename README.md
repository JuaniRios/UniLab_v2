# UniLab_v2

UniLab is composed of 2 services, a backend written in Python using the Django-Rest-Framework, 
and a Single-Page-Application frontend written in JavaScript using React.

The backend needs to be run by the server on port 8000.
The frontend runs on port 8080, and is composed of just an nginx server which returns the whole application as a single
html file (google Single-Page-Applications for more information)

There is configuration to be made for the backend on backend/UniLab/production_settings.py like the URL that you are 
deploying the backend on. also on backend/Unilab/general_settings.py there is there configuration of the Postgres user 
and password and secret key.

## Deploying the backend (based of [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-22-04) :
### Installing and configuring Python and Postgres
- Install python, postgress, nginx, and some other tools:
```bash
sudo apt update
sudo apt install python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl
```

- Create PostgreSQL Database and User. If you don't want to change the configuration you can supply
the db config that is already set up, but we suggest you create your own, at least the password!
```bash
sudo -u postgres psql
CREATE DATABASE unilab_db;
CREATE USER db_admin WITH PASSWORD 'UniLab#93580';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
\q
```

- Create and activate a Python virtual environment. We suggest you have your own folder separate from this project for VENVs
```bash
mkdir ~/VENVs
cd ~/VENVs
python3 -m venv unilab_v2
source unilab_v2/bin/activate
```
You should now see your terminal start each line with (unilab_v2). This means the VENV is activated.

- Install gunicorn and the rest of the dependencies:
```bash
cd ~/Unilab_v2/backend #or wherever your cloned repository is
pip install django gunicorn psycopg2-binary
pip install -r ./requirements.txt
```

- Make database migrations
```bash
./manage.py makemigrations api
./manage.py migrate
```

- Open port 8000 from the firewall
```bash
sudo ufw allow 8000
```

### Configuring Gunicorn

- Bind gunicorn so it can serve the project
```bash
gunicorn --bind 0.0.0.0:8000 UniLab.wsgi
deactivate
```

- Create systemd Socket and Service Files for Gunicorn
```bash
sudo nano /etc/systemd/system/gunicorn.socket
```
- paste the following:
```txt
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

- Do the same for the service file:
```
sudo nano /etc/systemd/system/gunicorn.service
```
```
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=<username>
Group=www-data
WorkingDirectory=/home/<username>/UniLab_v2
ExecStart=/home/<username>/VENVs/unilab_v2/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          UniLab_v2.wsgi:application

[Install]
WantedBy=multi-user.target
```
save and close

- You can now start the gunicorn socket
```
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket
```
you should receive an output like this:
```
Output
● gunicorn.socket - gunicorn socket
     Loaded: loaded (/etc/systemd/system/gunicorn.socket; enabled; vendor preset: enabled)
     Active: active (listening) since Mon 2022-04-18 17:53:25 UTC; 5s ago
   Triggers: ● gunicorn.service
     Listen: /run/gunicorn.sock (Stream)
     CGroup: /system.slice/gunicorn.socket

Apr 18 17:53:25 django systemd[1]: Listening on gunicorn socket.
```
### Configuring Nginx
- configure nginx to pass traffic to the process
```
sudo nano /etc/nginx/sites-available/unilab_v2
```

```
server {
    listen 8000;
    server_name <server_domain_or_IP>;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/<username>/UniLab_v2;
    }
    
    location / {
    include proxy_params;
    proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```
save and close

- Enable the file and test that it has no errors:
```
sudo ln -s /etc/nginx/sites-available/unilab_v2 /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

- open nginx port
```
sudo ufw allow 'Nginx Full'
```

- Whenever you wish to restart the dajngo application, run:
```
sudo systemctl restart gunicorn
```

- If you change the gunicorn socket or service files, restart it with
```
sudo systemctl daemon-reload
sudo systemctl restart gunicorn.socket gunicorn.service
```

## Deploying the Frontend (based of [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04)))
- create the single html which contains the whole application:
```
cd ~/UniLab_v2/frontent
npm run build
```

- Specify the frontend in the nginx config by adding to the backend file
```
cat /etc/nginx/sites-available/unilab_v2
```
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/<your_domain>/html;
        index index.html index.htm index.nginx-debian.html;

        server_name <your_domain> www.<your_domain>;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

UniLab is composed of 2 services, a backend written in Python using the Django-Rest-Framework, 
and a Single-Page-Application frontend written in JavaScript using React.

The backend needs to be run by the server on port 8000.
The frontend runs on port 8080, and is composed of just an nginx server which returns the whole application as a single
html file (google Single-Page-Applications for more information)

There is configuration to be made for the backend on backend/UniLab/production_settings.py like the URL that you are 
deploying the backend on. also on backend/Unilab/general_settings.py there is there configuration of the Postgres user 
and password and secret key.

## Deploying the backend (based of [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-22-04) :
### Installing and configuring Python and Postgres
- Install python, postgress, nginx, and some other tools:
```bash
sudo apt update
sudo apt install python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl
```

- Create PostgreSQL Database and User. If you don't want to change the configuration you can supply
the db config that is already set up, but we suggest you create your own, at least the password!
```bash
sudo -u postgres psql
CREATE DATABASE unilab_db;
CREATE USER db_admin WITH PASSWORD 'UniLab#93580';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
\q
```

- Create and activate a Python virtual environment. We suggest you have your own folder separate from this project for VENVs
```bash
mkdir ~/VENVs
cd ~/VENVs
python3 -m venv unilab_v2
source unilab_v2/bin/activate
```
You should now see your terminal start each line with (unilab_v2). This means the VENV is activated.

- Install gunicorn and the rest of the dependencies:
```bash
cd ~/Unilab_v2/backend #or wherever your cloned repository is
pip install django gunicorn psycopg2-binary
pip install -r ./requirements.txt
```

- Make database migrations
```bash
./manage.py makemigrations api
./manage.py migrate
```

- Open port 8000 from the firewall
```bash
sudo ufw allow 8000
```

### Configuring Gunicorn

- Bind gunicorn so it can serve the project
```bash
gunicorn --bind 0.0.0.0:8000 UniLab.wsgi
deactivate
```

- Create systemd Socket and Service Files for Gunicorn
```bash
sudo nano /etc/systemd/system/gunicorn.socket
```
- paste the following:
```txt
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

- Do the same for the service file:
```
sudo nano /etc/systemd/system/gunicorn.service
```
```
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=<username>
Group=www-data
WorkingDirectory=/home/<username>/UniLab_v2
ExecStart=/home/<username>/VENVs/unilab_v2/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          UniLab_v2.wsgi:application

[Install]
WantedBy=multi-user.target
```
save and close

- You can now start the gunicorn socket
```
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket
```
you should receive an output like this:
```
Output
● gunicorn.socket - gunicorn socket
     Loaded: loaded (/etc/systemd/system/gunicorn.socket; enabled; vendor preset: enabled)
     Active: active (listening) since Mon 2022-04-18 17:53:25 UTC; 5s ago
   Triggers: ● gunicorn.service
     Listen: /run/gunicorn.sock (Stream)
     CGroup: /system.slice/gunicorn.socket

Apr 18 17:53:25 django systemd[1]: Listening on gunicorn socket.
```
### Configuring Nginx
- configure nginx to pass traffic to the process
```
sudo nano /etc/nginx/sites-available/unilab_v2
```

```
server {
    listen 8000;
    server_name <server_domain_or_IP>;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/<username>/UniLab_v2;
    }
    
    location / {
    include proxy_params;
    proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```
save and close

- Enable the file and test that it has no errors:
```
sudo ln -s /etc/nginx/sites-available/unilab_v2 /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

- open nginx port
```
sudo ufw allow 'Nginx Full'
```

- Whenever you wish to restart the dajngo application, run:
```
sudo systemctl restart gunicorn
```

- If you change the gunicorn socket or service files, restart it with
```
sudo systemctl daemon-reload
sudo systemctl restart gunicorn.socket gunicorn.service
```

## Deploying the Frontend (based of [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04)))
- create the single html which contains the whole application:
```
cd ~/UniLab_v2/frontent
npm run build
```

- Specify the frontend in the nginx config by adding to the backend file
```
cat /etc/nginx/sites-available/unilab_v2
```
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/<your_domain>/html;
        index index.html index.htm index.nginx-debian.html;

        server_name <your_domain> www.<your_domain>;

        location / {
                try_files $uri $uri/ =404;
        }
}
```
