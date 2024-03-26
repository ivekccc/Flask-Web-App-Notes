from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    isDone=db.Column(db.Boolean)
    category_id=db.Column(db.Integer,db.ForeignKey('category.id'))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    notes = db.relationship('Note')

class Category(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(30),unique=True)
    notes=db.relationship('Note')