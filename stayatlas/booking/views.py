import logging
from .models import NewUser, Booking

# Set up logger
logger = logging.getLogger(__name__)

from .models import Property, PropertyImage, Amenity ,NewUser, UserLoginActivity , exclusivebookings, ExclusiveImage ,addexclusive ,Property, PropertyImage ,Booking

from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import PropertyForm

from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q , Max
from django.core.exceptions import ValidationError


from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.files.storage import default_storage
import json
from django.views.decorators.http import require_http_methods
from datetime import datetime





def home(request):
    amenities = Amenity.objects.all()  # Fetch amenities from the database
    return render(request, 'home/index.html', {'amenities': amenities})
    # return render(request, 'home/index.html')

def explore_view(request):
    """ ✅ Fetch only approved properties with images """
    approved_properties = Property.objects.filter(status="Approved").prefetch_related("property_images")
    
    return render(request, "explore/Html/explore.html", {"properties": approved_properties})


# def exclusive_view(request):
#     exclusive_bookings = addexclusive.objects.all()  # ✅ Fetch approved properties

#     return render(request, "exclusive/Html/exclusive.html", {"exclusive_bookings": exclusive_bookings  # ✅ Pass the correct variable
#     })




@login_required
def exclusive_view(request):
    exclusive_bookings = addexclusive.objects.prefetch_related("property_images").all() 

    return render(request, "exclusive/exclusive.html", {"exclusive_bookings": exclusive_bookings})


@login_required
def exclusivebooking_detail_view(request, id):
    # ✅ Fetch the exclusive property using ID
    exclusive_property = get_object_or_404(addexclusive, id=id)

    # ✅ Fetch related images (assuming ForeignKey relationship)
    exclusive_images = ExclusiveImage.objects.filter(property=exclusive_property)  

    return render(request, "booking/Booking/Html/exclusivebooking.html", {
        "exclusive_property": exclusive_property,  # ✅ Updated variable name
        "exclusive_images": exclusive_images,  # ✅ Add this
    })

def new_view(request):
    return render(request, 'exclusive/new.html')

def sub_view(request):
    return render(request, 'exclusive/sub.html')

# def login_view(request):
    # if request.method == "POST":
    #     email = request.POST.get("email")
    #     password = request.POST.get("password")

    #     # Check if email and password are provided
    #     if not email or not password:
    #         messages.error(request, "Please enter email and password")
    #         return redirect("login")

    #     user = authenticate(username=email, password=password)

    #     if user:
    #         auth_login(request, user)
    #         messages.success(request, "Login successful!")
    #         return redirect("home")  # Redirect to home after successful login

    #     messages.error(request, "Invalid credentials")
    #     return redirect("login")

    # return render(request, "home/login.html")


def book_view(request):
    return render(request, 'booking/book_pg.html')


def customer_support_view(request):
    return render(request, 'home/chat.html')


def about_us_view(request):
    return render(request, 'home/aboutus/aboutus.html')


def privacy_policy_view(request):
    return render(request, 'home/policy/PrivacyPolicy.html')


def terms_view(request):
    return render(request, 'home/policy/term.html')


def cancellation_policy_view(request):
    return render(request, 'home/policy/Cancellation_Policy.html')

# def bkindex_view(request):
#     return render(request, 'booking/Booking/Html/index.html')

