from django.conf.urls import url
from .views import TopicView

urlpatterns = [
    url(r'^$', TopicView.as_view(), name='index'),
    url(r'^(?P<topic_id>\d+)/$', TopicView.as_view(), name='detail'),
]
