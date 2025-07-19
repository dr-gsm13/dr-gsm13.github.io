document.addEventListener('DOMContentLoaded', function() {
// Menu mobile
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
const isExpanded = mobileMenu.classList.toggle('active');
menuBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
menuBtn.setAttribute('aria-expanded', isExpanded);
});

// Animation des éléments
const animateOnScroll = () => {
const steps = document.querySelectorAll('.step');
const reviews = document.querySelectorAll('.review');

steps.forEach((step, index) => {
const stepPosition = step.getBoundingClientRect().top;
const screenPosition = window.innerHeight / 1.3;

if(stepPosition < screenPosition) {
setTimeout(() => {
step.classList.add('active');
}, index * 200);
}
});

reviews.forEach((review, index) => {
const reviewPosition = review.getBoundingClientRect().top;
const screenPosition = window.innerHeight / 1.3;

if(reviewPosition < screenPosition) {
setTimeout(() => {
review.classList.add('active');
}, index * 200);
}
});
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Gestion de l'upload de fichier
const fileUpload = document.getElementById('file-upload');
const fileUploadArea = document.querySelector('.file-upload');

if(fileUpload && fileUploadArea) {
fileUpload.addEventListener('change', function(e) {
if(e.target.files.length > 0) {
const file = e.target.files[0];
if(file.size > 5 * 1024 * 1024) {
alert("Fichier trop volumineux (max 5MB)");
return;
}
fileUploadArea.innerHTML = `
<i class="fas fa-check-circle" style="color:#4CAF50;"></i>
<p>Photo ajoutée</p>
<small>${file.name}</small>
`;
}
});
}

// Gestion du formulaire - VERSION CORRIGÉE POUR FORMSPREE
const form = document.getElementById('repair-form');
const loader = document.querySelector('.loader');

if(form) {
form.addEventListener('submit', function(e) {
e.preventDefault();

// Afficher le loader
loader.classList.add('active');

// Créer un FormData object
const formData = new FormData(form);

// Envoyer avec fetch
fetch(form.action, {
method: 'POST',
body: formData,
headers: {
'Accept': 'application/json'
}
})
.then(response => {
if(response.ok) {
// Succès - réinitialiser le formulaire
form.reset();
if(fileUploadArea) {
fileUploadArea.innerHTML = `
<i class="fas fa-camera"></i>
<p>Ajouter une photo du problème</p>
<small>Cliquez pour sélectionner une image (JPG/PNG - max 5MB)</small>
`;
}
alert('Votre demande a bien été envoyée ! Nous vous contacterons rapidement.');
} else {
throw new Error('Erreur réseau');
}
})
.catch(error => {
console.error('Error:', error);
alert('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
})
.finally(() => {
loader.classList.remove('active');
});
});
}
});