# Arène Pokémon

Ce projet est une simulation d'arène Pokémon développée en React et TypeScript. Les utilisateurs peuvent sélectionner des pokémon, les faire combattre contre un boss et utiliser différentes compétences basées sur les éléments du jeu Pokémon.

## Fonctionnalités

- **Sélection des Pokémon**: Choisissez un Pokémon pour entrer dans l'arène.
- **Sélection du carte **: Choisissez une carte pour entrer dans l'arène.
- **Sélection du musique**: Choisissez une musique pour entrer dans l'arène.
- **Combats Dynamiques**: Les combats se déroulent en tours, où chaque monstre peut utiliser des compétences spécifiques.
- **Système d'Éléments**: Chaque compétence a un élément associé qui influence son efficacité contre d'autres.
- **Historique des Combats**: Suivez l'évolution du combat à chaque tour avec un historique détaillé des actions.
- **Système d'affichage des degats**: Suivez en temps réel les degats subit ou les soins.

## Technologies Utilisées

- React
- TypeScript
- Tailwind et SCSS

## Installation

Pour installer et exécuter ce projet localement, suivez les instructions ci-dessous :

1. Clonez le dépôt GitHub :
   ```bash
   git clone https://github.com/Rederox/rpg
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd votre-repo
   ```
3. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```
4. Lancez l'application :
   ```bash
   npm run start
   ```

L'application sera accessible via `http://localhost:3000`.

## Structure du Code

Le projet est structuré autour des principaux modules suivants :

- `Monster.ts`: Définit la classe `Monster` avec des méthodes pour les attaques et la défense.
- `Skill.ts`: Définit la classe `Skill` représentant les compétences des monstres.
- `Battle.ts`: Gère la logique des combats entre les monstres.
- `Elements.ts`: Contient les définitions des éléments et leur efficacité relative.
  
## Doc du jeu

Pokemon Battle est une reproduction du système de combat pokemon.

Il y a 3 difficultés différentes avec trois boss différents :
- Facile : Mewtwo
- Normal : Rayquaza
- Difficile : Arceus

Pour pouvoir les affronter pour pouvez choisir parmis 4 pokemons :
- Blindépique, type Plante
- Pingoleon, type Eau
- Lugulabre, type Feu
- Pikachu, type Electrique
Le combat se fait tour par tour et certaines attaques ont besoin de plusieurs tours avant d'être à nouveau disponibles.

Attention aux types des attaques et des ennemis !

Bon Jeu !

## Captures d'écran

### Acceuil
![image](https://github.com/Rederox/rpg/assets/80551691/2efef700-3d3d-45d6-a0ee-f253a06f97bc)

### Dans l'aréne
![image](https://github.com/Rederox/rpg/assets/80551691/37a313f9-f6f5-46fd-8dd1-94d6b5f3adae)
![image](https://github.com/Rederox/rpg/assets/80551691/d6ec3268-4be5-4d84-8e87-d7df4fbfe788)
![image](https://github.com/Rederox/rpg/assets/80551691/660488ec-8673-49b1-9e15-a3f8d322e11e)

## Contribution

Les contributions à ce projet sont bienvenues. Voici comment vous pouvez contribuer :

1. **Fork** le dépôt sur GitHub.
2. **Créez une branche** pour vos modifications.
3. **Faites vos changements** et committez-les.
4. **Envoyez un pull request** avec une description détaillée de vos modifications.

## Remerciements

Merci à tous ceux qui ont contribué à ce projet !
