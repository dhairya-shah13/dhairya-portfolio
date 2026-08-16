import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="section-dark section-padding">
      <div className="container">
        <div className={styles.grid}>
          
          {/* Left Column: Form Card */}
          <motion.div 
            className={styles.formCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className={styles.formTitle}>Send a Message</h3>
            
            {submitted ? (
              <div className={styles.successMessage}>
                <span className={styles.successDot}></span>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="name@example.com" 
                    required 
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows="5" 
                    placeholder="Describe your project or role..." 
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Submit Message
                  <Send size={16} className={styles.submitIcon} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Info Over Portrait */}
          <motion.div 
            className={styles.infoColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Grayscale Dim Portrait background */}
            <div className={styles.portraitBackground}>
              <img src={dhairyaPhoto} alt="Dhairya Portrait" className={styles.portraitImg} />
              <div className={styles.overlay}></div>
            </div>

            {/* Content sitting on top of image overlay */}
            <div className={styles.infoContent}>
              <p className={styles.eyebrow}>Availability</p>
              <h2 className={styles.headline}>Get In Touch</h2>
              
              <div className={styles.contactDetails}>
                <a href="mailto:shah.dhairya.p13@gmail.com" className={styles.detailRow}>
                  <div className={styles.detailIcon}>
                    <Mail size={18} />
                  </div>
                  <span className={styles.detailText}>shah.dhairya.p13@gmail.com</span>
                </a>
                
                <a href="tel:9924343003" className={styles.detailRow}>
                  <div className={styles.detailIcon}>
                    <Phone size={18} />
                  </div>
                  <span className={styles.detailText}>+91 99243 43003</span>
                </a>
              </div>

              <div className={styles.socialsGroup}>
                <span className={styles.socialsLabel}>Follow along</span>
                <div className={styles.socialsLinks}>
                  <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
