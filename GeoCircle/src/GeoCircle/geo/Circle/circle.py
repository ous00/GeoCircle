# -*- coding: UTF-8 -*-
from datetime import datetime
from distance import distance
from Location import Location
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
    center = None
    diameter = 500 #meters
    
    def __init__(self, name, location, radius):
        Circle.__init__(self, name);
        self.center = location
        self.radius = radius

    def insideMe(self, location):
        return distance(self.center,location) < self.radius 
if __name__ == '__main__':
    circle = GeoCircle( u"test circle", Location(0, 0), 2000)   
    print circle.insideMe(Location(0.01,0.01))
    print distance(Location(0,0), Location(0.0001, 0.0001))
    print unicode(circle)
    