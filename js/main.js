/**
 * Tenpo - Main JavaScript File
 * @purpose: Handle dynamic content loading, form validation, animations, and user interactions
 * @author: Tenpo Development Team
 */

// Global variables
let contentData = null;
let isLoading = false;

// Initialize dataLayer for GTM
window.dataLayer = window.dataLayer || [];

/**
 * @purpose: Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

/**
 * @purpose: Main initialization function
 */
async function initializeApp() {
	try {
		// Load content data
		await loadContentData();
		// Initialize all components
		initializeNavigation();
		setupAnimations();
		initializeHero();
		initializeBrand();
		initializeLifestyle();
		initializeBenefits();
		initializeContact();
		initializeFooter();
		initializeMobileMenu();

		console.log('Tenpo Web app initialized successfully');
	} catch (error) {
		console.error('Error initializing app:', error);
	}
}

/**
 * @purpose: Load content data from JSON file
 */
async function loadContentData() {
	try {
		const response = await fetch('data/content.json');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		contentData = await response.json();

		console.log('LLEGA LA DATA', contentData);
	} catch (error) {
		console.error('Error loading content data:', error);
		// Fallback to default content if JSON fails to load
		contentData = getDefaultContent();
	}
}

/**
 * @purpose: Initialize navigation functionality
 */
function initializeNavigation() {
	if (!contentData?.navigation) return;

	const { navigation } = contentData;

	// Update logo text
	const logoElements = document.querySelectorAll('#nav-logo-text');
	logoElements.forEach((el) => (el.textContent = navigation.logo_text));

	// Create menu items
	const desktopMenu = document.getElementById('nav-menu');
	const mobileMenu = document.getElementById('mobile-nav-menu');

	navigation.menu_items.forEach((item) => {
		// Desktop menu item
		const desktopLi = document.createElement('li');
		desktopLi.innerHTML = `<a href="${item.href}" class="text-tenpo-suave hover:text-tenpo transition-colors">${item.text}</a>`;
		desktopMenu.appendChild(desktopLi);

		// Mobile menu item
		const mobileLi = document.createElement('li');
		mobileLi.innerHTML = `<a href="${item.href}" class="block text-gray-800 hover:text-tenpo transition-colors font-medium">${item.text}</a>`;
		mobileMenu.appendChild(mobileLi);
	});

	// Update CTA buttons
	const ctaButtons = document.querySelectorAll(
		'#nav-cta-btn, #mobile-nav-cta-btn'
	);
	ctaButtons.forEach((btn) => {
		btn.textContent = navigation.cta_button_text;
		btn.addEventListener('click', () => scrollToSection('contact'));
	});

	// Initialize sticky header
	initializeStickyHeader();
}

/**
 * @purpose: Initialize sticky header behavior
 */
function initializeStickyHeader() {
	const header = document.getElementById('main-header');
	const navMenu = document.getElementById('nav-menu');
	const logoImg = document.getElementById('nav-logo-img');

	const { brand } = contentData;

	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			header.classList.add('py-1', 'backdrop-glass', 'shadow-lg');
			header.classList.remove('py-4', 'bg-transparent');
			navMenu.classList.add('text-darker');
			logoImg.src = brand.logo_black_url;
			logoImg.style.transform = 'scale(0.6)';
			logoImg.style.transition = 'transform 0.3s ease';
		} else {
			header.classList.remove('py-1', 'backdrop-glass', 'shadow-lg');
			header.classList.add('py-4', 'bg-transparent');
			navMenu.classList.remove('text-darker');
			logoImg.src = brand.logo_url;
			logoImg.style.transform = 'scale(1)';
			logoImg.style.transition = 'transform 0.3s ease';
		}
	});
}

/**
 * @purpose: Initialize mobile menu functionality
 */
function initializeMobileMenu() {
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');

	mobileMenuBtn.addEventListener('click', () => {
		mobileMenu.classList.toggle('hidden');
	});

	// Close mobile menu when clicking on links
	const mobileLinks = mobileMenu.querySelectorAll('a');
	mobileLinks.forEach((link) => {
		link.addEventListener('click', () => {
			mobileMenu.classList.add('hidden');
		});
	});
}

/**
 * @purpose: Initialize hero section
 */
function initializeHero() {
	if (!contentData?.hero) return;

	const { hero } = contentData;

	// Update hero content
	const headline = hero.headline;
	const highlighted = headline.replace(
		'Tenpo',
		'<span class="text-tenpo-suave">Tenpo</span>'
	);

	document.getElementById('hero-headline').innerHTML = highlighted;
	document.getElementById('hero-subheadline').textContent = hero.subheadline;

	const heroCtaBtn = document.getElementById('hero-cta-btn');
	heroCtaBtn.textContent = hero.cta_button_text;
	heroCtaBtn.addEventListener('click', () => scrollToSection('contact'));

	// Initialize video background
	const video = document.getElementById('hero-video');
	if (video) {
		video.addEventListener('loadeddata', () => {
			video.play().catch((e) => console.log('Video autoplay failed:', e));
		});
	}
}

