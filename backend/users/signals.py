from django.db.models.signals import post_save
from django.dispatch import receiver

from allauth.socialaccount.models import SocialAccount


@receiver(post_save, sender=SocialAccount)
def add_extra_data_to_user(sender, instance, *args, **kwargs):
    instance.user.avatar = instance.extra_data['picture']
    instance.user.save()
