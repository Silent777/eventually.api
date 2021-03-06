# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-02 00:31
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('form', models.IntegerField(choices=[(0, 'theoretic'), (1, 'practice'), (2, 'group')])),
                ('description', models.TextField(blank=True)),
                ('estimation', models.DurationField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('authors', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('superiors', models.ManyToManyField(related_name='subordinates', to='item.Item')),
            ],
        ),
    ]