/**
 * @purpose: Initialize Brand Logo
 */
function initializeBrand() {
	if (!contentData?.brand) return;

	const { brand } = contentData;

	// Update logo image
	const logoImg = document.getElementById('nav-logo-img');
	logoImg.src = brand.logo_url;
	logoImg.alt = brand.logo_alt;
}

/**
 * @purpose: Initialize lifestyle section
 */
function initializeLifestyle() {
	if (!contentData?.lifestyle) return;

	const { lifestyle } = contentData;

	document.getElementById('lifestyle-title').textContent = lifestyle.title;
	document.getElementById('lifestyle-subtitle').textContent =
		lifestyle.subtitle;
	document.getElementById('lifestyle-description').textContent =
		lifestyle.description;
}

/**
 * @purpose: Initialize benefits section
 */
function initializeBenefits() {
	if (!contentData?.benefits_section) return;

	const { benefits_section } = contentData;

	// Update section titles
	document.getElementById('benefits-title').textContent =
		benefits_section.title;
	document.getElementById('benefits-subtitle').textContent =
		benefits_section.subtitle;
}

/**
 * @purpose: Setup all GSAP animations and ScrollTrigger effects
 * @config: Defines various animations for different sections and elements
 */
function setupAnimations() {
	// Parallax effects
	setupParallaxEffects();
	// Fade in animations for sections
	setupFadeInAnimations();
	// Hero section animations
	setupHeroAnimations();
	// Antropos for benefits animations
	setupAtroposEffects();
	// other animation
	// animateLifestylePhone();
	// Animate phone scroll effect
	animateLifestylePhoneScroll();
}

function setupAtroposEffects() {
	const commonConfig = {
		activeOffset: 50, // Cuánto se "levanta" la card al pasar el mouse
		shadow: true, // Habilitar la sombra
		shadowScale: 1.1, // Hacer la sombra un 10% más grande para más profundidad
		rotateXMax: 25, // Máxima rotación en el eje X (vertical)
		rotateYMax: 25, // Máxima rotación en el eje Y (horizontal)
		duration: 400, // Duración de la animación de entrada/salida en ms
		// Descomenta la siguiente línea para un efecto de "entrar" más lento
		// enterAngle: 90,
	};

	// Inicializar Card 1 y 3 con la configuración común
	// Se busca el elemento por su ID y si existe, se inicializa Atropos.
	const card1 = document.querySelector('#card-1');
	if (card1) {
		Atropos({
			el: card1,
			...commonConfig, // Aplica la configuración común
		});
	}

	const card3 = document.querySelector('#card-3');
	if (card3) {
		Atropos({
			el: card3,
			...commonConfig, // Aplica la configuración común
		});
	}

	// Inicializar Card 2 con configuración común + efecto de brillo
	const card2 = document.querySelector('#card-2');
	if (card2) {
		Atropos({
			el: card2,
			...commonConfig, // Usa la configuración base
			highlight: true, // Y AÑADE el efecto de brillo que sigue al mouse
			highlightScale: 1.2,
		});
	}
}

function setupHeroAnimations() {
	// Hero content fade out on scroll
	gsap.to('#hero .relative.z-10', {
		opacity: 0,
		y: -50,
		scrollTrigger: {
			trigger: '#hero',
			start: 'top top',
			end: '50% top',
			scrub: 1,
		},
	});

	// Hero content moves to the right on scroll, returns to center when scrolling up
	gsap.to('#hero .relative.z-10', {
		x: 200, // Move 200px to the right
		ease: 'power2.out',
		scrollTrigger: {
			trigger: '#hero',
			start: 'top top',
			end: '50% top',
			scrub: true,
		},
	});
}

function setupParallaxEffects() {
	gsap.utils.toArray('.parallax-element').forEach((element) => {
		gsap.to(element, {
			y: -200,
			scale: 1.2, // Añade un efecto de escala para más dramatismo
			scrollTrigger: {
				trigger: element,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 0.5,
			},
		});
	});
}

function setupFadeInAnimations() {
	gsap.utils.toArray('.fade-in-up').forEach((element) => {
		gsap.fromTo(
			element,
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 80%',
					toggleActions: 'play none none reverse',
				},
			}
		);
	});
}

