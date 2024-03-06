#!/usr/bin/env python3

# Standard library imports
from faker import Faker

# Local imports
from app import app, db  # Make sure to import db

# Import your models
from models import User, EntryTag, Entry, Tag, Media

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

       