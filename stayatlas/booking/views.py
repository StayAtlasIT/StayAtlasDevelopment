from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import PropertyForm
from .models import Property, PropertyImage

def home(request):
    return render(request, 'home/index.html')

def exclusive_view(request):
    return render(request, 'exclusive/index1.html')

def login(request):
    return render(request, 'home/login.html')

def sub(request):
    return render(request, 'booking/sub.html')

def customer_support_view(request):
    return render(request, 'home/chat.html')

def about_us_view(request):
    return render(request, 'home/aboutus/aboutus.html')

#def contact_us_view(request):
    # Assuming you have a contact us page, create a template for it
    #return render(request, 'home/contactus.html')

def privacy_policy_view(request):
    return render(request, 'home/policy/PrivacyPolicy.html')

def terms_view(request):
    return render(request, 'home/policy/term.html')

def cancellation_policy_view(request):
    return render(request, 'home/policy/Cancellation_Policy.html')

def list_property_view(request):
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property_instance = form.save(commit=False)
            
            # Ensure custom or selected location is saved
            if request.POST.get('custom_location'):
                property_instance.location = request.POST['custom_location']
            else:
                property_instance.location = request.POST.get('location')

            # Ensure rooms field is set correctly
            if request.POST.get('custom_rooms'):
                property_instance.rooms = request.POST['custom_rooms']  # Custom rooms input
            else:
                property_instance.rooms = request.POST.get('rooms', 1)  # Default to at least 1 room

            #property_instance.save()

            # Ensure property type is saved
            property_instance.property_type = request.POST.get('property_type')

            property_instance.save()

            # Save description
            property_instance.description = request.POST.get('description')

            property_instance.save()

            # Handle multiple images
            for file in request.FILES.getlist('photos'):
                PropertyImage.objects.create(property=property_instance, image=file)

            messages.success(request, "Your property request is being verified. We will contact you soon!")
            return redirect('home')  # Redirect to success page
    else:
        form = PropertyForm()
    
    return render(request, 'home/listproperty/list.html', {'form': form})

def popup_property_request(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        email = request.POST.get('email', '').strip()
        mobile = request.POST.get('mobile', '').strip()
        
        # Use manual location if filled, otherwise use dropdown selection
        # Determine which location field to use
        # Use manual location if "Other" is selected, otherwise use dropdown
        selected_location = request.POST.get('location', '').strip()
        manual_location = request.POST.get('manual_location', '').strip()
        location = manual_location if selected_location == "other" and manual_location else selected_location

        property_type = request.POST.get('property_type', '').strip()
        rooms = request.POST.get('custom_rooms', '').strip() if request.POST.get('custom_rooms') else request.POST.get('rooms', '').strip()
        description = request.POST.get('description', '').strip()
        
        # If "5+" is selected, use custom_rooms input
        rooms = request.POST.get('custom_rooms', '').strip() if request.POST.get('custom_rooms') else request.POST.get('rooms', '').strip()

        description = request.POST.get('description', '').strip()

        # Ensure rooms is an integer within the range 1-15
        try:
            rooms = int(rooms)
            if rooms < 1 or rooms > 15:
                raise ValueError("Rooms must be between 1 and 15.")
        except ValueError:
            messages.error(request, "Invalid number of rooms. Please enter a number between 1 and 15.")
            return redirect('home')

        # Ensure all required fields are filled
        if not all([first_name, last_name, email, mobile, location, property_type]):
            messages.error(request, "Please fill all required fields.")
            return redirect('home')

        # Save property request
        property_instance = Property.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            mobile=mobile,
            location=location,
            property_type=property_type,
            rooms=rooms,
            description=description
        )

        # Save uploaded images
        for file in request.FILES.getlist('photos'):
            PropertyImage.objects.create(property=property_instance, image=file)

        messages.success(request, "Your property request has been submitted successfully!")
        return redirect('home')

    return render(request, 'home/index.html')
# ✅ Add this function:
#def property_success_view(request):
    #return render(request, 'home/listproperty/success.html')

