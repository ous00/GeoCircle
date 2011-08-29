from circle import *
from CircleUser import *

class CircleManager(object):
    _circles = {}
    _circles_by_pos = {}        
    _contents_by_id = {}              # content by id
    def __init__(self):
        pass
    
    def newCircle(self, type, name, **parameter):
        if not self._circles.has_key(name):
            if type == 'geo':
                circle =  GeoCircle(name, **parameter)
                # put the new circle in _circle_by_pos dictitonary
                
            else:
                circle =  Circle(name)
                
            self._circles[name] = circle   
        return self._circles[name]
    
    def circleByName(self, name):
        self._circles.get(name, None)
    
    def circleByLocation(self, location):
        '''
        find a circle by location
        '''
        pass
    
    def usrPost(self, usr, content):
        '''
        A user post/share a content. do the following
        * save the content and return a content key
        * create a new circle if there is no such circle
        * Find the circles for the usr based on the location
        * put the content key into those circles 
        '''
        pass
    
    def usrGet(self, usr, since):
        '''
        The client initiate the call peroidically
        * find the circes for this usr
        * get the new contents from each circle SINCE last time
        * 
        '''
        pass
    
if __name__ == '__main__':
    manager = CircleManager();
    
    tom  = CircleUser('tom',  Location(180, 180))
    jack = CircleUser('jack', Location(180, 180))
    
    circle = manager.newCircle('geo', 'beijing', 
                               latitude='180', 
                               longitude='180', 
                               diameter=500)
    manager.usrPost(tom, "hello geo circle")
    
    manager.usrGet(jack, None)
        
        