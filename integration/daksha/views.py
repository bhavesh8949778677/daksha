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
import html
import datetime

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


def projectsData(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
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
            'category': project.category,
            'tool': project.tool,
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
    submissions = Submission.objects.filter(user=request.user).order_by('submission_time')
    # credits = [0,]
    total_credits = 0
    credits = 0
    total_duration = 0
    projects = []
    credits_list = []
    time_list = []
    Programming_credits = 0
    Business_development_credits = 0
    App_development_credits = 0
    last_total_credits = 0
    for submission in submissions:
        credits+= submission.got_credits
        if (submission.project.category == "Programming"):
            Programming_credits+=submission.got_credits
        elif (submission.project.category == "App Development"):
            App_development_credits+=submission.got_credits
        else:
            Business_development_credits+=submission.got_credits
        last_total_credits = submission.project.credits
        time_list.append((submission.submission_time.strftime('%d%B%Y')))
        credits_list.append(credits)
        total_credits+= submission.project.credits
        total_duration+=submission.project.duration
        projects.append({'title':submission.project.title,'credits':submission.got_credits})

    if credits!=0:
        Programming_credits = (Programming_credits*100)/credits
        Business_development_credits = (Business_development_credits*100)/credits
        App_development_credits = (App_development_credits*100)/credits
    else:
        Programming_credits = 0
        Business_development_credits = 0
        App_development_credits = 0 
    request.user.profile.credits = credits
    x = User.objects.all()
    total_users = len(x)
    print(total_users)
    print(projects)
    print(request.user.profile.rank)
    users = Profile.objects.all()
    count = 0
    for x in users:
        if x.credits >total_credits:
            count+=1
    request.user.profile.rank = 1+count
    if (total_credits==0):
        accuracy = "NA"
    else:
        accuracy = ((credits*100)//total_credits)
    last_increment = 0
    if (len(credits_list)>1):
        last_increment =  credits_list[-1] - credits_list[-2]
    elif (len(credits_list)==1):
        last_increment = credits_list[0]
    else:
        last_increment = "NA"
    if (len(credits_list)>0):
        latest_accuracy = (credits_list[-1]*100)//last_total_credits
    else:
        latest_accuracy = "NA"
    return render(request, "daksha/dashboard.html",{
        'username' : request.user.username,
        'email': request.user.email,
        'credits': credits,
        'project_list': projects,
        'rank': request.user.profile.rank,
        'total_credits': total_credits,
        'total_duration': total_duration,
        'accuracy': accuracy,
        'total_users': total_users,
        'credits_list': credits_list,
        'time_list': time_list,
        'Programming_credits': Programming_credits,
        'Business_development_credits': Business_development_credits,
        'App_development_credits':App_development_credits,
        'last_increment': last_increment, 
        'latest_accuracy': latest_accuracy,
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




def showProject(request,title):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
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
        if sb:
            if sb.files:
                os.remove(sb.files.path)
            sb.delete()

        file = request.FILES.get('file')
        if file!=None and file.size < 15*1024*1024:
            sb = su
            sb.files = file
            sb.user = request.user
            sb.project = project
            sb.submission_time = datetime.datetime.now()
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

