# drive-clone

## Frontend
- Run `npm i`
- then run `npm start`

## Backend
- make a virtual environment(`optional`, but `recommended`): `virtualenv venv`
- activate the virtual environment you just made: `venv\Scripts\activate` or `venv\Scripts\activate.bat` (one of the two) [if backslash(`\`) doesn't work, try forwardslah (`/`)]
- run `pip install -r "requirements.txt"`
- run `python manage.py runserver` or `python3 manage.py runserver` or `py manage.py runserver` [it's the one that I use]
- then, run `py manage.py createsuperuser` to create a super user and access djando admin panel
- and tadaaaa 🍾, you have a working project

### PS: You have to keep running both the servers in order for the project to work
