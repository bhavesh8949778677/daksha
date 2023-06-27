from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name="index"),
    path("SignIn", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path('activate/<str:uidb64>/<str:token>/', views.activate_account, name='activate_account'),
    path("Dashboard", views.Dashboard, name="Dashboard"),
    path("Projects", views.Projects, name="Projects"),
    path("Hackathons", views.Hackathons, name="Hackathons"),
    path("ProjectsData", views.projectsData, name= "Projects Data"),
    path("<str:title>/view", views.showProject, name = "Show Project"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
