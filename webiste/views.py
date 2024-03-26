from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Category, Note
from . import db
import json
from flask import redirect, url_for

views = Blueprint('views', __name__)



@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')
        category_id = request.form.get('category')
        categories = Category.query.all()
        if len(note) < 1:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id,isDone=False,category_id=category_id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')
            return redirect(url_for('views.home'))  # Preusmeravanje na istu stranicu nakon dodavanja beleške

    categories = Category.query.all()  # Query categories again
    return render_template("home.html", user=current_user, categories=categories)


@views.route('/edit-note', methods=['POST'])
@login_required
def edit_note():
    note_data = json.loads(request.data)
    note_id = note_data['noteId']
    new_content = note_data['newContent']
    note = Note.query.get(note_id)

    if note and note.user_id == current_user.id:
        # Postoji postojeća beleška, pa ažuriramo sadržaj
        note.data = new_content
        db.session.commit()
        return jsonify({'message': 'Note updated successfully'})

    else:
        # Ne postoji postojeća beleška, pa kreiramo novu
        new_note = Note(data=new_content, user_id=current_user.id)
        db.session.add(new_note)
        db.session.commit()
        return jsonify({'message': 'New note created successfully'})


@views.route('/delete-note', methods=['POST'])
@login_required
def delete_note():
    note_data = json.loads(request.data)
    note_id = note_data['noteId']
    note = Note.query.get(note_id)
    if note and note.user_id == current_user.id:
        db.session.delete(note)
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'})
    return jsonify({'error': 'Unauthorized or Note not found'}), 403
