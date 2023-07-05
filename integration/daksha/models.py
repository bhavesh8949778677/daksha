from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import os

class Point(models.Model):
    name = models.CharField(max_length=255, default = "Python")

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=255, default="Hello")
    duration = models.CharField(max_length=50, default="2hrs")
    category = models.CharField(max_length=50, default="Programming")
    level = models.IntegerField(default = 0)
    skills_req = models.CharField(max_length=255, default="Python Basics")
    credits = models.IntegerField(default=0)
    about_company = models.TextField(default = "")
    content = models.TextField(default = "")
    pdf = models.FileField(upload_to='pdfs/', default = "No pdf")
    logo  = models.ImageField(upload_to = 'images/', default = "Logo")
    image = models.ImageField(upload_to='images/', default = "No image")
    points = models.ManyToManyField(Point, default = list)

    def __str__(self):
        return self.title
        
def user_submission_path(instance, filename):
    # Get the user's ID or username
    user_identifier = instance.user.username  # Use ID
    # user_identifier = instance.user.username  # Use username

    # Generate the file path using the user identifier
    file_path = f'submissions/user_{user_identifier}/{filename}'
    return file_path

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete = models.CASCADE)
    files = models.FileField(upload_to=user_submission_path)
    submission_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Submission by {self.user.username} of {self.project.title}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credits = models.IntegerField(default=0)
    rank = models.IntegerField(default = 0)
    projects_done = models.ManyToManyField(Project, default = list)
    accuracy = models.FloatField(default=0.0)