def list_property_view(request):
    amenities = Amenity.objects.all()
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property_instance = form.save(commit=False)

            # Handle location (custom or selected)
            property_instance.location = request.POST.get('custom_location') or request.POST.get('location', '')

            # Ensure description is properly saved
            property_instance.description = request.POST.get('description', '').strip()

            # Handle rooms input safely
            rooms_value = request.POST.get('rooms', '1')  # Default to '1'
            property_instance.rooms = 5 if rooms_value == "5+" else int(rooms_value)

            # Handle beds and baths input safely
            beds_value = request.POST.get('beds', '1')
            baths_value = request.POST.get('baths', '1')

            property_instance.beds = 5 if beds_value == "5+" else int(beds_value)
            property_instance.baths = 5 if baths_value == "5+" else int(baths_value)

            # Ensure valid range (1-20)
            property_instance.rooms = min(max(property_instance.rooms, 1), 20)
            property_instance.beds = min(max(property_instance.beds, 1), 20)
            property_instance.baths = min(max(property_instance.baths, 1), 20)

            # Set property type
            property_instance.property_type = request.POST.get('property_type', '')

            # Ensure a valid price is provided
            price_value = request.POST.get('price', '10000')  # Default to 10000
            try:
                property_instance.price = float(price_value)
                if property_instance.price < 10000 or property_instance.price > 500000:
                    raise ValueError("Price out of range")
            except ValueError:
                property_instance.price = 10000  # Set default price if invalid input

            # Save property instance first
            property_instance.save()

           # Handle amenities as list
            selected_amenities = request.POST.getlist('amenities')

            # Save related images AFTER property is saved
            for file in request.FILES.getlist('photos'):
                PropertyImage.objects.create(property=property_instance, image=file)

            # Assign many-to-many amenities after saving the property
            if selected_amenities:
                amenities_objects = Amenity.objects.filter(id__in=selected_amenities)  # Filter by IDs
                property_instance.amenities.set(amenities_objects)  # Properly assign ManyToManyField

            messages.success(request, "Your property request is being verified. We will contact you soon!")
            return redirect('home')  # Redirect to success page

        else:
            print(form.errors)  # Debugging: Print form errors if validation fails
    else:
        form = PropertyForm()
    return render(request, 'home/listproperty/list.html', {'form': form, 'amenities': amenities})


