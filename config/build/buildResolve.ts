import path from 'path';
// in case you run into any typescript error when configuring `devServer`
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types/config';

export function buildResolvers({ paths }: BuildOptions) : webpack.ResolveOptions {
    return  {
        alias: {
            src: paths.src,
            '@': paths.src,
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
    }
}