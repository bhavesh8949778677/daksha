from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage, get_connection,send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk) + str(timestamp) + str(user.is_active)

account_activation_token = AccountActivationTokenGenerator()

# Create your views here.
def index(request):
    return render(request, "daksha/index.html")

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
    return render(request, "users/login.html", {
                "message": "Logged Out"
            })

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"] 
        confirm = request.POST["confirm"]
        if password != confirm:
            return render(request, "users/register.html", {
                "message": "Passwords do not match"
            })
        if User.objects.filter(username=username).exists():
            return render(request, "users/register.html", {
                "message": "Username already taken"
            })
        user = User.objects.create_user(username=username, password=password, email=email)
        user.is_active = False
        user.save()
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
        return HttpResponseRedirect(reverse("Dashboard"))
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
    return render(request, "daksha/Dashboard.html")