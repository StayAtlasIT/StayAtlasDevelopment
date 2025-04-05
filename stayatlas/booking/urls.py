from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    home, exclusive_view, explore_view, new_view, login_view, book_view, customer_support_view, about_us_view, privacy_policy_view, terms_view, cancellation_policy_view, list_property_view, approve_property, reject_property, popup_property_request, custom_admin_view, # New custom admin view
    bookings_view, details_view, villabooking_view, registrations_view, update_property_status, filter_properties, register, login_view, logout_view, admin_dashboard, book_property, propertydetail_view, property_request_form   , editproperty_view, update_property, delete_property_photo,get_exclusive_images, upload_property_photos, rejectprop_view, addexclusive_view, 
    exclusivebookings_view, editexclusive_view, exclusive_new_view , get_exclusive_images, upload_exclusive_images, delete_exclusive_image, 
    exclusivebooking_detail_view
)



urlpatterns = [
    path('', home, name='home'),
    path('exclusive/', exclusive_view, name='exclusive'),
    path('property-request/', property_request_form, name='property_request'),  # New endpoint
    path('explore/', explore_view, name='explore'),
    path('new/', new_view, name='new'),
    path('login/', login_view, name='login'),
    path('book/', book_view, name='book'),
    path('customer_support/', customer_support_view, name='customer_support'),    
    path('book_property/<int:property_id>/', book_property, name='book_property'),
    path("book-property/<int:id>/", book_property, name="book_property"),
    path('about_us/', about_us_view, name='about_us'),
    path('privacy_policy/', privacy_policy_view, name='privacy_policy'),
    path('terms/', terms_view, name='terms'),
    path('cancellation_policy/', cancellation_policy_view, name='cancellation_policy'),
    path('list_property/', list_property_view, name='list_property'),
    path('custom-admin/', custom_admin_view, name='custom_admin'),  # Updated URL pattern
    path('bookings/', bookings_view, name='bookings'),  # Added URL pattern for dashboard bookings
    path('exclusivebookings/', exclusivebookings_view, name='exclusivebookings'),
    path("registrations/", registrations_view, name="registrations"),  # Added URL pattern for dashboard registrations
    path("details/<int:id>/", details_view, name="details"),
    path("villabooking/<int:id>/", villabooking_view, name="villabooking"),
    path("addexclusive/", addexclusive_view, name="addexclusive"),
    path('approve_property/<int:property_id>/', approve_property, name='approve_property'),
    path('reject_property/<int:property_id>/', reject_property, name='reject_property'),
    path('popup_property_request/', popup_property_request, name='popup_property_request'),
    path('update-property-status/<int:property_id>/', update_property_status, name="update_property_status"),
    path("filter-properties/", filter_properties, name="filter_properties"),

    path("editproperty/<int:id>/", editproperty_view, name="editproperty"),
    path("editexclusive/<int:id>/", editexclusive_view, name="editexclusive"),
    path('get-exclusive-images/<int:booking_id>/', get_exclusive_images, name='get_exclusive_images'),
    path('upload-exclusive-images/<int:booking_id>/', upload_exclusive_images, name='upload_exclusive_images'),
    path('delete-exclusive-image/<int:image_id>/', delete_exclusive_image, name='delete_exclusive_image'),


    path("rejectprop/<int:id>/", rejectprop_view, name="rejectprop"),
    path('update-property/<int:property_id>/', update_property, name='update_property'),
    path('delete-property-photo/<int:image_id>/', delete_property_photo, name='delete_property_photo'),
    path('upload-property-photos/<int:property_id>/', upload_property_photos, name='upload_property_photos'),
    path('exclusive/new/', exclusive_new_view, name='exclusive_new'),


    path("register/", register, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("admin-dashboard/", admin_dashboard, name="admin_dashboard"),
    # path("bkindex/", bkindex_view, name="bkindex"),

    path("property/<int:id>/", propertydetail_view, name="property_details"),
    path("book-property/<int:id>/", book_property, name="book_property"),

    path("exclusivebooking/<int:id>/", exclusivebooking_detail_view, name="exclusivebooking_detail"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)