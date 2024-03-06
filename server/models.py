from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    #relationships: 
    journal_entries = db.relationship('JournalEntry', back_populates = 'user')
    #serialization rules:
    serializer_rules = ('-journal_entries.user',)

class JournalEntry(db.Model,SerializerMixin):
    __tablename__ = 'journal_entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    #ForeignKeys:
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    #relationships:
    user = db.relationship('User', back_populates = 'journal_entries')
    entry_tags = db.relationship('EntryTag', back_populates = 'journal_entry')
    #serialization rules:
    serializer_rules = ('-user.journal_entries', '-entry_tags.journal_entry')
    
class JournalTag(db.Model,SerializerMixin):
    __tablename__ = 'journal_tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    #relationships:
    entry_tags = db.relationship('EntryTag', back_populates ='journal_tag')
    
    #serialization rules:
    serializer_rules = ('-entry_tags.journal_tag',)

class EntryTag(db.Model, SerializerMixin):
    __tablename__ = 'entry_tags'
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String)
    
    #ForeignKeys:
    journal_entry_id = db.Column(db.Integer, db.ForeignKey('journal_entries.id'), nullable=True)
    journal_tag_id = db.Column(db.Integer, db.ForeignKey('journal_tags.id'), nullable=True)
    #relationships:
    journal_entry = db.relationship('JournalEntry', back_populates = 'entry_tags')
    journal_tag = db.relationship('JournalTag', back_populates = 'entry_tags')
    #serialization rules:
    serializer_rules = ('-journal_entry.entry_tags', '-journal_tag.entry_tags')