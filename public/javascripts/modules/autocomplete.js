function autocomplete(input, latInput, longInput) {
// lat/long order here because Google does it this way unlike Mongo that does it reverse
// console.log(input, latInput, longInput);
if(!input) return; // skips if no function input on page
const dropdown = new google.maps.places.Autocomplete(input);

	dropdown.addListener('place_changed', () => {
		const place = dropdown.getPlace();
		// console.log(place);
		latInput.value = place.geometry.location.lat();
		longInput.value = place.geometry.location.long();
	});
	// if someone hits enter do not submit form
	// below is actually input.addEventListener(type:DOMString, callback: EventListener, capture?: boolean)('')
		// ^ because of bling.js
	input.on('keydown', (e) => {
		if(e.keyCode === 13) e.preventDefault(); // that will stop submission of form
	});
}

// ES6-- we do not have es6 on node, but webpack does have the ability to compile
export default autocomplete;