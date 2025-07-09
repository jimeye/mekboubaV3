'use client';

import { useEffect } from 'react';

export default function CVPage() {
  useEffect(() => {
    // Forcer le style pour le PDF
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.margin = '0';
    document.body.style.padding = '20px';
    document.body.style.backgroundColor = 'white';
  }, []);

  return (
    <div className="cv-container" style={{
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      {/* En-tête */}
      <div style={{
        textAlign: 'center',
        borderBottom: '3px solid #CD291E',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#CD291E',
          margin: '0 0 10px 0'
        }}>
          JIMMY FELLOUS
        </h1>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'normal',
          color: '#666',
          margin: '0 0 15px 0'
        }}>
          Développeur Full-Stack Senior & Directeur Artistique Digital
        </h2>
        <div style={{
          fontSize: '14px',
          color: '#555'
        }}>
          <div>📧 jimmy.fellous@laboulette-ibiza.com</div>
          <div>📱 +33 6 52 69 69 76</div>
          <div>🌐 laboulette-ibiza.com</div>
        </div>
      </div>

      {/* Profil */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#CD291E',
          borderBottom: '2px solid #CD291E',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          PROFIL PROFESSIONNEL
        </h3>
        <p style={{ fontSize: '14px', textAlign: 'justify' }}>
          Développeur Full-Stack Senior avec 30+ ans d'expérience dans la mode et le digital. 
          Ancien directeur artistique et créateur de marque, j'ai développé une expertise unique 
          combinant créativité artistique et maîtrise technique. Spécialisé dans la création de 
          sites e-commerce haut de gamme avec une approche design-driven.
        </p>
        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#CD291E' }}>
          Expertise : Next.js, React, Stripe, UX/UI Design, Direction Artistique, E-commerce
        </p>
      </div>

      {/* Expérience */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#CD291E',
          borderBottom: '2px solid #CD291E',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          EXPÉRIENCE PROFESSIONNELLE
        </h3>

        {/* Développeur Full-Stack */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0'
            }}>
              Développeur Full-Stack Senior & Consultant Digital
            </h4>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              2023 - Présent
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '10px'
          }}>
            Freelance - Spécialisation : Sites e-commerce premium et solutions web modernes
          </p>
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '5px' }}><strong>Projets récents :</strong></div>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li><strong>La Boulette Ibiza :</strong> Site e-commerce complet avec paiements Stripe/Apple Pay</li>
              <li><strong>Architecture technique :</strong> Next.js 13, Redis, API REST, design responsive</li>
              <li><strong>Fonctionnalités :</strong> Système de commande, interface admin, emails automatiques</li>
            </ul>
          </div>
        </div>

        {/* Atelier Beaurepaire */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0'
            }}>
              Directeur Artistique & Créateur de Marque
            </h4>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              2018 - 2021 (3 ans)
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '10px'
          }}>
            Atelier Beaurepaire - Marque de vêtements premium - Direction complète
          </p>
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '8px' }}><strong>Direction Artistique :</strong></div>
            <ul style={{ margin: '5px 0 15px 20px' }}>
              <li>Conception des collections (design, couleurs, matières)</li>
              <li>Direction photo et stylisme</li>
              <li>Branding et identité visuelle</li>
              <li>Stratégie marketing et communication</li>
            </ul>
            <div style={{ marginBottom: '8px' }}><strong>Développement Digital :</strong></div>
            <ul style={{ margin: '5px 0 15px 20px' }}>
              <li>Direction technique du site e-commerce</li>
              <li>UX/UI Design et expérience utilisateur</li>
              <li>Gestion de la production web</li>
              <li>Optimisation conversion et performance</li>
            </ul>
            <div style={{ marginBottom: '8px' }}><strong>Gestion Business :</strong></div>
            <ul style={{ margin: '5px 0 0 20px' }}>
              <li>Production et sourcing matières</li>
              <li>Montage et essayages</li>
              <li>Gestion équipe créative</li>
              <li>Développement commercial</li>
            </ul>
          </div>
        </div>

        {/* Agent Commercial */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0'
            }}>
              Agent Commercial Senior
            </h4>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              1990 - 2018 (28 ans)
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '10px'
          }}>
            Grandes Marques de Jeans - Évolution de carrière exceptionnelle
          </p>
          <div style={{ fontSize: '14px' }}>
            <ul style={{ margin: '5px 0 0 20px' }}>
              <li><strong>1990-1995 :</strong> Manutentionnaire → Parrain (5 ans)</li>
              <li><strong>1995-2000 :</strong> Cell Manager (5 ans)</li>
              <li><strong>2000-2018 :</strong> Agent Commercial Senior (18 ans)</li>
            </ul>
            <div style={{ marginTop: '10px' }}><strong>Expertise développée :</strong></div>
            <ul style={{ margin: '5px 0 0 20px' }}>
              <li>Gestion de comptes majeurs</li>
              <li>Négociation commerciale</li>
              <li>Développement réseau</li>
              <li>Analyse marché et tendances</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compétences */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#CD291E',
          borderBottom: '2px solid #CD291E',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          COMPÉTENCES TECHNIQUES
        </h3>
        
        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '10px'
            }}>
              Développement Web
            </h4>
            <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
              <li><strong>Frontend :</strong> React 18, Next.js 13, Tailwind CSS, JavaScript ES6+</li>
              <li><strong>Backend :</strong> Node.js, API Routes, Redis/Upstash</li>
              <li><strong>E-commerce :</strong> Stripe, Apple Pay, systèmes de commande</li>
              <li><strong>DevOps :</strong> Vercel, Git, déploiement continu</li>
            </ul>
          </div>
          
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '10px'
            }}>
              Design & Créativité
            </h4>
            <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
              <li><strong>UX/UI Design :</strong> Interfaces utilisateur, expérience client</li>
              <li><strong>Direction Artistique :</strong> Branding, identité visuelle</li>
              <li><strong>Photographie :</strong> Direction photo, stylisme</li>
              <li><strong>Design de Mode :</strong> Collections, matières, couleurs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formation */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#CD291E',
          borderBottom: '2px solid #CD291E',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          FORMATION & DÉVELOPPEMENT
        </h3>
        
        <div style={{ marginBottom: '15px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0'
            }}>
              Formation Intensive en Développement Web
            </h4>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              2021-2023 (2 ans)
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '8px'
          }}>
            Période post-COVID : Dédiée à l'apprentissage des technologies web modernes
          </p>
          <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
            <li><strong>Frontend :</strong> React, Next.js, Tailwind CSS</li>
            <li><strong>Backend :</strong> Node.js, API REST, bases de données</li>
            <li><strong>E-commerce :</strong> Stripe, systèmes de paiement</li>
            <li><strong>Design :</strong> UX/UI, responsive design, animations</li>
          </ul>
        </div>
        
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0'
            }}>
              Formation Continue en Mode & Design
            </h4>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              1990-2021 (31 ans)
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '8px'
          }}>
            Auto-formation continue
          </p>
          <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
            <li>Direction artistique et créative</li>
            <li>Design de mode et stylisme</li>
            <li>Photographie et direction photo</li>
            <li>Marketing et communication</li>
          </ul>
        </div>
      </div>

      {/* Projets */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#CD291E',
          borderBottom: '2px solid #CD291E',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          PROJETS RÉALISÉS
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px'
          }}>
            La Boulette Ibiza - E-commerce Premium (2025)
          </h4>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '8px'
          }}>
            Site e-commerce complet pour restaurant kosher-friendly
          </p>
          <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
            <li>🛒 Système de commande sophistiqué</li>
            <li>💳 Paiements Stripe + Apple Pay</li>
            <li>📱 Design responsive premium</li>
            <li>🎨 Interface admin intuitive</li>
            <li>📧 Emails automatiques personnalisés</li>
            <li>📊 Dashboard de gestion complet</li>
          </ul>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px'
          }}>
            Atelier Beaurepaire - Marque de Mode (2018-2021)
          </h4>
          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
            marginBottom: '8px'
          }}>
            Marque de vêtements premium - Direction complète
          </p>
          <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
            <li>👔 Collections complètes (design, production)</li>
            <li>📸 Direction artistique et photo</li>
            <li>🌐 Site e-commerce performant</li>
            <li>🎯 Stratégie marketing et branding</li>
            <li>💼 Gestion business complète</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '2px solid #CD291E',
        fontSize: '14px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        "L'art de la mode rencontre l'innovation digitale pour créer des expériences uniques" 🎨✨
      </div>
    </div>
  );
} 