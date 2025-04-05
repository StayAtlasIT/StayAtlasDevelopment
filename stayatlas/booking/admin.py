from django.contrib import admin
from django.db import models
from django.utils.html import format_html
from .models import Property, PropertyImage, NewUser, UserLoginActivity, Booking, ExclusiveImage ,addexclusive

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1  # Allow one extra blank image field
    
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'villa_name', 'email', 'mobile', 'location', 'property_type', 'rooms', 'status')
    list_filter = ('status', 'property_type', 'location')
    search_fields = ('first_name', 'last_name', 'villa_name', 'email', 'mobile', 'location', 'description', "amenities")
    inlines = [PropertyImageInline]
    actions = ['approve_property', 'reject_property']
    filter_horizontal = ('amenities',)  # Allows multi-select UI in admin for amenities

    def amenities_display(self, obj):
        return ", ".join([amenity.name for amenity in obj.amenities.all()])
    amenities_display.short_description = "Amenities"

    def approve_property(self, request, queryset):
        queryset.update(status="Approved")
    approve_property.short_description = "Approve selected properties"

    def reject_property(self, request, queryset):
        queryset.update(status="Rejected")
    reject_property.short_description = "Reject selected properties"

    def thumbnail(self, obj):
        first_image = obj.property_images.first() if hasattr(obj, "property_images") else obj.propertyimage_set.first()
    
        if first_image and first_image.image:
            return format_html('<img src="{}" width="50" height="50" />', first_image.image.url)
        return "No Image"

    thumbnail.short_description = 'Thumbnail'


@admin.register(NewUser)
class NewUserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'user', 'contact', 'registered_at')


@admin.register(UserLoginActivity)
class UserLoginActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'ip_address', 'timestamp', 'action')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'property', 'location', 'check_in', 'check_out', 'adults', 'children', 'rooms')
    list_filter = ('check_in', 'check_out')
    search_fields = ('check_in', 'check_out')



# ✅ Inline images in the Property panel
class ExclusiveImageInline(admin.TabularInline):
    model = ExclusiveImage
    extra = 1  # Allows adding extra images


@admin.register(addexclusive)
class addexclusive(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'mobile', 'location',
                    'property_type', 'rooms', 'beds', 'bath', 'price', 'created_at')
    list_filter = ('property_type', 'location', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'mobile', 'location')
    inlines = [ExclusiveImageInline]
    #name = models.CharField(max_length=255)


#from django.db import models

# class AddExclusive(models.Model):
#     

class ExclusiveImageAdmin(admin.ModelAdmin):
    #property = models.ForeignKey(AddExclusive, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="uploads/")
admin.site.register(ExclusiveImage, ExclusiveImageAdmin)