function animateLifestylePhone() {
	const phone = document.getElementById('lifestyle-phone');
	if (
		!phone ||
		typeof gsap === 'undefined' ||
		typeof ScrollTrigger === 'undefined'
	)
		return;

	gsap.fromTo(
		phone,
		{ opacity: 0, scale: 0.9, y: 60 },
		{
			opacity: 1,
			scale: 1,
			y: 0,
			duration: 1.2,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: phone,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
			},
		}
	);
}

function animateLifestylePhoneScroll() {
	const phoneContainer = document.querySelector('.phone-container');
	const phoneImage = document.getElementById('lifestyle-phone');

	if (
		!phoneContainer ||
		!phoneImage ||
		typeof gsap === 'undefined' ||
		typeof ScrollTrigger === 'undefined'
	) {
		console.log('Missing elements or libraries for phone animation');
		return;
	}

	// Asegura perspectiva y transform-style
	phoneContainer.style.perspective = '1000px';
	phoneImage.style.transformStyle = 'preserve-3d';
	phoneImage.style.willChange = 'transform';

	gsap.registerPlugin(ScrollTrigger);

	gsap.timeline({
		scrollTrigger: {
			trigger: phoneContainer,
			start: 'top center',
			end: 'bottom center',
			scrub: 1,
			// markers: true, // Activado para depuración
			// onEnter: () => console.log('Phone animation triggered'),
		},
	}).to(phoneImage, {
		rotationY: -45,
		rotationX: 35,
		z: 100,
		ease: 'power1.inOut',
	});

	console.log('Phone scroll animation initialized');
}

/**
 * @purpose: Initialize contact section and form
 */
function initializeContact() {
	if (!contentData?.contact) return;

	const { contact } = contentData;

	// Update contact content
	document.getElementById('contact-title').textContent = contact.title;
	document.getElementById('contact-subtitle').textContent = contact.subtitle;
	document.getElementById('success-message').textContent =
		contact.success_message;
	document.getElementById('error-message').textContent =
		contact.error_message;

	// Update form placeholders
	document.getElementById('name').placeholder =
		contact.form_fields.name_placeholder;
	document.getElementById('email').placeholder =
		contact.form_fields.email_placeholder;
	document.getElementById('phone').placeholder =
		contact.form_fields.phone_placeholder;

	// Update submit button text
	document.getElementById('submit-text').textContent =
		contact.submit_button_text;

	// Initialize form validation and submission
	initializeContactForm();
}

/**
 * @purpose: Initialize contact form functionality
 */
function initializeContactForm() {
	const form = document.getElementById('contact-form');
	const submitBtn = document.getElementById('submit-btn');
	const submitText = document.getElementById('submit-text');
	const loadingText = document.getElementById('loading-text');

	// Real-time validation
	const inputs = form.querySelectorAll('input[required]');
	inputs.forEach((input) => {
		input.addEventListener('blur', () => validateField(input));
		input.addEventListener('input', () => clearFieldError(input));
	});

	// Form submission
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		if (isLoading) return;

		// Validate all fields
		let isValid = true;
		inputs.forEach((input) => {
			if (!validateField(input)) {
				isValid = false;
			}
		});

		if (!isValid) return;

		// Show loading state
		isLoading = true;
		submitBtn.disabled = true;
		submitText.classList.add('hidden');
		loadingText.classList.remove('hidden');

		try {
			// Simulate form submission (replace with actual endpoint)
			await submitForm(new FormData(form));
			showFormSuccess();
			form.reset();

			// Track successful submission
			window.dataLayer.push({
				event: 'form_submission_success',
				form_name: 'contact',
			});
		} catch (error) {
			console.error('Form submission error:', error);
			showFormError();
		} finally {
			// Reset loading state
			isLoading = false;
			submitBtn.disabled = false;
			submitText.classList.remove('hidden');
			loadingText.classList.add('hidden');
		}
	});
}

/**
 * @purpose: Validate individual form field
 * @params: field (HTMLElement)
 */
function validateField(field) {
	const value = field.value.trim();
	const fieldName = field.name;
	const errorElement = document.getElementById(`${fieldName}-error`);

	let isValid = true;
	let errorMessage = '';

	// Required field validation
	if (field.required && !value) {
		isValid = false;
		errorMessage = 'Este campo es obligatorio';
	}

	// Email validation
	if (fieldName === 'email' && value) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			isValid = false;
			errorMessage = 'Por favor, ingresa un email válido';
		}
	}

	// Phone validation
	if (fieldName === 'phone' && value) {
		const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
		if (!phoneRegex.test(value)) {
			isValid = false;
			errorMessage = 'Por favor, ingresa un teléfono válido';
		}
	}

	// Update field appearance and error message
	if (isValid) {
		field.classList.remove('border-red-500');
		field.classList.add('border-green-500');
		errorElement.classList.add('hidden');
	} else {
		field.classList.remove('border-green-500');
		field.classList.add('border-red-500');
		errorElement.textContent = errorMessage;
		errorElement.classList.remove('hidden');
	}

	return isValid;
}