def popup_property_request(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        villa_name = request.POST.get('villa_name', '').strip()  # Capture the Villa Name
        email = request.POST.get('email', '').strip()
        mobile = request.POST.get('mobile', '').strip()

        # Use manual location if filled, otherwise use dropdown selection
        selected_location = request.POST.get('location', '').strip()
        manual_location = request.POST.get('manual_location', '').strip()
        location = manual_location if selected_location == "other" and manual_location else selected_location

        property_type = request.POST.get('property_type', '').strip()
        rooms = request.POST.get('custom_rooms', '').strip() if request.POST.get('custom_rooms') else request.POST.get('rooms', '').strip()
        description = request.POST.get('description', '').strip()

        # If "5+" is selected, use custom_rooms input
        rooms_input = request.POST.get('custom_rooms', '').strip() if request.POST.get('custom_rooms') else request.POST.get('rooms', '').strip()
        beds = request.POST.get('beds', '').strip()
        baths = request.POST.get('baths', '').strip()
        price = request.POST.get('price', '').strip()

        # Handle amenities as list
        selected_amenities = request.POST.getlist('amenities')

        # Ensure valid integer values for rooms, beds, and baths
        try:
            rooms = int(rooms_input)
            beds = int(beds) if beds else 1
            baths = int(baths) if baths else 1
            if rooms < 1 or rooms > 15:
                raise ValidationError("Rooms must be between 1 and 15.")
            if beds < 1 or beds > 20:
                raise ValidationError("Beds must be between 1 and 20.")
            if baths < 1 or baths > 20:
                raise ValidationError("Baths must be between 1 and 20.")
        except ValueError:
            messages.error(request, "Invalid room, bed, or bath value.")
            return redirect('home')
        
        # Validate price
        try:
            price = float(price)
            if price < 10000 or price > 500000:
                raise ValidationError("Price must be between ₹10,000 and ₹5,00,000.")
        except ValueError:
            messages.error(request, "Invalid price value.")
            return redirect('home')
        
        # Ensure all required fields are filled
        if not all([first_name, last_name, villa_name, email, mobile, location, property_type]):
            messages.error(request, "Please fill all required fields.")
            return redirect('home')

        # Create the property instance with all required fields
        property_instance = Property(
            first_name=first_name,
            last_name=last_name,
            villa_name=villa_name,
            email=email,
            mobile=mobile,
            location=location,
            property_type=property_type,
            rooms=rooms,
            beds=beds,
            baths=baths,
            description=description,
            price=price,
        )

        # Save the property instance before assigning amenities
        property_instance.save()

        # Assign many-to-many amenities after saving the property
        if selected_amenities:
            amenities_objects = Amenity.objects.filter(id__in=selected_amenities)  # Filter by IDs
            property_instance.amenities.set(amenities_objects)  # Properly assign ManyToManyField

        # Save uploaded images
        for file in request.FILES.getlist('photos'):
            PropertyImage.objects.create(property=property_instance, image=file)

        messages.success(request, "Your property request has been submitted successfully!")
        return redirect('home')

    # Fetch amenities to display in the form
    amenities = Amenity.objects.all()
    return render(request, 'home/index.html', {'amenities': amenities})

# ✅ Add this function:
# def property_success_view(request):
    # return render(request, 'home/listproperty/success.html')

def property_request_form(request):
    amenities = Amenity.objects.all()  # Fetch all amenities
    return render(request, 'index.html', {'amenities': amenities})

def admin_view(request):
    properties = Property.objects.only('id', 'name', 'location')  # Fetch only required fields
    amenities = Amenity.objects.all()
    return render(request, 'admin.html', {'properties': properties, 'amenities': amenities})

def property_details(request, property_id):
    property_obj = get_object_or_404(Property, id=property_id)
    return render(request, 'details.html', {'property': property_obj})

@login_required
def custom_admin_view(request):
    search_query = request.GET.get("search", "").strip()
    from_date = request.GET.get("from_date", "")
    to_date = request.GET.get("to_date", "")

    # Start with all properties
    pending_properties = Property.objects.filter(status="Pending")
    accepted_properties = Property.objects.filter(status="Approved")
    rejected_properties = Property.objects.filter(status="Rejected")

    # Apply search filter if provided
    if search_query:
        filter_conditions = (
            Q(first_name__icontains=search_query) |
            Q(last_name__icontains=search_query) |
            Q(location__icontains=search_query) |
            Q(property_type__icontains=search_query) |
            Q(title__icontains=search_query)
        )
        pending_properties = pending_properties.filter(filter_conditions)
        accepted_properties = accepted_properties.filter(filter_conditions)
        rejected_properties = rejected_properties.filter(filter_conditions)
    
    # Apply date filters if provided
    if from_date:
        from_date_obj = datetime.strptime(from_date, "%Y-%m-%d")
        pending_properties = pending_properties.filter(
            created_at__gte=from_date_obj)
        accepted_properties = accepted_properties.filter(
            created_at__gte=from_date_obj)
        rejected_properties = rejected_properties.filter(
            created_at__gte=from_date_obj)

    if to_date:
        to_date_obj = datetime.strptime(to_date, "%Y-%m-%d")
        pending_properties = pending_properties.filter(
            created_at__lte=to_date_obj)
        accepted_properties = accepted_properties.filter(
            created_at__lte=to_date_obj)
        rejected_properties = rejected_properties.filter(
            created_at__lte=to_date_obj)
        

    max_id = addexclusive.objects.aggregate(Max("id"))["id__max"] or 0
    new_exclusive_id = max_id + 1  # Ensure a new ID is always available

    context = {
        "pending_properties": pending_properties,
        "accepted_properties": accepted_properties,
        "rejected_properties": rejected_properties,
        "exclusive_id": new_exclusive_id,
    }

    return render(request, "admin/admin.html", context)




@login_required
def addexclusive_view(request):
    amenities = Amenity.objects.all()

    if request.method == "POST":
        title = request.POST.get("title")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        mobile = request.POST.get("mobile")
        location = request.POST.get("location")
        property_type = request.POST.get("property_type")
        rooms = request.POST.get("rooms")
        beds = request.POST.get("beds")
        bath = request.POST.get("bath")
        price = request.POST.get("price")
        description = request.POST.get("description")

        # Handle amenities as list
        selected_amenities = request.POST.getlist('amenities')

        # ✅ Create the property instance before using it
        exclusive_instance = addexclusive.objects.create(
            title=title,
            first_name=first_name,
            last_name=last_name,
            email=email,
            mobile=mobile,
            location=location,
            property_type=property_type,
            rooms=rooms,
            beds=beds,
            bath=bath,
            price=price,
            description=description
        )

        # Assign many-to-many amenities after saving the property
        if selected_amenities:
            amenities_objects = Amenity.objects.filter(id__in=selected_amenities)  # Filter by IDs
            exclusive_instance.amenities.set(amenities_objects)  # Properly assign ManyToManyField

        # ✅ Handle multiple image uploads
        photos = request.FILES.getlist("photos")  # 🔥 Ensure you get the images correctly
        if photos:
            for file in photos:
                ExclusiveImage.objects.create(
                    property=exclusive_instance, image=file
                )

        # Fetch amenities to display in the form
        return JsonResponse({"success": True, "message": "Villa added successfully!"})
    return render(request, "admin/addexclusive.html" , {'amenities': amenities})



# def editexclusive_view(request, id):
#     exclusiveproperty_obj = get_object_or_404(Property, id=id)
#     return render(request, "admin/editexclusive.html", {"property": exclusiveproperty_obj})


def editexclusive_view(request, id):
    booking = get_object_or_404(addexclusive, id=id)
    images = ExclusiveImage.objects.filter(property=booking)  # ✅ Fetch images for the booking

    if request.method == "POST":
        booking.title = request.POST.get("title")
        booking.first_name = request.POST.get("first_name")
        booking.last_name = request.POST.get("last_name")
        booking.email = request.POST.get("email")
        booking.mobile = request.POST.get("mobile")
        booking.location = request.POST.get("location")
        booking.property_type = request.POST.get("property_type")
        booking.rooms = request.POST.get("rooms")
        booking.beds = request.POST.get("beds")
        booking.bath = request.POST.get("bath")
        booking.price = request.POST.get("price")
        booking.description = request.POST.get("description")

        booking.save()  # ✅ Save changes

        # ✅ Fetch updated images (Fix: Use `booking`, not `exclusive`)
        images = ExclusiveImage.objects.filter(property=booking)

        return render(request, "editexclusive.html", {
            "booking": booking,  # ✅ Use the correct variable name
            "images": images
        })

    return render(request, "admin/editexclusive.html", {"booking": booking, "images": images})






@login_required
def approve_property(request, property_id):
    # Debugging message
    logger.debug(f"Approving property with ID: {property_id}")
    if not request.user.is_staff:
        messages.error(request, "Access Denied!")
        return redirect("home")

    property_obj = get_object_or_404(Property, id=property_id)
    property_obj.status = "Approved"
    property_obj.save()
    messages.success(request, "Property approved successfully.")
    return redirect("custom_admin")  # Change from "admin" to "custom_admin"


@login_required
def reject_property(request, property_id):
    # Debugging message
    logger.debug(f"Rejecting property with ID: {property_id}")
    if not request.user.is_staff:
        messages.error(request, "Access Denied!")
        return redirect("home")

    property_obj = get_object_or_404(Property, id=property_id)
    property_obj.status = "Rejected"
    property_obj.save()
    messages.error(request, "Property rejected successfully.")
    return redirect("custom_admin")


@login_required
def details_view(request, id):
    property_obj = get_object_or_404(Property, id=id)
    return render(request, "admin/details.html", {"property": property_obj})



def editproperty_view(request, id):
    property_obj = get_object_or_404(Property, id=id)
    return render(request, "admin/editproperty.html", {"property": property_obj})


def rejectprop_view(request, id):
    property_obj = get_object_or_404(Property, id=id)
    return render(request, "admin/rejectprop.html", {"property": property_obj})




@login_required
def villabooking_view(request, id):
    booking = get_object_or_404(Booking, id=id)
    return render(request, "admin/villabookings.html")


@login_required
def registrations_view(request):
    return render(request, "admin/registrations.html")


@login_required
def bookings_view(request):
    bookings = Booking.objects.filter(user=request.user)
    return render(request, "admin/bookings.html", {"bookings": bookings})

def exclusivebookings_view(request):
    exclusive_bookings = addexclusive.objects.prefetch_related(
        "property_images"  # ✅ Use the correct related_name
    ).all()  

    return render(request, "admin/exclusivebookings.html", {
        "exclusive_bookings": exclusive_bookings
    })


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def update_property_status(request, property_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            status = data.get("status")
            rejection_reason = data.get("rejection_reason", "")

            property_obj = Property.objects.get(id=property_id)
            property_obj.status = status

            # Save rejection reason if the property is rejected
            if status == "Rejected":
                property_obj.rejection_reason = rejection_reason
            else:
                property_obj.rejection_reason = ""

            property_obj.save()

            return JsonResponse({
                "success": True,
                "status": status,
                "rejection_reason": property_obj.rejection_reason
            })

        except Property.DoesNotExist:
            return JsonResponse({"success": False, "error": "Property not found"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    return JsonResponse({"success": False, "error": "Invalid request method"})


# def admin_dashboard(request):
#     first_name = request.GET.get('first_name', '')
#     location = request.GET.get('location', '')
#     property_type = request.GET.get('type', '')

#     # Filtering properties based on user input
#     pending_properties = Property.objects.filter(status="Pending")
#     accepted_properties = Property.objects.filter(status="Approved")
#     rejected_properties = Property.objects.filter(status="Rejected")

#     if first_name:
#         pending_properties = pending_properties.filter(first_name__icontains=first_name)
#         accepted_properties = accepted_properties.filter(first_name__icontains=first_name)
#         rejected_properties = rejected_properties.filter(first_name__icontains=first_name)

#     if location:
#         pending_properties = pending_properties.filter(location__icontains=location)
#         accepted_properties = accepted_properties.filter(location__icontains=location)
#         rejected_properties = rejected_properties.filter(location__icontains=location)

#     if property_type:
#         pending_properties = pending_properties.filter(property_type__icontains=property_type)
#         accepted_properties = accepted_properties.filter(property_type__icontains=property_type)
#         rejected_properties = rejected_properties.filter(property_type__icontains=property_type)

#     context = {
#         'pending_properties': pending_properties,
#         'accepted_properties': accepted_properties,
#         'rejected_properties': rejected_properties,
#     }

#     return render(request, 'admin_dashboard.html', context)

from django.db.models import Q
from django.http import JsonResponse
from .models import Property
from datetime import datetime

def filter_properties(request):
    search_query = request.GET.get("search", "").strip().lower()
    location_query = request.GET.get("location", "").strip().lower()
    type_query = request.GET.get("type", "").strip().lower()
    from_date = request.GET.get("from_date", "").strip()
    to_date = request.GET.get("to_date", "").strip()

    properties = Property.objects.all()

    # Convert dates to proper format
    if from_date:
        from_date = datetime.strptime(from_date, "%Y-%m-%d")
    if to_date:
        to_date = datetime.strptime(to_date, "%Y-%m-%d")

    # Apply search filters
    filter_conditions = Q()
    if search_query:
        filter_conditions |= Q(first_name__icontains=search_query) | Q(location__icontains=search_query) | Q(property_type__icontains=search_query)

    if location_query:
        filter_conditions &= Q(location__icontains=location_query)

    if type_query:
        filter_conditions &= Q(property_type__icontains=type_query)

    if from_date:
        filter_conditions &= Q(date_added__gte=from_date)

    if to_date:
        filter_conditions &= Q(date_added__lte=to_date)

    properties = properties.filter(filter_conditions)

    data = list(properties.values("id", "first_name", "location", "property_type", "date_added"))
    return JsonResponse(data, safe=False)





from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.contrib import messages
from django.conf import settings

User = get_user_model()  # Now refers to RegisteredUser

# 🔹 User Registration View
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register(request):
    if request.method == "POST":
        full_name = request.POST.get("full_name").strip()
        email = request.POST.get("email").strip()
        username = request.POST.get("username").strip()
        password = request.POST.get("password").strip()
        contact = request.POST.get("contact", "").strip()

        if User.objects.filter(email=email).exists() or User.objects.filter(username=username).exists():

            messages.error(request, "Email already taken.")
            return redirect("register")

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.contact = contact
        user.save()

        messages.success(request, "Registration successful! You can now log in.")
        return redirect("login")

    return render(request, "register.html")

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email").strip()
        password = request.POST.get("password").strip()

        # Admin Login
        if email == settings.ADMIN_CREDENTIALS["email"] and password == settings.ADMIN_CREDENTIALS["password"]:
            request.session["admin_logged_in"] = True
            return redirect("admin")

        # User Login
        user = authenticate(request, email=email, password=password)
        if user:
            login(request, user)
            return redirect("home/index")  # Redirect user to home

        messages.error(request, "Invalid credentials.")

    return render(request, "login.html")

@csrf_exempt
def logout_view(request):
    request.session.flush()
    logout(request)
    return redirect("login")

@csrf_exempt
def admin_dashboard(request):
    if not request.session.get("admin_logged_in"):
        return redirect("login")

    return render(request, "admin/admin.html")




def book_property(request, property_id):
    """Handle booking for a specific property."""
    property_obj = get_object_or_404(Property, id=property_id)
    
    if request.method == "POST":
        # Logic to handle booking (e.g., saving booking details)
        # For now, just a success message
        messages.success(request, f"You have successfully booked {property_obj.title}!")
        return redirect('home')  # Redirect to home or another page after booking

    return render(request, 'booking/book_pg.html', {'property': property_obj})


def propertydetail_view(request, id):
    property_obj = get_object_or_404(Property, id=id)
    return render(request, "booking/Booking/Html/index.html", {"property": property_obj})


def exclusive_new_view(request):
    return render(request, "exclusive/Html/exclusive_new.html")





@require_http_methods(["POST"])
def update_property(request, property_id):
    try:
        # Debug logging
        print(f"Received request for property {property_id}")
        print(f"Request body: {request.body}")

        data = json.loads(request.body)
        property = Property.objects.get(id=property_id)

        # Update fields with validation
        for field, value in data.items():
            if hasattr(property, field):
                setattr(property, field, value)

        property.save()

        return JsonResponse({
            'success': True,
            'message': 'Property updated successfully'
        })
    except Property.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Property not found'
        }, status=404)
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        print(f"Error updating property: {str(e)}")  # Debug logging
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@require_POST
def delete_property_photo(request, image_id):
    try:
        image = PropertyImage.objects.get(id=image_id)
        # Delete the actual file
        if image.image:
            default_storage.delete(image.image.path)
        # Delete the database record
        image.delete()
        return JsonResponse({'success': True})
    except PropertyImage.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Image not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})


