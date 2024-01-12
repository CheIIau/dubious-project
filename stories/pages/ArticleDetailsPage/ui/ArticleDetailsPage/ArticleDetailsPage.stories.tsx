import type { Meta, StoryObj } from '@storybook/react'
import type { Article } from 'src/entities/Article/articleIndex'
import {
    ARTICLE_BLOCK_TYPE,
    ARTICLE_TYPE,
} from 'src/entities/Article/articleIndex'
import ArticleDetailsPage from 'src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage'
import { DEV_API_URL } from 'src/shared/api/api'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'
import { SuspenseDecorator } from 'src/shared/config/storybook/decorators/SuspenseDecorator'
import {
    reactRouterParameters,
    withRouter,
} from 'storybook-addon-react-router-v6'

const article: Article = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ARTICLE_TYPE.IT],
    user: {
        id: '1',
        username: 'Ulbi tv',
        avatar: '',
    },
    blocks: [
        {
            id: '1',
            type: ARTICLE_BLOCK_TYPE.text,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '4',
            type: ARTICLE_BLOCK_TYPE.code,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
        {
            id: '5',
            type: ARTICLE_BLOCK_TYPE.text,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
    ],
}

const meta = {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { id: '1' },
            },
            routing: {
                path: '/users/:id',
            },
        }),
        layout: 'centered',
        mockData: [
            {
                url: `${DEV_API_URL}/articles?_limit=:id`,
                method: 'GET',
                status: 200,
                response: [article, article, article],
            },
            {
                url: `${DEV_API_URL}/articles/:id?_expand=user`,
                method: 'GET',
                status: 200,
                response: article,
            },
            {
                url: `${DEV_API_URL}/comments?articleId=:id&_expand=user`,
                method: 'GET',
                status: 200,
                response: [],
            },
            {
                url: `${DEV_API_URL}/article-ratings?articleId=:id`,
                method: 'GET',
                status: 200,
                response: [],
            },
        ],
    },
    tags: ['autodocs'],
    args: {
        className: '',
    },
    argTypes: {
        className: {
            description: 'Given classes',
        },
    },
    decorators: [SuspenseDecorator, StoreDecorator({}), withRouter],
} satisfies Meta<typeof ArticleDetailsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render: ({ ...args }) => (
        <div style={{ maxWidth: '700px', maxHeight: '100vh' }}>
            <ArticleDetailsPage {...args} />
        </div>
    ),
}
