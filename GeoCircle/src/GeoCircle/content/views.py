# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from GeoCircle.content.models import Content
from djangotoolbox.fields import BlobField

def addContent(request):
    title = request.POST.get('title', '')
#    message = request.GET.get('message','')    
    if not len(title) == 0: 
        blob = BlobField(request.POST.get('messesage', ''))
        content = Content.objects.create(description=title, author_id=1, store=blob)
        content.save()
        
        return HttpResponse(u'you sumbited %s' % title )
    else:
        return render_to_response('form.html')