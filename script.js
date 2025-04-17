const stripe = Stripe('pk_live_51Qv4hbRqFcy2zsE30jLCTmjzbs8vaTXhiZxPxDtlMwKIPiCGVFdpnAsLQwZgzjJcDqqYGfcG0DfqdsbSNVMFN2IF00UPe1SBRj'); // Replace with your actual key

async function buyCard(cardName, price) {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: cardName, // Card name
      amount: price * 100, // Amount in cents
    }),
  });

  const session = await response.json();
  const result = await stripe.redirectToCheckout({ sessionId: session.id });

  if (result.error) {
    console.error(result.error.message);
  }
}

// Basic search functionality (can be improved)
document.getElementById('search').addEventListener('keyup', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  // In a real application, you would filter the displayed cards here.
  console.log("Searching for:", searchTerm);
});

const cards = document.querySelectorAll('.card');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

cards.forEach(card => {
  const cardImg = card.querySelector('img'); // Select the image within the card

  cardImg.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = cardImg.src; // Set the modal image source
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//What this JS Function does: When a trade request form is filled out, add a notification to the seller via email
//Example of how you might implement this using Node.js and SendGrid:

// function sendTradeRequestEmail(sellerEmail, cardName, offerDetails) {
//   const msg = {
//     to: sellerEmail,
//     from: 'your_email@example.com',
//     subject: 'New Trade Request for Your Card',
//     text: `You have a new trade request for your ${cardName} card.
//            Offer details: ${offerDetails}`,
//     html: `<strong>You have a new trade request for your ${cardName} card.</strong>
//            <p>Offer details: ${offerDetails}</p>`,
//   };

//   sgMail
//   .send(msg)
//   .then(() => {
//       console.log('Email sent successfully');
//     })
//   .catch((error) => {
//       console.error(error);
//     });
// }

