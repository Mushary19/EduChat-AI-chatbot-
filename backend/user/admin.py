from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from user.models import User


class UserAdmin(UserAdmin):
    fieldsets = (  # got from inherited UserAdmin Base class
        (
            None,
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "password",
                )
            },
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    model = User
    ordering = ["email"]
    list_display = ("email", "first_name", "last_name", "is_active")
    search_fields = ("email", "first_name", "last_name")


admin.site.register(User, UserAdmin)
