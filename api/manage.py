#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from string import punctuation
from nltk.corpus import stopwords as stopwords_
stopwords = stopwords_.words("english")


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


def preprocess_text(s):
    """For spam classification, count vectorized when loaded looks for this method in manage.py"""
    s = [char.lower() for char in s if char not in punctuation]
    s = "".join(s)
    return [word for word in s.split(' ') if word not in stopwords]


if __name__ == '__main__':
    main()
