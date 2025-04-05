from django import forms
from .models import Property, Amenity  # ✅ Keep only Property
from .models import Booking
from django.core.validators import MinValueValidator, MaxValueValidator

class PropertyForm(forms.ModelForm):
    # amenities = forms.ModelMultipleChoiceField(
    #     queryset=Amenity.objects.all(),
    #     widget=forms.CheckboxSelectMultiple,
    #     required=False  # ✅ Allow empty selections
    # )

    class Meta:
        model = Property
        fields = ['first_name', 'last_name', 'villa_name', 'email', 'mobile']#, 'amenities']

    
    # def clean_amenities(self):
    #     return self.cleaned_data.get("amenities")  # ✅ Ensure correct data format


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ["location", "check_in", "check_out", "adults", "children", "rooms"]
        widgets = {
            "check_in": forms.DateInput(attrs={"type": "date"}),
            "check_out": forms.DateInput(attrs={"type": "date"}),
        }
