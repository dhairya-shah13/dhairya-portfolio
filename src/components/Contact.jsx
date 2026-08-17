import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // The contact form is client-side only (no delivery backend), so nothing
      // is actually sent from the server. Compose a prefilled email the visitor
      // can send from their own email client instead — the UI must not claim a
      // message was delivered.
      const subject = encodeURIComponent(`Message from ${formData.name} (${formData.email}) via aboutdhairya.me`);
      const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name}\n${formData.email}`);
      setMailtoUrl(`mailto:shah.dhairya.p13@gmail.com?subject=${subject}&body=${body}`);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 10000);
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
              <div className={styles.successMessage} role="status">
                <span className={styles.successDot}></span>
                <p className={styles.successTitle}>Thanks, {formData.name || 'there'}!</p>
                <p className={styles.successText}>
                  This demo form doesn&apos;t send messages from the site yet. Your message is
                  ready to send from your own email app — use the button below, or email me
                  directly at shah.dhairya.p13@gmail.com.
                </p>
                <a href={mailtoUrl} className={styles.emailBtn}>
                  Send via Email
                </a>
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
              <img src={dhairyaPhoto} alt="Portrait of Dhairya Shah" className={styles.portraitImg} loading="lazy" width={640} height={640} />
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
