# -*- coding: UTF-8 -*-
from datetime import datetime

class Circle:
    __name__ = None
    __members__ = []
    __created_time = datetime.now()
    __contents__ = []
    
    def __init__(self, name):
        self.__name__ = name
    
    def __unicode__(self):
        return self.__name__
    
    def postContent(self, content):
        self.__contents__.append(content)
    
    def getContents(self):
        return self.__contents__
    
    def addUser(self, user):
        if not user in self.__members__:
            self.__members__.append(user)
    
class GeoCircle(Circle):
    __center__ = None
    __diameter__ = 500 #meters
    
    def __init__(self, name, location, diameter):
        Circle.__init__(self, name);
        __center__ = location
        __diameter__ = diameter


    
if __name__ == '__main__':
    circle = GeoCircle( u"test circle", 10, 200)   
    print unicode(circle)
    