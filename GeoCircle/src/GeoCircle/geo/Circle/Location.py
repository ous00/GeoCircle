'''
Created on 2011-8-26

@author: qifei
'''

class Location(object):
    '''
    classdocs
    '''


    def __init__(self, latitude, longitude):
        '''
        Constructor
        '''
        self.latitude = latitude
        self.longitude = latitude
    
    def getKey(self):
        '''
        return the location hashcode
        '''
        return 1