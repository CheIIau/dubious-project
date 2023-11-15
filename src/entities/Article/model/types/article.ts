export interface Article {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: (keyof typeof ARTICLE_TYPE)[]
    blocks: ArticleBlock[]
}

export const ARTICLE_BLOCK_TYPE = {
    code: 'code',
    image: 'image',
    text: 'text',
} as const

export interface ArticleBlockBase {
    id: string
    type: keyof typeof ARTICLE_BLOCK_TYPE
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: (typeof ARTICLE_BLOCK_TYPE)['code']
    code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: (typeof ARTICLE_BLOCK_TYPE)['image']
    src: string
    title: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: (typeof ARTICLE_BLOCK_TYPE)['text']
    paragraphs: string[]
    title?: string
}

export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleImageBlock
    | ArticleTextBlock

export const ARTICLE_TYPE = {
    it: 'IT',
    science: 'science',
    economics: 'economics',
} as const
