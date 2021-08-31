import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
// const languageDetector = {
//   type: 'languageDetector',
//   async: true, // flags below detection to be async
//   // detect: callback => {
//   //   return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
//   //     callback(locale);
//   //   });
//   // },
//   // TODO: react-native-localize
//   detect: callback => {
//     return 'en';
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

i18n
  // .use(languageDetector)
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
          },
          deck: {
            title: 'New Deck',
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
            ok: 'OK',
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
  });

export default i18n;
