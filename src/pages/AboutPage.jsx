import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Mail } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { contact, resumeUrl } from '../data/person.js';
import {
  skillsData,
  educationData,
  certificationsData,
  achievementsData,
  experienceData,
  focusAreasData,
} from '../data/siteContent.js';
import { buildPersonSchema, buildProfilePageSchema, buildFaqSchema } from '../data/schema.js';
import styles from './AboutPage.module.css';

const faq = [
  {
    question: 'Who is Dhairya Shah?',
    answer:
      'Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, India. He builds and deploys web products end-to-end — MERN and Django/Flask applications, Docker containerization, CI/CD pipelines, and cloud deployment — and has led engineering teams taking software from concept to production.',
  },
  {
    question: 'What does Dhairya Shah do?',
    answer:
      'He designs, builds, and ships production software: full-stack web applications, REST APIs, database schemas, and deployment infrastructure. At Vassu Infotech he led development and deployment of VassuERP, an enterprise resource planning system, and StockFlow, an inventory management system.',
  },
  {
    question: 'What technologies does Dhairya Shah use?',
    answer:
      'Python, Java, Kotlin, JavaScript, C, and C++ across the stack, with React.js, Node.js, Express.js, Django, and Flask for applications; SQL and MongoDB for data; and Docker, GitHub Actions CI/CD, Linux shell scripting, Git/GitHub, and Hostinger VPS for infrastructure.',
  },
  {
    question: 'Where did Dhairya Shah study?',
    answer:
      'He is pursuing a B.Tech in Information Technology at Charotar University of Science and Technology (CHARUSAT), and completed Class XII at Seventh Day Adventist Higher Secondary School (94%) and Class X at Divine Gurukulam (92%).',
  },
  {
    question: 'How can I contact Dhairya Shah?',
    answer:
      `By email at ${contact.email}, by phone at ${contact.phoneDisplay}, or through his GitHub and LinkedIn profiles linked on this page.`,
  },
];

