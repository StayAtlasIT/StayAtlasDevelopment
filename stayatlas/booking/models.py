from django.db import models
from django.conf import settings
from django.utils.timezone import now
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.utils.timezone import now

class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=100, help_text="FontAwesome icon class, e.g., 'fas fa-wifi'")  # Store FA icons
    amenities = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='%(class)s_related')

    def __str__(self):
        return self.name
    
    # def save(self, *args, **kwargs):
    #     """ Auto-assign FontAwesome icon based on the amenity name """
    #     default_icons = {
    #         "Wi-Fi": "fas fa-wifi",
    #         "Swimming Pool": "fas fa-swimming-pool",
    #         "Parking": "fas fa-parking",
    #         "Air Conditioning": "fas fa-snowflake",
    #         "Television": "fas fa-tv",
    #         "Gym": "fas fa-dumbbell",
    #         "Elevator": "fas fa-elevator",
    #         "Breakfast Included": "fas fa-utensils",
    #         "Pet Friendly": "fas fa-paw",
    #         "Balcony": "fas fa-home",
    #         "Garden": "fas fa-seedling",
    #         "Beach Access": "fas fa-umbrella-beach",
    #         "Hot Tub": "fas fa-hot-tub",
    #         "Sauna": "fas fa-fire",
    #         "Washer & Dryer": "fas fa-tshirt",
    #         "Fireplace": "fas fa-fire-alt",
    #         "BBQ Grill": "fas fa-fire",
    #         "24/7 Security": "fas fa-shield-alt",
    #         "Children’s Play Area": "fas fa-child",
    #         "Work Desk": "fas fa-laptop",
    #         "Kitchen": "fas fa-blender",
    #         "Conference Room": "fas fa-users",
    #         "Smart Home Features": "fas fa-home",
    #         "Bicycle Rental": "fas fa-bicycle",
    #         "Tennis Court": "fas fa-table-tennis",
    #         "Power Backup": "fas fa-bolt",
    #         "Yoga & Meditation Area": "fas fa-spa",
    #         "Library": "fas fa-book",
    #         "Home Theatre": "fas fa-film",
    #         "CCTV Surveillance": "fas fa-video",
    #         "Helipad": "fas fa-helicopter",
    #         "Temple/Pooja Room": "fas fa-pray",
    #         "Bonfire Area": "fas fa-fire",
    #         "Open Terrace": "fas fa-cloud",
    #         "Driver's Accommodation": "fas fa-user",
    #         "Luxury Car Parking": "fas fa-car",
    #         "Doctor On Call": "fas fa-user-md"
    #     }

    #     # Assign an icon if it is missing
    #     if not self.icon and self.name in default_icons:
    #         self.icon = default_icons[self.name]
        
    #     super().save(*args, **kwargs)


class Property(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    villa_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=12)
    location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=50)
    rooms = models.IntegerField()
    beds = models.IntegerField(null=True, blank=True, default=1)
    baths = models.IntegerField(null=True, blank=True, default=1)
    description = models.TextField(null=True, blank=True)
    
    amenities = models.ManyToManyField(Amenity, blank=True)  # Many-to-Many relationship

    def __str__(self):
        return f"{self.property_type} in {self.location}", self.villa_name


    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(10000), MaxValueValidator(500000)],
        default=10000  # ✅ Default price
    )
    
    status = models.CharField(
        max_length=10,
        choices=[("Pending", "Pending"), ("Approved", "Approved"), ("Rejected", "Rejected")],
        default="Pending",
    )
    rejection_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # def get_amenities_list(self):
    #     """Returns amenities as a list of names"""
    #     return [amenity.name for amenity in self.amenities.all()]
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.location} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="property_images")
    image = models.ImageField(upload_to='property_images/')



    def __str__(self):
        return f"{self.property.first_name} {self.property.last_name}"

from django.contrib.auth import get_user_model

User = get_user_model()  # Import User model

# New Users model
class NewUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    full_name = models.CharField(max_length=255)
    contact = models.CharField(max_length=15, blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.user.email}"

# custom user model
from django.contrib.auth.models import AbstractUser, Group, Permission
User = get_user_model()

class User(AbstractUser):  # ✅ Custom User Model
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15, blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"  # Use email for authentication
    REQUIRED_FIELDS = ["username"]  # Username is still required

    groups = models.ManyToManyField(Group, related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions", blank=True)

    def __str__(self):
        return self.email

# Login Activity model
class UserLoginActivity(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # ✅ FIXED
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
    action = models.TextField()

    def __str__(self):
        return f"{self.user.email} - {self.timestamp}"
    
class Booking(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)  # ✅ Fixed
    property = models.ForeignKey("Property", on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.PositiveIntegerField()
    children = models.PositiveIntegerField()
    rooms = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.location} | {self.property} | {self.check_in} to {self.check_out}"


class addexclusive(models.Model):  # ✅ Fixed class name
    title = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=12)
    location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=50)
    rooms = models.IntegerField()
    beds = models.IntegerField()
    bath = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField()
    amenities = models.ManyToManyField(Amenity, blank=True)  # Many-to-Many relationship


    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.location} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"


class ExclusiveImage(models.Model):
    property = models.ForeignKey(addexclusive,on_delete=models.CASCADE,related_name="property_images")
    image = models.ImageField(upload_to="exclusive_images/")

    def __str__(self):
        return f"Image for {self.property.first_name} {self.property.last_name}"
        
class exclusivebookings(models.Model):
    title = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=12)
    location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=50)
    rooms = models.IntegerField()
    beds = models.IntegerField()
    bath = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.location} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"



# from django.db import models

# class ExclusiveImage(models.Model):
#     booking_id = models.IntegerField()  # Added booking_id field
#     image = models.ImageField(upload_to="uploads/")
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.image.url
