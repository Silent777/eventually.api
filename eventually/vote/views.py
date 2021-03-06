"""
    Answer and Vote views module
    ============================
"""

from django.http import JsonResponse
from django.views.generic.base import View
from event.models import Event
from team.models import Team
from vote.models import Vote, Answer
from utils.responsehelper import (RESPONSE_200_DELETED,
                                  RESPONSE_200_UPDATED,
                                  RESPONSE_400_INVALID_DATA,
                                  RESPONSE_403_ACCESS_DENIED,
                                  RESPONSE_404_OBJECT_NOT_FOUND)
from utils.validators import (string_validator,
                              vote_data_validator,
                              answer_data_validator)


class VoteView(View):
    """VoteView handles GET, POST, PUT, DELETE requests"""

    def get(self, request, team_id=None, event_id=None, vote_id=None):  # pylint: disable=unused-argument
        """
        Method that handles GET request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :return: HttpResponse with status 400,404 or 200
        """

        user = request.user
        team = Team.get_by_id(team_id)
        event = Event.get_by_id(event_id)

        if not vote_id:
            votes = event.vote_set.all()
            data = {'votes': [vote.to_dict() for vote in votes]}
            return JsonResponse(data, status=200)

        members = [user.id for user in team.members.all()]
        if user.id not in members:
            return RESPONSE_403_ACCESS_DENIED

        vote = Vote.get_by_id(vote_id)
        if not vote:
            return RESPONSE_404_OBJECT_NOT_FOUND

        vote = vote.to_dict()
        return JsonResponse(vote, status=200)

    def post(self, request, team_id=None, event_id=None):
        """
        Method that handles POST request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :return: HttpResponse with status 400,404 or 201
        """

        event = Event.get_by_id(event_id)
        if not event:
            return RESPONSE_404_OBJECT_NOT_FOUND

        data = request.body
        if not vote_data_validator(data, request.body):
            return RESPONSE_400_INVALID_DATA

        vote = Vote.create(event=event,
                           is_active=data.get("is_active") if data.get("is_active") else True,
                           is_extended=data.get("is_extended") if data.get("is_extended") else
                           True,
                           title=data.get("title"),
                           vote_type=data.get("vote_type") if data.get("vote_type") else 1)

        if vote:
            vote = vote.to_dict()
            return JsonResponse(vote, status=201)
        return RESPONSE_400_INVALID_DATA

    def put(self, request, team_id, event_id, vote_id=None):  # pylint: disable=unused-argument
        """
        Method that handles PUT request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :return: HttpResponse with status 400,404 or 201
        """

        user = request.user
        team = Team.get_by_id(team_id)

        data = request.body
        if not vote_data_validator(data, request.body):
            return RESPONSE_400_INVALID_DATA

        if not vote_id:
            return RESPONSE_400_INVALID_DATA

        members = [user.id for user in team.members.all()]
        if user.id not in members:
            return RESPONSE_403_ACCESS_DENIED

        vote = Vote.get_by_id(vote_id)
        if not vote:
            return RESPONSE_400_INVALID_DATA

        if data.get('title') and string_validator(data['title']):
            set_title = data.get('title')

        data = {
            'title': set_title,
            'is_active': data.get("is_active"),
            'is_extended': data.get("is_extended"),
            'vote_type': data.get("vote_type")
        }
        vote.update(**data)
        vote.to_dict()
        return RESPONSE_200_UPDATED

    def delete(self, request, team_id, event_id, vote_id=None):  # pylint: disable=unused-argument
        """
        Method that handles DELETE request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :return: HttpResponse with status 400,404 or 200
        """

        user = request.user
        team = Team.get_by_id(team_id)

        if not vote_id:
            return RESPONSE_400_INVALID_DATA

        members = [user.id for user in team.members.all()]
        if user.id not in members:
            return RESPONSE_403_ACCESS_DENIED

        vote = Vote.get_by_id(vote_id)
        if not vote:
            return RESPONSE_404_OBJECT_NOT_FOUND

        Vote.delete_by_id(vote_id)
        return RESPONSE_200_DELETED


