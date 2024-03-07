#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *


# Views go here!

@app.route('/')
def index():
    return '<h1>Joy Jot</h1>'

#GET all Users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_dict = [user.to_dict(rules = ('-journal_entries', )) for user in users]
    response = make_response(
        users_dict, 200
    )
    return response

@app.route('/journal_entries', methods=['GET', 'POST'])
def journal_entries():
    if request.method == 'GET':
        journal_entries = JournalEntry.query.all()
        journal_entries_dict = [entry.to_dict(rules=('-entry_tags',)) for entry in journal_entries]
        response = make_response(jsonify(journal_entries_dict), 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_journal_entry = JournalEntry(
            title=data.get('title', ''),
            content=data.get('content', ''),
            user_id=data.get('user_id', None)
        )
        db.session.add(new_journal_entry)
        db.session.commit()
        response = make_response(new_journal_entry.to_dict(rules=('-user', '-entry_tags')), 201)
    return response

@app.route('/journal_entries/<int:id>', methods = ['GET', 'DELETE', 'PATCH'])
def delete_journal_entry(id):
    journal_entry = JournalEntry.query.filter(JournalEntry.id == id).first()
    
    if not journal_entry:
        return make_response(
            {'message': 'Journal Entry not found'}, 404
        )
    else:
        if request.method == 'GET':
            response = make_response(journal_entry.to_dict(rules = ('-user', '-entry_tags')), 200)
        elif request.method == 'DELETE':
            db.session.delete(journal_entry)
            db.session.commit()
            response = make_response({}, 204)
        
        return response
    





@app.route('/journal_tags', methods=['GET', 'POST'])
def get_journal_tags():
    journal_tags = JournalTag.query.all()
    if request.method == 'GET':
        
        journal_tags_dict = [journal_tag.to_dict(rules = ('-entry_tags', )) for journal_tag in journal_tags]
        response = make_response(
            journal_tags_dict, 200
        )
        
    elif request.method == 'POST':
        new_journal_tag = JournalTag(
            name=request.json['name']
        )
        db.session.add(new_journal_tag)
        db.session.commit()
        response = make_response (new_journal_tag.to_dict(),201)
    return response

@app.route('/entry_tags', methods=['GET'])
def get_entry_tags():
    entry_tags = EntryTag.query.all()
    entry_tags_dict = [entry_tag.to_dict(rules = ('-journal_entry', '-journal_tag')) for entry_tag in entry_tags]
    response = make_response(
        entry_tags_dict, 200
    )
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)

