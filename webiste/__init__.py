from flask import Flask

def create_app():
    app=Flask(__name__)
    #najčešće korišćen za osiguravanje sesija korisnika i za enkripciju podataka.
    app.config['SECRET_KEY']='sfasfasfas'

    return app