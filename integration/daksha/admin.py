from django.contrib import admin
from .models import Project, Point, Submission, Profile

admin.site.register(Project)
admin.site.register(Submission)
admin.site.register(Point)
admin.site.register(Profile)