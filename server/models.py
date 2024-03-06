from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    #RELATIONSHIPS:
    journal_entries = db.relationship('JournalEntry', back_populates = 'user')
    journal_media = db.relationship('JournalMedia', back_populates = 'user')

class JournalEntry(db.Model, SerializerMixin):
    __tablename__ = 'journal_entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    journal_media = db.Column(db.String, db.ForeignKey('journal_medias.id'))
    #RELATIONSHIPS:
    user = db.relationship('User', back_populates = 'journal_entries')
    journal_media = db.relationship('JournalMedia', back_populates = 'journal_entries')
    entry_tags = db.relationship('EntryTags', back_populates = 'journal_entries')
    
    
    

class JournalTag(db.Model, SerializerMixin): 
    __tablename__ = 'journal_tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    #RELATIONSHIPS:
    journal_entries = db.relationship('JournalEntry', back_populates = 'journal_tags')

class JournalMedia(db.Model, SerializerMixin):
    __tablename__ = 'journal_medias'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True, nullable=False)
    #RELATIONSHIPS:
    user = db.relationship('User', back_populates = 'journal_media')
    journal_entries = db.relationship('JournalEntry', back_populates = 'journal_media')

class EntryTag(db.Model, SerializerMixin):
    __tablename__ = 'entry_tags'
    id = db.Column(db.Integer, primary_key=True)
    journal_entries_id = db.Column('JournalEntry', db.ForeignKey('journal_entries.id'))
    journal_tags_id = db.Column('JournalTag', db.ForeignKey('journal_tags.id'))
    #RELATIONSHIPS:
    journal_entries = db.relationship('JournalEntry', back_populates = 'entry_tags')
    journal_tags = db.relationship('JournalTag', back_populates = 'entry_tags')

