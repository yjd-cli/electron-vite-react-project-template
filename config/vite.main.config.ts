import { resolve } from 'path'
import { UserConfig } from 'vite';
import { externalizeDepsPlugin } from 'electron-vite'

export default function getMainConfig(): UserConfig {
    return {
        publicDir:'public',
        build: {
            rollupOptions: {
              input: {
                index: resolve(__dirname, '../src/main/index.ts')
              }
            }
        },
        plugins: [externalizeDepsPlugin()]
    }
}