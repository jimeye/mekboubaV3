const fs = require('fs');
const path = require('path');

// Contenu du CV en HTML
const cvHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jimmy Fellous - CV</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #CD291E;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 32px;
            font-weight: bold;
            color: #CD291E;
            margin: 0 0 10px 0;
        }
        .title {
            font-size: 18px;
            font-weight: normal;
            color: #666;
            margin: 0 0 15px 0;
        }
        .contact {
            font-size: 14px;
            color: #555;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #CD291E;
            border-bottom: 2px solid #CD291E;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .job {
            margin-bottom: 20px;
        }
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .job-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin: 0;
        }
        .job-date {
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
        .job-company {
            font-size: 14px;
            font-style: italic;
            color: #666;
            margin-bottom: 10px;
        }
        ul {
            margin: 5px 0;
            padding-left: 20px;
        }
        li {
            margin-bottom: 3px;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #CD291E;
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">JIMMY FELLOUS</h1>
        <h2 class="title">Développeur Full-Stack Senior & Directeur Artistique Digital</h2>
        <div class="contact">
            <div>📧 jimmy.fellous@laboulette-ibiza.com</div>
            <div>📱 +33 6 52 69 69 76</div>
            <div>🌐 laboulette-ibiza.com</div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">PROFIL PROFESSIONNEL</h3>
        <p>
            Développeur Full-Stack Senior avec 30+ ans d'expérience dans la mode et le digital. 
            Ancien directeur artistique et créateur de marque, j'ai développé une expertise unique 
            combinant créativité artistique et maîtrise technique. Spécialisé dans la création de 
            sites e-commerce haut de gamme avec une approche design-driven.
        </p>
        <p style="font-weight: bold; color: #CD291E;">
            Expertise : Next.js, React, Stripe, UX/UI Design, Direction Artistique, E-commerce
        </p>
    </div>

    <div class="section">
        <h3 class="section-title">EXPÉRIENCE PROFESSIONNELLE</h3>
        
        <div class="job">
            <div class="job-header">
                <h4 class="job-title">Développeur Full-Stack Senior & Consultant Digital</h4>
                <span class="job-date">2023 - Présent</span>
            </div>
            <p class="job-company">Freelance - Spécialisation : Sites e-commerce premium et solutions web modernes</p>
            <div>
                <strong>Projets récents :</strong>
                <ul>
                    <li><strong>La Boulette Ibiza :</strong> Site e-commerce complet avec paiements Stripe/Apple Pay</li>
                    <li><strong>Architecture technique :</strong> Next.js 13, Redis, API REST, design responsive</li>
                    <li><strong>Fonctionnalités :</strong> Système de commande, interface admin, emails automatiques</li>
                </ul>
            </div>
        </div>

        <div class="job">
            <div class="job-header">
                <h4 class="job-title">Directeur Artistique & Créateur de Marque</h4>
                <span class="job-date">2018 - 2021 (3 ans)</span>
            </div>
            <p class="job-company">Atelier Beaurepaire - Marque de vêtements premium - Direction complète</p>
            <div>
                <strong>Direction Artistique :</strong>
                <ul>
                    <li>Conception des collections (design, couleurs, matières)</li>
                    <li>Direction photo et stylisme</li>
                    <li>Branding et identité visuelle</li>
                    <li>Stratégie marketing et communication</li>
                </ul>
                <strong>Développement Digital :</strong>
                <ul>
                    <li>Direction technique du site e-commerce</li>
                    <li>UX/UI Design et expérience utilisateur</li>
                    <li>Gestion de la production web</li>
                    <li>Optimisation conversion et performance</li>
                </ul>
                <strong>Gestion Business :</strong>
                <ul>
                    <li>Production et sourcing matières</li>
                    <li>Montage et essayages</li>
                    <li>Gestion équipe créative</li>
                    <li>Développement commercial</li>
                </ul>
            </div>
        </div>

        <div class="job">
            <div class="job-header">
                <h4 class="job-title">Agent Commercial Senior</h4>
                <span class="job-date">1990 - 2018 (28 ans)</span>
            </div>
            <p class="job-company">Grandes Marques de Jeans - Évolution de carrière exceptionnelle</p>
            <div>
                <ul>
                    <li><strong>1990-1995 :</strong> Manutentionnaire → Parrain (5 ans)</li>
                    <li><strong>1995-2000 :</strong> Cell Manager (5 ans)</li>
                    <li><strong>2000-2018 :</strong> Agent Commercial Senior (18 ans)</li>
                </ul>
                <strong>Expertise développée :</strong>
                <ul>
                    <li>Gestion de comptes majeurs</li>
                    <li>Négociation commerciale</li>
                    <li>Développement réseau</li>
                    <li>Analyse marché et tendances</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">COMPÉTENCES TECHNIQUES</h3>
        <div class="skills-grid">
            <div>
                <h4 style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px;">Développement Web</h4>
                <ul>
                    <li><strong>Frontend :</strong> React 18, Next.js 13, Tailwind CSS, JavaScript ES6+</li>
                    <li><strong>Backend :</strong> Node.js, API Routes, Redis/Upstash</li>
                    <li><strong>E-commerce :</strong> Stripe, Apple Pay, systèmes de commande</li>
                    <li><strong>DevOps :</strong> Vercel, Git, déploiement continu</li>
                </ul>
            </div>
            <div>
                <h4 style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px;">Design & Créativité</h4>
                <ul>
                    <li><strong>UX/UI Design :</strong> Interfaces utilisateur, expérience client</li>
                    <li><strong>Direction Artistique :</strong> Branding, identité visuelle</li>
                    <li><strong>Photographie :</strong> Direction photo, stylisme</li>
                    <li><strong>Design de Mode :</strong> Collections, matières, couleurs</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">FORMATION & DÉVELOPPEMENT</h3>
        <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h4 style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">Formation Intensive en Développement Web</h4>
                <span style="font-size: 14px; color: #666; font-style: italic;">2021-2023 (2 ans)</span>
            </div>
            <p style="font-size: 14px; font-style: italic; color: #666; margin-bottom: 8px;">
                Période post-COVID : Dédiée à l'apprentissage des technologies web modernes
            </p>
            <ul>
                <li><strong>Frontend :</strong> React, Next.js, Tailwind CSS</li>
                <li><strong>Backend :</strong> Node.js, API REST, bases de données</li>
                <li><strong>E-commerce :</strong> Stripe, systèmes de paiement</li>
                <li><strong>Design :</strong> UX/UI, responsive design, animations</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <h3 class="section-title">PROJETS RÉALISÉS</h3>
        <div style="margin-bottom: 20px;">
            <h4 style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 8px;">La Boulette Ibiza - E-commerce Premium (2025)</h4>
            <p style="font-size: 14px; font-style: italic; color: #666; margin-bottom: 8px;">
                Site e-commerce complet pour restaurant kosher-friendly
            </p>
            <ul>
                <li>🛒 Système de commande sophistiqué</li>
                <li>💳 Paiements Stripe + Apple Pay</li>
                <li>📱 Design responsive premium</li>
                <li>🎨 Interface admin intuitive</li>
                <li>📧 Emails automatiques personnalisés</li>
                <li>📊 Dashboard de gestion complet</li>
            </ul>
        </div>
        <div>
            <h4 style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 8px;">Atelier Beaurepaire - Marque de Mode (2018-2021)</h4>
            <p style="font-size: 14px; font-style: italic; color: #666; margin-bottom: 8px;">
                Marque de vêtements premium - Direction complète
            </p>
            <ul>
                <li>👔 Collections complètes (design, production)</li>
                <li>📸 Direction artistique et photo</li>
                <li>🌐 Site e-commerce performant</li>
                <li>🎯 Stratégie marketing et branding</li>
                <li>💼 Gestion business complète</li>
            </ul>
        </div>
    </div>

    <div class="footer">
        "L'art de la mode rencontre l'innovation digitale pour créer des expériences uniques" 🎨✨
    </div>
</body>
</html>
`;

// Écrire le fichier HTML
fs.writeFileSync('Jimmy-Fellous-CV.html', cvHTML);

console.log('✅ CV HTML généré : Jimmy-Fellous-CV.html');
console.log('📄 Pour convertir en PDF, ouvrez le fichier dans votre navigateur et utilisez "Imprimer > Enregistrer en PDF"');
console.log('🌐 Ou utilisez un service en ligne comme : https://www.ilovepdf.com/html-to-pdf'); 