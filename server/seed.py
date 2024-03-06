#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, JournalEntry, JournalTag, EntryTag

# ... (previous code)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        User.query.delete()
        JournalEntry.query.delete()
        JournalTag.query.delete()
        EntryTag.query.delete()

        print("Seeding User...")
        new_user_1 = User(
            username='David Williams'
        )
        db.session.add(new_user_1)
        db.session.commit()

        print("Seeding JournalEntry...")
        new_journal_entry_1 = JournalEntry(
            title=fake.sentence(),
            content=fake.paragraph(),
            user_id=new_user_1.id
        )
        db.session.add(new_journal_entry_1)
        db.session.commit()

        print("Seeding JournalTag...")
        new_journal_tag_1 = JournalTag(
            name='Family',
            
        )
        db.session.add(new_journal_tag_1)
        db.session.commit()

        print("Seeding EntryTag...")
        new_entry_tag_1 = EntryTag(
            mood= fake.word(),
            journal_entry_id=new_journal_entry_1.id, 
            journal_tag_id=new_journal_tag_1.id  
        )
        db.session.add(new_entry_tag_1)
        db.session.commit()


        
