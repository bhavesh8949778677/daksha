from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseForbidden
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage, get_connection,send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import Project, Submission, Point, Profile
from django import forms
from django.core import serializers
import json
from django.conf import settings
import os


class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ('files',)


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp) + str(user.is_active)

account_activation_token = AccountActivationTokenGenerator()

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("Dashboard"))
    return render(request, "daksha/index.html")
@login_required
def projectsData(request):
    projects = Project.objects.all()
    project_data = []
    
    for project in projects:
        points = [point.name for point in project.points.all()]
        project_dict = {
            # 'id': project.pk,
            'title': project.title,
            'duration': project.duration,
            'skills_req': project.skills_req,
            'credits': project.credits,
            'level': project.level,
            # 'pdf': project.pdf.url,
            'logo': project.logo.url,
            'points': points
        }
        project_data.append(project_dict)

    return JsonResponse(project_data, safe=False)

def login_view(request):
    if request.method == "POST":
        # Accessing username and password from form data
        username = request.POST["username"]
        password = request.POST["password"]

        # Check if username and password are correct, returning User object if so
        user = authenticate(request, username=username, password=password)

        # If user object is returned, log in and route to index page:
        if user:
            login(request, user)
            return HttpResponseRedirect(reverse("Dashboard"))
        # Otherwise, return login page again with new context
        else:
            return render(request, "daksha/rlogin.html", {
                "message": "Invalid Credentials"
            })
    return render(request, "daksha/rlogin.html")
@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"] 
        confirm = request.POST["confirm"]
        if User.objects.filter(username=username).exists():
            return render(request, "daksha/rregister.html", {
                "message": "Username already taken"
            })
        if User.objects.filter(email=email).exists():
            return render(request, "daksha/rregister.html", {
                "message": "Email already taken"
            })
        if password != confirm:
            return render(request, "daksha/rregister.html", {
                "message": "Passwords do not match"
            })
        user = User.objects.create_user(username=username, password=password, email=email)
        user.is_active = False
        user.save()
        Profile.objects.create(user=user, credits=0)
        token = account_activation_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        print(f"token = {token}")
        print(f"uid = {uid}")
        current_site = get_current_site(request)
        activation_url = f"http://{current_site.domain}/activate/{uid}/{token}"

        # Compose the email message
        mail_subject = "Activate your account"
        message = render_to_string("daksha/activation_email.html", {
            "user": user,
            "activation_url": activation_url,
        })
        email = EmailMessage(mail_subject, message, to=[email])
        email.content_subtype = "html"
        email.send()
        login(request, user)
        return render(request,"daksha/mailsent.html",{
            'username': request.user.username,
            'email': request.user.email,
        })
    return render(request,"daksha/rregister.html")

def activate_account(request, uidb64, token):
    User = get_user_model()
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return render(request, "daksha/as.html")
    else:
        return render(request, "daksha/af.html")


def Dashboard(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    credits = request.user.profile.credits
    return render(request, "daksha/Dashboard.html",{
        'username' : request.user.username,
        'email': request.user.email,
        'credits': credits,
    })

def Projects(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    projects = Project.objects.all()
    credits = request.user.profile.credits
    return render(request, "daksha/Projects.html",{
        'username' : request.user.username,
        'email': request.user.email,
        'projectsData': projects,
        'credits': credits,
    })

def Hackathons(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    credits = request.user.profile.credits
    return render(request, "daksha/Hackathons.html",{
        'username' : request.user.username,
        'email': request.user.email,
        'credits': credits,
    })



@login_required
def showProject(request,title):
    form = SubmissionForm()
    if request.method == 'GET':
        project = Project.objects.filter(title = title)
        if (len(project) == 0):
            return HttpResponseRedirect(reverse("Projects"))
        submission = Submission.objects.filter(project = project[0], user = request.user)
        if len(submission)==0:
            return render(request, 'daksha/view_project.html',{
                'forms': form,
                'project': project[0],
                'username' : request.user.username,
                'email': request.user.email,
                'credits': credits,
            })
        return render(request, 'daksha/view_project.html',{
            'forms': form,
            'project': project[0],
            'submission': submission[0].files.url,
            'username' : request.user.username,
            'email': request.user.email,
            'credits': credits,
        })
    if request.method == 'POST':
        project = get_object_or_404(Project, title=title)
        sb = Submission.objects.filter(project=project, user=request.user).first()
        if (sb == None):
            sb = Submission() 
        file = request.FILES.get('file')
        if file.size < 15*1024*1024:
            sb.files = file
            sb.user = request.user
            sb.project = project
            sb.save()
            return render(request, 'daksha/view_project.html',{
            'forms': form,
            'project': project,
            'submission': sb.files.url,
            'username' : request.user.username,
            'email': request.user.email,
            'credits': credits,
            'show': True,
        })
        form = SubmissionForm()
        return render(request, 'daksha/view_project.html',{
            'forms': form,
            'project': project,
            'submission': sb.files.url,
            'username' : request.user.username,
            'email': request.user.email,
            'credits': credits,
            'show': False,
            'limit': "File Limit Exceeded",
        })



def serve_pdfs(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'pdfs/' +filename)
    if os.path.exists(file_path):
        if request.user.is_authenticated:
            with open(file_path, 'rb') as file:
                response = HttpResponse(file.read(), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
        else:
            return HttpResponseForbidden("You are not authorized to access this file.")
    else:
        return HttpResponseNotFound("File not found.")


def serve_images(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'images/' +filename)
    if os.path.exists(file_path):
        if request.user.is_authenticated:
            with open(file_path, 'rb') as file:
                response = HttpResponse(file.read(), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
        else:
            return HttpResponseForbidden("You are not authorized to access this file.")
    else:
        return HttpResponseNotFound("File not found.")


def serve_submissions(request, filename, username):
    file_path = os.path.join(settings.MEDIA_ROOT, 'submissions/'+username+'/' +filename)
    print(file_path)
    if os.path.exists(file_path):
        if request.user.is_authenticated and 'user_' + request.user.username == username:
            with open(file_path, 'rb') as file:
                response = HttpResponse(file.read(), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
        else:
            return HttpResponseForbidden("You are not authorized to access this file.")
    else:
        return HttpResponseNotFound("File not found.")

def Catalyst(request):
    return render(request, "daksha/Catalyst.html")