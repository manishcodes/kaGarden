import './style.css'
// import * as L from 'leaflet'
import Experience from './scripts/MyLeafletExperience'

// After all resources are loaded, hide the loading screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.display = 'none';
});

const exp = new Experience()
// exp.renderLayers()
// exp.renderPoints()

// JavaScript to handle the close button
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("product-card").style.display = "none";
  });

// Close the product card when the user clicks outside the card
// document.addEventListener('click', event => {
//     const productCard = document.getElementById('product-card');
//     if (!productCard.contains(event.target)) {
//         document.getElementById("product-card").style.display = "none";
//     }
//   });