from django import forms
from .models import Property

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ['first_name', 'last_name', 'email', 'mobile']#, 'location', 'property_type', 'rooms', 'description']
