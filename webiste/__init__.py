from flask import Flask

def create_app():
    app=Flask(__name__)
    #najčešće korišćen za osiguravanje sesija korisnika i za enkripciju podataka.
    app.config['SECRET_KEY']='sfasfasfas'

    from .views import views
    from .auth import auth

    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(auth,url_prefix='/')

    return app