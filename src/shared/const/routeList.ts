export const RouterPaths = {
    app: '',
    main: '/',
    about: '/about',
    profile: '/profile', //+id
    articles: '/articles',
    articleDetails: '/article', //+id
    articleCreate: '/article/new',
    articleEdit: '/article/:id/edit',
    adminPanelPage: '/admin-panel',
    _forbidden: '/forbidden',
    _notFound: '/*',
} as const
