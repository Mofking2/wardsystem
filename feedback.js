document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting
    alert('Thank you for your feedback!');
    // You can send the form data to a server, perform validation, or other actions here.
});