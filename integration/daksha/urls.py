from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name="index"),
    path("SignIn", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path('activate/<str:uidb64>/<str:token>/', views.activate_account, name='activate_account'),
    path("Dashboard", views.Dashboard, name="Dashboard"),
    path("Projects", views.Projects, name="Projects"),
    path("Hackathons", views.Hackathons, name="Hackathons"),
]