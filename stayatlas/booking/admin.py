from django.contrib import admin
from .models import Property, PropertyImage
from django.utils.html import format_html

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1  # Allow one extra blank image field

class PropertyAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'location', 'property_type', 'rooms')
    inlines = [PropertyImageInline]

    def thumbnail(self, obj):
        first_image = obj.photos.first()  # Fetch the first image if exists
        if first_image:
            return format_html('<img src="{}" width="50" height="50" />', first_image.image.url)
        return "No Image"

    thumbnail.short_description = 'Thumbnail'

admin.site.register(Property, PropertyAdmin)
#admin.site.register(PropertyImage)