class AnswerView(View):
    """AnswerView handles GET, POST, PUT, DELETE requests"""

    def get(self, request, team_id=None, event_id=None, vote_id=None,
            answer_id=None):  # pylint: disable=unused-argument
        """
        Method that handles GET request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :param answer_id: id of the certain answer
        :type answer_id: int

        :return: HttpResponse with status 400,404 or 200
        """

        user = request.user
        team = Team.get_by_id(team_id)
        vote = Vote.get_by_id(vote_id)

        if not answer_id:
            answers = vote.answer_set.all()
            data = {'answers': [answer.to_dict() for answer in answers]}
            return JsonResponse(data, status=200)

        team_members = [user.id for user in team.members.all()]
        if user.id not in team_members:
            return RESPONSE_403_ACCESS_DENIED

        answer = Answer.get_by_id(answer_id)
        if answer:
            answer = answer.to_dict()
            return JsonResponse(answer, status=200)
        return RESPONSE_404_OBJECT_NOT_FOUND

    def post(self, request, team_id=None, event_id=None, vote_id=None):  # pylint: disable=unused-argument
        """
        Method that handles POST request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :return: HttpResponse with status 400,404 or 201
        """

        vote = Vote.get_by_id(vote_id)
        if not vote:
            return RESPONSE_400_INVALID_DATA

        data = request.body
        if not answer_data_validator(data, request.body):
            return RESPONSE_400_INVALID_DATA

        answer = Answer.create(members=data.get('members'),
                               vote=vote,
                               text=data.get('text'))
        if answer:
            answer = answer.to_dict()
            return JsonResponse(answer, status=201)
        return RESPONSE_400_INVALID_DATA

    def put(self, request, team_id, event_id, vote_id, answer_id=None):  # pylint: disable=unused-argument
        """
        Method that handles PUT request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :param answer_id: id of the certain answer
        :type answer_id: int

        :return: HttpResponse with status 400,404 or 201
        """

        user = request.user
        team = Team.get_by_id(team_id)

        data = request.body
        if not answer_data_validator(data, request.body):
            return RESPONSE_400_INVALID_DATA

        if not answer_id:
            return RESPONSE_400_INVALID_DATA

        team_members = [user.id for user in team.members.all()]

        if user.id not in team_members:
            return RESPONSE_403_ACCESS_DENIED

        answer = Answer.get_by_id(answer_id)
        if not answer:
            return RESPONSE_404_OBJECT_NOT_FOUND

        if data.get('text') and string_validator(data['text']):
            set_text = data.get('text')

        data = {
            'text': set_text,
            'members': data.get("members")
        }
        answer.update(**data)
        answer.to_dict()
        return RESPONSE_200_UPDATED

    def delete(self, request, team_id, event_id, vote_id, answer_id=None):  # pylint: disable=unused-argument
        """
        Method that handles DELETE request.

        :param request: the accepted HTTP request
        :type request: HttpRequest object

        :param team_id: id of the certain team
        :type team_id: int

        :param event_id: id of the certain event
        :type event_id: int

        :param vote_id: id of the certain vote
        :type vote_id: int

        :param answer_id: id of the certain answer
        :type answer_id: int

        :return: HttpResponse with status 400,404 or 200
        """

        user = request.user
        team = Team.get_by_id(team_id)

        if not answer_id:
            return RESPONSE_400_INVALID_DATA

        team_members = [user.id for user in team.members.all()]
        if user.id not in team_members:
            return RESPONSE_403_ACCESS_DENIED

        answer = Answer.get_by_id(answer_id)
        if not answer:
            return RESPONSE_404_OBJECT_NOT_FOUND

        Answer.delete_by_id(answer_id)
        return RESPONSE_200_DELETED
