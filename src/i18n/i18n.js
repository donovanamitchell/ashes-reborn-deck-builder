import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {findBestAvailableLanguage} from 'react-native-localize';
import {LANGUAGES} from '../components/util/constants';

const languageDetector = {
  type: 'languageDetector',
  detect: () => {
    let lang = findBestAvailableLanguage(LANGUAGES);
    if (lang) {
      return lang.languageTag;
    } else {
      return 'en';
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    resources: {
      en: {
        translation: {
          common: {
            cancelButton: 'Cancel',
            all: 'All',
            loading: 'Loading...',
            done: 'Done',
            ok: 'OK',
            orSeparator: ' or ',
            ownedPacks: 'Owned Packs',
            formats: {
              standard: 'Standard',
              tournament: 'Tournament',
            },
            types: {
              ally: 'Ally',
              actionSpell: 'Action Spell',
              alterationSpell: 'Alteration Spell',
              reactionSpell: 'Reaction Spell',
              readySpell: 'Ready Spell',
              conjuration: 'Conjuration',
              conjuredAlterationSpell: 'Conjured Alteration Spell',
              phoenixborn: 'Phoenixborn',
            },
            dice: {
              ceremonial: 'Ceremonial',
              charm: 'Charm',
              divine: 'Divine',
              illusion: 'Illusion',
              natural: 'Natural',
              sympathy: 'Sympathy',
              time: 'Time',
            },
          },
          cards: {
            title: 'Cards',
            uniqueCard: '{{phoenixborn}} unique card',
          },
          deck: {
            title: 'New Deck',
            main: {
              title: 'Main',
              name: 'Deck Name:',
              namePlaceholder: 'Deck Name',
              phoenixborn: 'Phoenixborn:',
              description: 'Description:',
              descriptionPlaceholder: 'Description',
              format: 'Format:',
              dice: 'Dice:',
              firstFive: 'First Five:',
              cards: 'Cards:',
              copy: 'Copy Deck Text',
            },
            cards: {
              title: 'Cards',
              cardCount: 'Cards: ',
              searchPlaceholder: 'Search',
              filters: 'Filters: ',
              packs: 'Packs: ',
              type: 'Type:',
              showCardsSwitch: 'Show Included Cards',
            },
            firstFive: {
              title: 'First Five',
            },
            dice: {
              title: 'Dice',
            },
          },
          decks: {
            title: 'Decks',
            createDeckButton: 'New Deck',
            settingsButton: 'Settings',
            deleteDeckWarning:
              'Permanently delete this deck? This action cannot be undone.',
            deleteDeckButton: 'Delete Deck',
          },
          errors: {
            githubIssue:
              'Please create an issue in the ashes-reborn-deck-builder github repository.\n\n{{stacktrace}}',
            cards: {
              tooMany: 'There are too many cards in this deck',
              tooFew: 'There are too few cards in this deck',
              uniqueCard:
                '"{{cardName}}" may only be included in {{phoenixborn}} decks',
            },
            firstFive: {
              chained: '{{card}} is Chained cannot be in the first five',
              tooFew: 'There are no copies of {{card}} in this deck',
              tooMany:
                'There are too many copies of {{card}} in the first five',
            },
          },
          settings: {
            title: 'Settings',
            pleaseDoNotSue:
              'All images, graphics, textual and game contents © 2015-2021 Plaid Hat Games. All rights reserved.',
            issueTracker: {
              part1: 'Please submit any bugs or feature requests to our ',
              part2: 'Issue Tracker',
              part3: '.',
            },
            thanksSkaak: {
              part1: 'Special thanks to the developers of ',
              part2: 'Ashes Live',
              part3:
                ' for graciously allowing the Ashes Reborn Deck Builder to use their API and the Ashes Font.',
            },
            newReleasesButton: 'Check for New Releases',
            ownedPacks: 'Owned Packs',
            theme: 'Theme',
            themes: {
              dark: 'Dark',
              light: 'Light',
            },
            cache: 'Cache',
            cacheOptionsDescription:
              'The card images can either be stored in a cache or document store. Images stored in the cache may be deleted automatically by the system to save storage space. Images in the document store will not be deleted unless the card data is reset.',
            cacheOptions: {
              document: 'Document Storage',
              cache: 'Cache Storage',
            },
            downloadImagesButton: 'Download All Card Images',
            cacheClearButton: 'Reset Card Data',
            cacheModal: {
              warning:
                'All data for the selected packs, including images, will be deleted from the cache and re-downloaded.',
              deleteButton: 'Delete Data',
            },
          },
        },
      },
    },

    debug: true,

    cache: {
      enabled: true,
    },

    interpolation: {
      escapeValue: false,
    },

    returnObjects: true,
  });

export default i18n;
