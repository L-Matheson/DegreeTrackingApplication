# Generated by Django 5.1.6 on 2025-04-22 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_student_firstname_student_lastname_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='majorreq',
            name='CoreRequirement',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='majorreq',
            name='credits',
            field=models.TextField(default='0'),
        ),
        migrations.AlterField(
            model_name='majorreq',
            name='co_requisite',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='majorreq',
            name='course_offered',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='majorreq',
            name='course_type',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='majorreq',
            name='prerequisite',
            field=models.CharField(max_length=200),
        ),
    ]
