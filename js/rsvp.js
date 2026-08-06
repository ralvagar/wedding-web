document.addEventListener('DOMContentLoaded', () => {
    // 1. Find the elements on the page
    const ticketsElement = document.getElementById('guest-tickets');
    const rsvpLink = document.getElementById('whatsapp-rsvp-link');

    // Make sure both elements exist before running the code
    if (ticketsElement && rsvpLink) {
        
        // 2. Extract the number from the HTML and convert it to an integer (math number)
        const numberOfPasses = parseInt(ticketsElement.innerText.trim(), 10);

        // 3. Set your phone number (Numbers only, no + or spaces)
        const phoneNumber = "528121217986"; 
        
        let customMessage = "";

        // 4. Check how many passes there are to pick the right grammar
        if (numberOfPasses === 1) {
            // Singular message
            customMessage = `¡Hola! Confirmo mi asistencia a la boda de Zafiro y Ricardo. Tengo 1 pase y mi nombre es:`;
        } else {
            // Plural message (2 or more)
            customMessage = `¡Hola! Confirmo mi asistencia a la boda de Zafiro y Ricardo. Tenemos ${numberOfPasses} pases y nuestros nombres son:`;
        }

        // 5. Safely encode the message for the web and attach it to the button
        const encodedMessage = encodeURIComponent(customMessage);
        rsvpLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
});