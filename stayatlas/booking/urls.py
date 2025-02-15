from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('exclusive/', views.exclusive_view, name='exclusive'),
    path('list-property/', views.list_property_view, name='list_property'),
    path('popup-property-request/', views.popup_property_request, name='popup_property_request'),
    path('customer-support/', views.customer_support_view, name='customer_support'),
    path('about-us/', views.about_us_view, name='about_us'),
    path('terms/', views.terms_view, name='terms'),
    path('privacy-policy/', views.privacy_policy_view, name='privacy_policy'),
    path('cancellation-policy/', views.cancellation_policy_view, name='cancellation_policy'),
    path('login/', views.login, name='login'),
]
