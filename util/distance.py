import googlemaps as gmaps
from haversine import haversine
from datetime import datetime


class DistanceFinder:
    def __init__(self, key):
        self.client = gmaps.Client(key=key)

    def distance_from(self, origin, destinations,
                      max_distance=5):
        ret = [None for destination in destinations]
        possible_destinations = [(i, dest) for (i, dest) in
                                enumerate(destinations)
                                if haversine(origin, dest) < max_distance]
        destinations = [pd[1] for pd in possible_destinations]
        result = self.client.distance_matrix([origin], destinations,
                                             departure_time=datetime.now())
        for i, element in enumerate(result['rows'][0]['elements']):
            idx = possible_destinations[i][0]
            ret[idx] = {'distance': element['distance']['value'],
                        'duration': element['duration_in_traffic']['value']}

        return ret
