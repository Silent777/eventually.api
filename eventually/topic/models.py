"""
Topic module.
==============

This module implements class that represents the topic entity.
"""
# pylint: disable=arguments-differ

from django.db import models, IntegrityError
from authentication.models import CustomUser
from curriculum.models import Curriculum
from utils.abstractmodel import AbstractModel
from utils.utils import LOGGER

class Topic(AbstractModel):
    """
     Describing of topic entity.

        Attributes:
            :param title: Title of the certain topic.
            :type tittle: string

            :param description: Describing topic
            :type description: string

            :param created_at: The date when the
            certain topic was created.
            :type created_at: datatime

            :param updated_at: The date when the certain
            topic was last time edited.
            :type updeted_at: datatime

            :param curriculum: Foreign key on the certain Curriculum model
            :type curriculum: integer

            :param authors: Foreign key on the certain CustomUser model
            :type authors: integer
        """

    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, null=True)
    authors = models.ManyToManyField(CustomUser)

    def to_dict(self):
        """
        Method that converts topic object to dictionary.

        :return: dictionary with topic's information

        :Example:

        | {
        |    'id': 17,
        |    'title': 'My awesome title',
        |    'description': 'My awesome description',
        |    'created_at': 1509540116,
        |    'updated_at': 1509540116,
        |    'curriculum' : 13,
        |    'authors' : [21, 33]
        | }
        """

        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'created_at': int(self.created_at.timestamp()),
                'updated_at': int(self.updated_at.timestamp()),
                'curriculum': self.curriculum.id,
                'authors': sorted([author.id for author in self.authors.all()])}

    @staticmethod
    def create(curriculum, authors=None, title=None, description=None):
        """
        Static method that creates instance of Topic class and creates database
        row with the accepted info.

        :param: curriculum: Certain Curriculum's object. Is required.
        :type curriculum: Curriculum model.

        :param: authors: Certain tuple CustomUser's objects. Is required.
        :type tuple<authors>: CustomUser model.

        :param title: Title of the certain topic.
        :type title: string

        :param description: Describing topic.
        :type description: string

        :return: topic object or None if topic have not created
        """

        topic = Topic()
        topic.curriculum = curriculum
        topic.title = title
        topic.description = description

        try:
            topic.save()
            topic.authors.add(*authors)
            return topic
        except (ValueError, IntegrityError):
            LOGGER.error('Inappropriate value or relational integrity fail')

    def update(self, title=None, description=None):
        """
        Method that updates topic object according to the accepted info.

        :param title: Title of the certain topic.
        :type title: string

        :param description: Describing topic
        :type description: string

        :return: None
        """

        if title:
            self.title = title
        if description:
            self.description = description

        self.save()

    def add_authors(self, authors_list):
        """Method that add authors to topic"""

        if authors_list:
            self.authors.add(*authors_list)

    def remove_authors(self, authors_list):
        """Method that remove authors from topic"""

        if authors_list:
            self.authors.remove(*authors_list)
