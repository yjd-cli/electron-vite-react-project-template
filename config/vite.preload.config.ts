import { resolve } from 'path'
import { UserConfig } from 'vite';
import { externalizeDepsPlugin } from 'electron-vite'

export default function getPreloadConfig(): UserConfig {
    return {
        publicDir:'public',
        build: {
            rollupOptions: {
              input: {
                index: resolve(__dirname, '../src/preload/index.ts')
              }
            }
        },
        plugins: [externalizeDepsPlugin()]
    }
}