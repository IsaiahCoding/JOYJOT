#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *


# Views go here!

@app.route('/')
def index():
    return '<h1>Joy Jot</h1>'

# GET all Users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_dict = [user.to_dict(rules=('journal_entries',)) for user in users]
    response = make_response(users_dict, 200)
    return response

@app.route('/journal_entries', methods=['GET', 'POST'])
def journal_entries():
    if request.method == 'GET':
        journal_entries = JournalEntry.query.all()
        journal_entries_dict = [entry.to_dict(rules=('-entry_tags.journal_tag',)) for entry in journal_entries]
        response = make_response(jsonify(journal_entries_dict), 200)
    elif request.method == 'POST':
        data = request.get_json()

        new_journal_entry = JournalEntry(
            title=data.get('title', ''),
            content=data.get('content', ''),
            user_id=data.get('user_id', None)
        )

        tag_name = data.get('Tags', '')  # Ensure the key matches the frontend
        journal_tag = JournalTag.query.filter_by(name=tag_name).first()
        if not journal_tag:
            journal_tag = JournalTag(name=tag_name)
            db.session.add(journal_tag)

        entry_tag = EntryTag(journal_entry=new_journal_entry, journal_tag=journal_tag)
        db.session.add(entry_tag)

        db.session.add(new_journal_entry)
        db.session.commit()
        response = make_response(new_journal_entry.to_dict(rules=('-user', '-entry_tags.journal_tag')), 201)

    return response


@app.route('/journal_entries/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_or_update_journal_entry(id):
    journal_entry = JournalEntry.query.get(id)

    if not journal_entry:
        return make_response({'message': 'Journal Entry not found'}, 404)

    if request.method == 'GET':
        response = make_response(journal_entry.to_dict(rules=('-user', '-entry_tags')), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        journal_entry.title = data.get('title', journal_entry.title)
        journal_entry.content = data.get('content', journal_entry.content)
        db.session.commit()
        response = make_response(journal_entry.to_dict(rules=('-user', '-entry_tags')), 200)
    elif request.method == 'DELETE':
        db.session.delete(journal_entry)
        db.session.commit()
        response = make_response({}, 204)

    return response


@app.route('/journal_tags', methods=['GET', 'POST'])
def get_journal_tags():
    if request.method == 'GET':
        journal_tags = JournalTag.query.all()
        journal_tags_dict = [journal_tag.to_dict(rules=('-entry_tags',)) for journal_tag in journal_tags]
        response = make_response(journal_tags_dict, 200)
    elif request.method == 'POST':
        data = request.get_json()

        new_journal_tag = JournalTag(
            name=data.get('Tags', '')  
        )
        db.session.add(new_journal_tag)
        db.session.commit()
        response = make_response(new_journal_tag.to_dict(), 201)

    return response


@app.route('/entry_tags', methods=['GET'])
def get_entry_tags():
    entry_tags = EntryTag.query.all()
    entry_tags_dict = [entry_tag.to_dict(rules=('-journal_entry', '-journal_tag')) for entry_tag in entry_tags]
    response = make_response(entry_tags_dict, 200)
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)
