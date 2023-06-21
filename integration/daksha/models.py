from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=255)
    details = models.TextField()
    pdf = models.FileField(upload_to='pdfs/')

    def __str__(self):
        return self.name