function AboutPage() {
  return (
    <>
      <Seo
        title="About Dhairya Shah | Full-Stack Developer & DevOps Engineer"
        description="Learn about Dhairya Shah — full-stack developer and DevOps engineer from Ahmedabad, Gujarat: professional focus, skills, experience, education, projects, and how to get in touch."
        path="/about"
      />
      <JsonLd data={buildPersonSchema()} />
      <JsonLd data={buildProfilePageSchema('/about')} />
      <JsonLd data={buildFaqSchema(faq)} />

      {/* Header */}
      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.textBlock}>
              <p className={styles.eyebrow}>About</p>
              <h1 className={styles.title}>Dhairya Shah</h1>
              <p className={styles.subline}>Full-Stack Developer & DevOps Engineer — Ahmedabad, Gujarat</p>
              <p className={styles.identity}>
                Dhairya Shah is a full-stack developer and DevOps engineer who ships products end-to-end — from
                database schema to server provisioning to production URL. He led two engineering teams at Vassu
                Infotech and has six live products shipped across the MERN and Django/Flask stacks.
              </p>
              <div className={styles.ctaRow}>
                <a href={resumeUrl} className={styles.primaryBtn} download>
                  <FileText size={16} />
                  Resume (PDF)
                </a>
                <Link to="/#contact" className={styles.ghostBtn}>
                  <Mail size={16} />
                  Get in Touch
                </Link>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
                  GitHub <ExternalLink size={14} />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
                  LinkedIn <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div className={styles.photoColumn}>
              <div className={styles.photoFrame}>
                <img
                  src="/images/dhairya-shah.jpg"
                  alt="Portrait of Dhairya Shah, full-stack developer and DevOps engineer"
                  className={styles.profileImg}
                  width={640}
                  height={640}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is Dhairya Shah? (AEO) */}
      <section className="section-light section-padding">
        <div className="container">
          <div className={styles.aeoBlock}>
            <p className={styles.eyebrow}>In short</p>
            <h2 className={styles.sectionTitle}>Who is Dhairya Shah?</h2>
            <p className={styles.aeoAnswer}>
              Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, India, who
              builds reliable web products from database to deployed URL. He is proficient across the MERN stack
              (MongoDB, Express, React, Node.js) and Python frameworks (Django, Flask), manages infrastructure with
              Docker, GitHub Actions CI/CD and Linux shell scripting, and has led concurrent engineering teams taking
              products to company-wide production use.
            </p>
            <div className={styles.quickFacts}>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Role</span>
                <span className={styles.factValue}>Full-Stack Developer & DevOps Engineer</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Location</span>
                <span className={styles.factValue}>Ahmedabad, Gujarat, India</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Shipped</span>
                <span className={styles.factValue}>6 live products end-to-end</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Leadership</span>
                <span className={styles.factValue}>2 engineering teams led at Vassu Infotech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional focus */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Services & Domain</p>
            <h2 className={styles.sectionTitle}>Professional Focus</h2>
          </div>
          <div className={styles.focusList}>
            {focusAreasData.map((item) => (
              <div key={item.id} className={styles.focusRow}>
                <span className={`${styles.focusIndex} numeral`}>{item.id}</span>
                <div className={styles.focusContent}>
                  <h3 className={styles.focusTitle}>{item.title}</h3>
                  <p className={styles.focusDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-light section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Capabilities & Stack</p>
            <h2 className={styles.sectionTitle}>Skills</h2>
          </div>
          <div className={styles.skillsGrid}>
            {skillsData.map((group) => (
              <div key={group.category} className={styles.skillCard}>
                <h3 className={styles.skillCategory}>{group.category}</h3>
                <div className={styles.pillsContainer}>
                  {group.items.map((skill) => (
                    <span key={skill} className={styles.pill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 140 }}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Professional History</p>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>
          <div className={styles.experienceCard}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.experienceRole}>{experienceData.role}</h3>
              <span className={styles.experienceCompany}>{experienceData.company}</span>
              <span className={styles.experienceMeta}>
                {experienceData.period} · {experienceData.orgSize}
              </span>
            </div>
            <p className={styles.experienceSummary}>{experienceData.summary}</p>
            <ul className={styles.experienceList}>
              {experienceData.bullets.map((item) => (
                <li key={item} className={styles.experienceItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 140 }}>
          <div className={styles.eduGrid}>
            <div className={styles.eduColumn}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Education</p>
                <h2 className={styles.sectionTitle}>Education</h2>
              </div>
              {educationData.map((item) => (
                <div key={item.detail} className={styles.eduRow}>
                  <span className={`${styles.period} numeral`}>{item.period}</span>
                  <div className={styles.eduContent}>
                    <h3 className={styles.eduDetail}>{item.detail}</h3>
                    <p className={styles.eduInstitution}>{item.institution}</p>
                    <span className={styles.note}>{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.eduColumn}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Certifications</p>
                <h2 className={styles.sectionTitle}>Certifications</h2>
              </div>
              {certificationsData.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certRow}
                >
                  <span className={styles.certName}>{cert.name}</span>
                  <ExternalLink size={16} className={styles.linkIcon} />
                </a>
              ))}
              <p className={styles.certNote}>
                Including Microsoft Azure AI Fundamentals (AI-900) exam preparation — foundational AI/ML knowledge,
                not professional AI/ML engineering experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 140 }}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Honors & Highlights</p>
            <h2 className={styles.sectionTitle}>Achievements</h2>
          </div>
          <div className={styles.achievementList}>
            {achievementsData.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.achievementCard}
              >
                <div className={styles.achievementText}>
                  <h3 className={styles.achievementTitle}>{item.title}</h3>
                  <p className={styles.achievementDesc}>{item.description}</p>
                </div>
                <ExternalLink size={16} className={styles.linkIcon} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Common Questions</p>
            <h2 className={styles.sectionTitle}>About Dhairya Shah</h2>
          </div>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-light section-padding">
        <div className="container">
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>
              Working on a project that <span className="text-accent">ships</span>?
            </h2>
            <p className={styles.ctaSubline}>
              Dhairya is open to full-stack, cloud, and DevOps engineering opportunities.
            </p>
            <Link to="/#contact" className={styles.ctaButton}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
