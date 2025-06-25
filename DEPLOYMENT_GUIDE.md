# Guide de Déploiement Stripe + Apple Pay sur Vercel

## 🎯 Objectif
Déployer le site de restaurant avec paiement Stripe (incluant Apple Pay) sur Vercel et tester le fonctionnement.

## 📋 Checklist Pré-déploiement

### ✅ Vérifications Stripe
- [ ] Compte Stripe actif en mode test
- [ ] Clés API générées récemment (< 7 jours)
- [ ] Clé secrète : `sk_test_...`
- [ ] Clé publique : `pk_test_...`

### ✅ Vérifications Code
- [ ] Paiement fonctionne en local
- [ ] Variables d'environnement configurées
- [ ] Pas d'erreurs de compilation
- [ ] Composants Stripe Elements intégrés

### ✅ Vérifications Vercel
- [ ] Compte Vercel connecté à GitHub
- [ ] Projet créé sur Vercel
- [ ] Variables d'environnement ajoutées

## 🚀 Étapes de Déploiement

### 1. Préparation du Code

```bash
# Vérifier l'état du repo
git status

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "feat: intégration Stripe paiement Apple Pay + guide déploiement"

# Pousser sur GitHub
git push origin main
```

### 2. Configuration Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Dashboard > Projet > Settings > Environment Variables**
3. **Ajouter les variables :**

```
STRIPE_SECRET_KEY = sk_test_... (votre clé secrète)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_... (votre clé publique)
```

4. **Sélectionner :**
   - Type: Plaintext
   - Environment: Production & Preview

### 3. Déploiement

- Le déploiement se fait automatiquement après le push
- Vérifier les logs de build sur Vercel
- Attendre que le statut soit "Ready"

## 🧪 Test du Paiement

### Test Standard (Cartes)
1. Ouvrir le site déployé
2. Aller sur `/payment`
3. Remplir le formulaire de commande
4. Utiliser une carte de test Stripe :
   - `4242 4242 4242 4242` (succès)
   - `4000 0000 0000 0002` (déclinée)

### Test Apple Pay
1. **Prérequis :**
   - Safari sur Mac/iPhone/iPad
   - Carte enregistrée dans Apple Wallet
   - Site en HTTPS (automatique sur Vercel)

2. **Test :**
   - Ouvrir le site sur Safari
   - Aller sur la page de paiement
   - Le bouton Apple Pay doit apparaître
   - Effectuer un paiement test

## 🔍 Dépannage

### Erreur "Invalid API Key"
```bash
# Vérifier les clés
echo $STRIPE_SECRET_KEY
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Régénérer si nécessaire sur Stripe Dashboard
# Developers > API Keys > Create new key
```

### Apple Pay ne s'affiche pas
- Vérifier que vous êtes sur Safari
- Vérifier qu'une carte est dans Apple Wallet
- Vérifier que le site est en HTTPS
- Tester sur un appareil Apple physique (pas simulateur)

### Erreur de build Vercel
- Vérifier les logs de build
- Contrôler les variables d'environnement
- Tester en local avec `npm run build`

## 📱 Test Mobile

### iPhone/iPad
1. Ouvrir Safari
2. Aller sur le site
3. Ajouter une carte dans Apple Wallet si nécessaire
4. Tester le paiement Apple Pay

### Android
1. Ouvrir Chrome
2. Tester le paiement standard
3. Google Pay peut s'afficher automatiquement

## 🔄 Mise à jour

Pour mettre à jour le site :

```bash
# Modifier le code
git add .
git commit -m "fix: correction bug paiement"
git push
```

Vercel redéploie automatiquement.

## 📞 Support

### Logs utiles
- **Vercel** : Dashboard > Projet > Functions > Logs
- **Stripe** : Dashboard > Developers > Logs
- **Local** : Terminal avec `npm run dev`

### Contacts
- Stripe Support : [support.stripe.com](https://support.stripe.com)
- Vercel Support : [vercel.com/support](https://vercel.com/support)

---

## ✅ Validation Finale

Après déploiement, vérifier :

- [ ] Site accessible sur l'URL Vercel
- [ ] Formulaire de commande fonctionne
- [ ] Paiement carte de test réussi
- [ ] Paiement Apple Pay fonctionne (si testé)
- [ ] Pas d'erreurs dans les logs
- [ ] Variables d'environnement correctes

**🎉 Félicitations ! Votre site est prêt pour les tests de paiement.** 