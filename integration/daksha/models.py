from django.db import models

class Point(models.Model):
    name = models.CharField(max_length=255, default = "Python")

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255, default="Hello")
    duration = models.CharField(max_length=50, default="2hrs")
    skills_req = models.CharField(max_length=255, default="Python Basics")
    credits = models.IntegerField(default=0)
    pdf = models.FileField(upload_to='pdfs/', default = "No pdf")
    image = models.ImageField(upload_to='images/', default = "No image")
    points = models.ManyToManyField(Point, default = list)


    def __str__(self):
        return self.title
