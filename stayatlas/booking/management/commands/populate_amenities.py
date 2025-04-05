from django.core.management.base import BaseCommand
from booking.models import Amenity

class Command(BaseCommand):
    help = "Populate amenities with FontAwesome icons"

    def handle(self, *args, **kwargs):
        amenities_list = [
            {"name": "Wi-Fi", "icon": "fas fa-wifi"},
            {"name": "Swimming Pool", "icon": "fas fa-swimming-pool"},
            {"name": "Parking", "icon": "fas fa-parking"},
            {"name": "Air Conditioning", "icon": "fas fa-snowflake"},
            {"name": "Television", "icon": "fas fa-tv"},
            {"name": "Gym", "icon": "fas fa-dumbbell"},
            {"name": "Elevator", "icon": "fas fa-elevator"},
            {"name": "Breakfast Included", "icon": "fas fa-utensils"},
            {"name": "Pet Friendly", "icon": "fas fa-paw"},
            {"name": "Balcony", "icon": "fas fa-home"},
            {"name": "Garden", "icon": "fas fa-seedling"},
            {"name": "Beach Access", "icon": "fas fa-umbrella-beach"},
            {"name": "Hot Tub", "icon": "fas fa-hot-tub"},
            {"name": "Sauna", "icon": "fas fa-fire"},
            {"name": "Washer & Dryer", "icon": "fas fa-tshirt"},
            {"name": "Fireplace", "icon": "fas fa-fire-alt"},
            {"name": "BBQ Grill", "icon": "fas fa-fire"},
            {"name": "24/7 Security", "icon": "fas fa-shield-alt"},
            {"name": "Children’s Play Area", "icon": "fas fa-child"},
            {"name": "Work Desk", "icon": "fas fa-laptop"},
            {"name": "Kitchen", "icon": "fas fa-blender"},
            {"name": "Conference Room", "icon": "fas fa-users"},
            {"name": "Smart Home Features", "icon": "fas fa-home"},
            {"name": "Bicycle Rental", "icon": "fas fa-bicycle"},
            {"name": "Tennis Court", "icon": "fas fa-table-tennis"},
            {"name": "Power Backup", "icon": "fas fa-bolt"},
            {"name": "Yoga & Meditation Area", "icon": "fas fa-spa"},
            {"name": "Library", "icon": "fas fa-book"},
            {"name": "Home Theatre", "icon": "fas fa-film"},
            {"name": "CCTV Surveillance", "icon": "fas fa-video"},
            {"name": "Helipad", "icon": "fas fa-helicopter"},
            {"name": "Temple/Pooja Room", "icon": "fas fa-pray"},
            {"name": "Bonfire Area", "icon": "fas fa-fire"},
            {"name": "Open Terrace", "icon": "fas fa-cloud"},
            {"name": "Driver's Accommodation", "icon": "fas fa-user"},
            {"name": "Luxury Car Parking", "icon": "fas fa-car"},
            {"name": "Doctor On Call", "icon": "fas fa-user-md"}
        ]
        for amenity in amenities_list:
            # Use get_or_create to avoid duplicates
            amenity_obj, created = Amenity.objects.get_or_create(
                name=amenity["name"],
                defaults={"icon": amenity["icon"]}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created amenity: {amenity['name']}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Amenity already exists: {amenity['name']}"))

        self.stdout.write(self.style.SUCCESS("✅ Amenities have been successfully populated!"))