@require_POST
def upload_property_photos(request, property_id):
    try:
        property_obj = Property.objects.get(id=property_id)
        files = request.FILES.getlist('photos')

        for file in files:
            PropertyImage.objects.create(
                property=property_obj,
                image=file
            )

        return JsonResponse({'success': True})
    except Property.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Property not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})





from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import ExclusiveImage

def get_exclusive_images(request, booking_id):
    images = ExclusiveImage.objects.filter(booking_id=booking_id)
    image_list = [{"id": img.id, "url": img.image.url} for img in images]
    return JsonResponse({"images": image_list})

@csrf_exempt
def upload_exclusive_images(request, booking_id):
    if request.method == "POST":
        images = request.FILES.getlist("photos")
        if not images:
            return JsonResponse({"success": False, "error": "No files uploaded"}, status=400)
        
        for image in images:
            ExclusiveImage.objects.create(booking_id=booking_id, image=image)
        
        return JsonResponse({"success": True})
    return JsonResponse({"success": False}, status=400)

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import ExclusiveImage

@csrf_exempt
def delete_exclusive_image(request, image_id):
    if request.method == "POST":
        image = get_object_or_404(ExclusiveImage, id=image_id)
        image.delete()  # Properly indented
        return JsonResponse({"success": True})
    return JsonResponse({"success": False}, status=400)

