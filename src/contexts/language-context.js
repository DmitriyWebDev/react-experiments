import React from 'react'

export const locales = [
    'ru',
    'en',
    'fr'
]

export const vocabulary = {
    en: {
        'Главная страница': 'Main page',
        'Клиенты': 'Clients',
        'Посылки': 'Parcels',
        'Длинная страница': 'Long page'
    },
    fr: {
        'Главная страница': 'Page d\'accueil',
        'Клиенты': 'Les clients',
        'Посылки': 'Colis',
        'Длинная страница': 'Longue page'
    }
};

export const LanguageContext = React.createContext(
    {
        changeLanguage: () => {},
    }
);