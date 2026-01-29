// Handle survey banner close functionality
document.addEventListener('DOMContentLoaded', () => {
	const banner = document.querySelector('.survey-banner');
	const closeButton = document.querySelector('.survey-banner__close');
	
	if (!banner || !closeButton) return;
	
	// Check if user has already closed the banner
	const bannerClosed = localStorage.getItem('surveyBannerClosed');
	if (bannerClosed === 'true') {
		banner.classList.add('hidden');
	}
	
	// Handle close button click
	closeButton.addEventListener('click', () => {
		banner.classList.add('hidden');
		localStorage.setItem('surveyBannerClosed', 'true');
	});
});
