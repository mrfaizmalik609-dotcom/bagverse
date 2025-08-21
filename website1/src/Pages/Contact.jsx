import React, { useState } from 'react';
import Header from '../components/Header';
import { db } from '../Firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setSuccessMessage('✅ Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMessage(`❌ Failed to send message: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: '120px', paddingInline: '20px' }}>
        <h2 style={{ marginLeft: '190px', marginBottom: '40px' }}>📞 Contact Us</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              flex: '1 1 400px',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              backgroundColor: '#312a2aff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              border: '2px solid black',
              marginBottom: '30px',
            }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Your Name"
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Your Phone Number"
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Your Address"
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <textarea
              name="message"
              value={formData.message}
              placeholder="Your Message / Description"
              rows="5"
              onChange={handleChange}
              required
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            ></textarea>

            <button
              type="submit"
              style={{
                padding: '12px',
                backgroundColor: 'grey',
                color: 'white',
                border: '2px solid black',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'green')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'grey')}
            >
              Send Message
            </button>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>

          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13273.801539091527!2d73.1028424!3d33.6060841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95025c325ff9%3A0x93dd7305bfe132b4!2sJ453%2BGPQ%2C%20Old%20Airport%20Rd%2C%20Chaklala%20Cantt.%2C%20Rawalpindi%2C%2046000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1691350058053!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{
                border: 0,
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