/**
 * @purpose: Clear field error state
 * @params: field (HTMLElement)
 */
function clearFieldError(field) {
	const errorElement = document.getElementById(`${field.name}-error`);
	field.classList.remove('border-red-500');
	errorElement.classList.add('hidden');
}

/**
 * @purpose: Submit form data (placeholder for actual implementation)
 * @params: formData (FormData)
 */
async function submitForm(formData) {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// For demo purposes, we'll just log the data
	// In production, replace this with actual form submission service
	console.log('Form data:', Object.fromEntries(formData));

	// Uncomment and configure for actual form submission:
	/*
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
    
    return response.json();
    */
}

/**
 * @purpose: Show form success message
 */
function showFormSuccess() {
	document.getElementById('form-success').classList.remove('hidden');
	document.getElementById('form-error').classList.add('hidden');

	// Hide success message after 5 seconds
	setTimeout(() => {
		document.getElementById('form-success').classList.add('hidden');
	}, 5000);
}

/**
 * @purpose: Show form error message
 */
function showFormError() {
	document.getElementById('form-error').classList.remove('hidden');
	document.getElementById('form-success').classList.add('hidden');

	// Hide error message after 5 seconds
	setTimeout(() => {
		document.getElementById('form-error').classList.add('hidden');
	}, 5000);
}

/**
 * @purpose: Initialize footer content
 */
function initializeFooter() {
	if (!contentData?.footer) return;

	const { footer } = contentData;

	// Update footer content
	document.getElementById('footer-address').textContent = footer.address;
	document.getElementById('footer-phone').textContent = footer.phone;
	document.getElementById('footer-email').textContent = footer.email;
	document.getElementById('footer-legal').textContent = footer.legal_text;

	// Create social media links
	const socialLinksContainer = document.getElementById('social-links');
	socialLinksContainer.innerHTML = '';

	Object.entries(footer.social_links).forEach(([platform, url]) => {
		const link = document.createElement('a');
		link.href = url;
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		link.className = 'text-gray-300 hover:text-tenpo transition-colors';
		link.innerHTML = getSocialIcon(platform);
		socialLinksContainer.appendChild(link);
	});
}

/**
 * @purpose: Get social media icon SVG
 * @params: platform (string)
 */
function getSocialIcon(platform) {
	const icons = {
		facebook: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
		instagram: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 22 22">
  		<rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" fill="none"/>
		<circle cx="12" cy="12" r="4" stroke="currentColor" fill="none"/>
		<circle cx="17" cy="7" r="1.2" fill="currentColor"/>
		</svg>`,
		youtube: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
	};

	return icons[platform] || '';
}

/**
 * @purpose: Scroll to specific section
 * @params: sectionId (string)
 */
function scrollToSection(sectionId) {
	const section = document.getElementById(sectionId);
	if (section) {
		const headerHeight =
			document.getElementById('main-header').offsetHeight;
		const targetPosition = section.offsetTop - headerHeight - 20;

		// Usa scroll nativo simple para evitar conflictos
		window.scrollTo({
			top: targetPosition,
			behavior: 'smooth',
		});
	}
}

/**
 * @purpose: Get default content if JSON loading fails
 */
function getDefaultContent() {
	return {
		seo: {
			title: 'Tenpo - Cuenta Digital Chile | Finanzas Digitales',
			description:
				'Tenpo es tu cuenta digital en Chile. Servicios financieros 100% digitales con transparencia, confianza e innovación. ¡Únete a la financracia para todos!',
			og_image_url: 'assets/images/hero1.png',
		},
		hero: {
			headline: 'Hay Tenpo para Todos',
			subheadline:
				'Revoluciona tu experiencia financiera con una cuenta 100% digital, sin letra chica, sin fronteras y con el respaldo de la tecnología más segura del país.',
			cta_button_text: 'Tu cuenta en un instante',
		},
		navigation: {
			logo_text: 'Teno',
			menu_items: [
				{ text: 'Beneficios', href: '#benefits' },
				{ text: 'Lifestyle', href: '#lifestyle' },
				{ text: 'Contacto', href: '#contact' },
			],
			cta_button_text: 'Tu cuenta en un instante',
		},
	};
}

// Export functions for global access
window.scrollToSection = scrollToSection;
