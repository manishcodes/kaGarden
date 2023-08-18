import * as L from 'leaflet';
import myMapPoints from '/data/points.js'

export default class Experience {
    constructor() {

        // Set url parameters
        this.myKeyValues = window.location.search
        this.urlParams = new URLSearchParams(this.myKeyValues)
        this.param1 = this.urlParams.get('p1')
        this.param2 = this.urlParams.get('p2')

        // Creating map options
        var mapOptions = {
            center:[this.param1,this.param2],
            zoom: 22,
            attributionControl: false // remove the leaflet attribution
        }

        // Creating a map object
        this.map = new L.map('map', mapOptions);

        this.renderLayers()
        this.renderPoints()
    }

    renderLayers() {
        // Creating a Layer object
        // var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        var layerKarnatakaGarden = new L.imageOverlay('/gardenMap.webp', [[11.402839908787264, 76.6852570126544],
        [11.395477956926253, 76.68092250666123]], { opacity: 1 }).addTo(this.map);
        var layer = new L.TileLayer('', { maxZoom: 22, minZoom: 17 });
        this.map.addLayer(layer);
        this.map.addLayer(layerKarnatakaGarden)

        // Define the maximum bounds for your map
        var southWest = L.latLng(11.402839908787264, 76.6852570126544); // Southwest coordinates (e.g., KGH)
        var northEast = L.latLng(11.395477956926253, 76.68092250666123); // Northeast coordinates (e.g., KGH)
        var maxBounds = L.latLngBounds(southWest, northEast);

        this.map.setMaxBounds(maxBounds)

    }

    renderPoints() {
        //define icons
        let buildingIcon = L.icon({
            iconUrl: 'icons/building.webp',
            iconSize: [60, 60],
            iconAnchor: [27, 60],
            popupAnchor: [-3, -76],
        });

        const hotspotMarkers = []
        const amenityMarkers = []
        const buildingMarkers = []
        // Loop through the features in the GeoJSON data and create markers for each feature
        myMapPoints.features.forEach(feature => {
            const lat = feature.geometry.coordinates[1];
            const lng = feature.geometry.coordinates[0];
            const name = feature.properties.Name;
            const description = feature.properties.description;
            const type = feature.properties.type;
            const imgSrc = feature.properties.imgsrc;

            // Create a Leaflet marker for the current feature
            const marker = L.marker([lat, lng]).addTo(this.map);

            // Customize the marker icon based on the feature type
            if (type === 'hotspot') {
                // Use a custom icon for hotspots
                marker.setIcon(L.icon({
                    iconUrl: 'icons/hotspot.webp', // Use the provided imgsrc property as the icon URL
                    iconSize: [32, 32], // Adjust the icon size as needed
                }));
                hotspotMarkers.push(marker)

            } else if (type === 'amenity') {
                // Use a different custom icon for amenities, or use the default icon
                marker.setIcon(L.icon({
                    iconUrl: 'icons/amenity.webp',
                    iconSize: [32, 32],
                }));
                amenityMarkers.push(marker)

            } else if (type === 'building') {
                // Use a different custom icon for amenities, or use the default icon
                marker.setIcon(L.icon({
                    iconUrl: 'icons/building.webp',
                    iconSize: [32, 32],
                }));
                buildingMarkers.push(marker)
            }

            // Add a popup to the marker to display additional information
            // marker.bindPopup(`<b>${name}</b><br>${description}`);
            // Add a click event listener to the marker
            marker.on('click', () => {
                this.openProductCard(name,imgSrc,description);
            });

        });

        var markerCtrl = {
            'Hotspots' : L.layerGroup(hotspotMarkers),
            'amenity' : L.layerGroup(amenityMarkers),
            'Building': L.layerGroup(buildingMarkers)
        };
        L.control.layers(null,markerCtrl,{position:'bottomright'}).addTo(this.map)
    }

    openProductCard(title,imageSrc,description) {
        const productTitle = document.getElementById('product-title')
        const productImage = document.getElementById('product-image')
        const productDescription = document.getElementById('product-description')

        productImage.src = imageSrc
        productTitle.textContent = title
        productDescription.textContent = description

        document.getElementById("product-card").style.display = "block";

    }

}
