'''
Created on 2011-8-27

@author: qifei
'''
from django.db import models
from djangotoolbox.fields import BlobField
#from datetime import datetime


class Content(models.Model):
    '''
    classdocs
    '''
    description = models.CharField(max_length=200)
    type        = models.IntegerField(default=0)
    created_on  = models.DateTimeField(auto_now_add=True)
    author_id   = models.IntegerField()
    store       = BlobField()    

   
    
    @staticmethod
    def hander(type):
        __hander_map__ = {
                      Content.Type.TEXT: Content.asString(), 
                      Content.Type.XML : Content.asXML,
                      }
        return Content.__hander_map__[type]

#    def __init__(self, description, author_id):
#        '''
#        Constructor
#        '''
#        self.description = description
#        self.author_id   = author_id
#        self.created_on  = datetime.now()

    
    def asBinary(self):
        return None
    
    def asXML(self):
        return None
    
    def asHTML(self):
        return None
    
    def asString(self):
        return None
    
    class Type:
        TEXT    = 0
        XML     = 1
        VIDEO   = 2
        AUDIO   = 3
       
            

if __name__ == '__main__':
    Content.objects.create(description='test', author_id=1, store="haha")
