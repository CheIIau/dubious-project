export const RouterPaths = {
    app: '',
    main: '/',
    about: '/about',
    profile: '/profile', //+id
    articles: '/articles',
    articleDetails: '/article', //+id
    articleCreate: '/article/new',
    articleEdit: '/article/:id/edit',
    _notFound: '/*',
} as const
