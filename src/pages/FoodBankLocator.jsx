import React, { useEffect, useRef, useState } from 'react';
import { Box, Input, Button, Heading } from '@chakra-ui/react';

export default function FoodBankLocator() {
    const mapRef = useRef(null); // Reference to the map container
    const [postalCode, setPostalCode] = useState('');
    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);

    useEffect(() => {
        // Load the Google Maps script
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPRSjZyS8xaBZ8O4V3qQjLlJLjUqETQpA&libraries=places&callback=initMap`;
            script.async = true;
            document.head.appendChild(script);
        };

        // Initialize the map and geocoder
        window.initMap = () => {
            const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco, CA)
            const mapInstance = new google.maps.Map(mapRef.current, {
                zoom: 12,
                center: defaultLocation,
                mapId: 'FoodBankMap',
            });

            setMap(mapInstance);
            setGeocoder(new google.maps.Geocoder());

            findFoodBanks(defaultLocation, 'San Francisco');
        };

        loadGoogleMapsScript();
    }, []);

    const findFoodBanks = async (location, name) => {
        if (!map) return;

        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places');
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

        const request = {
            textQuery: 'food bank',
            fields: ['displayName', 'location', 'businessStatus'],
            locationBias: location,
            language: 'en-US',
            maxResultCount: 5,
            region: 'us',
            useStrictTypeFiltering: false,
        };

        const { places } = await Place.searchByText(request);

        if (places.length) {
            const { LatLngBounds } = await google.maps.importLibrary('core');
            const bounds = new LatLngBounds();

            places.forEach((place) => {
                const markerView = new AdvancedMarkerElement({
                    map,
                    position: place.location,
                    title: place.displayName,
                    gmpClickable: true,
                });



                bounds.extend(place.location);
            });

            map.fitBounds(bounds);
        } else {
            alert('No results found.');
        }
    };

    const handleSearch = () => {
        if (!postalCode || !geocoder) {
            alert('Please enter a postal code!');
            return;
        }

        geocoder.geocode({ address: postalCode }, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                findFoodBanks(location, results[0].formatted_address);
            } else {
                alert(`Geocoding failed: ${status}`);
            }
        });
    };

    return (
        <Box>
            <Heading as="h1" size="lg" textAlign="center" mb={4}>
                Search for Food Banks Nearby
            </Heading>
            <Box textAlign="center" mb={4}>
                <Input
                    placeholder="Enter a city or postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    width="300px"
                    mr={2}
                />
                <Button colorScheme="blue" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
            <Box
                id="map"
                ref={mapRef}
                height="80vh"
                width="100%"
                border="1px solid #ccc"
                borderRadius="md"
            ></Box>
        </Box>
    );
}
