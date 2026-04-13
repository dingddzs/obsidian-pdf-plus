/**
 * PDF++ Internationalization (i18n) System
 *
 * Architecture:
 * - `src/locales/en.json` — English (base language, all keys must exist here)
 * - `src/locales/zh.json` — Chinese (Simplified)
 * - `src/locales/ja.json` — Japanese (from source)
 *
 * Translation lookup order:
 *   1. Current locale JSON (e.g. zh)
 *   2. English JSON (fallback)
 *   3. The key itself (last resort)
 */

import { Platform } from 'obsidian';
import * as en from './locales/en.json';
import * as zh from './locales/zh.json';
// import ja from './locales/ja.json';

const locales: Record<string, Record<string, string>> = {
    en,
    zh,
    // ja,
};

let currentLocale = 'en';

/** Detect Obsidian interface language */
function detectLocale(): string {
    try {
        // Access Obsidian's internal settings
        // @ts-ignore
        const lang = window.localStorage.getItem('language');
        if (lang && locales[lang]) return lang;

        // Obsidian 1.6+ uses a different storage key
        // @ts-ignore
        const lang2 = window.localStorage.getItem('app-settings:language');
        if (lang2 && locales[lang2]) return lang2;
    } catch (e) {
        // Ignore errors
    }

    // Check app language via Obsidian's app instance if available
    // We'll rely on the fallback below

    return 'en';
}

/** Initialize the i18n system. Call this from the plugin's onload(). */
export function initI18n(): void {
    const detected = detectLocale();
    if (locales[detected]) {
        currentLocale = detected;
    } else {
        currentLocale = 'en';
    }
}

/** Get the current locale code */
export function getLocale(): string {
    return currentLocale;
}

/** Set the locale manually (e.g., from plugin settings) */
export function setLocale(locale: string): void {
    if (locales[locale]) {
        currentLocale = locale;
    }
}

/**
 * Translate a string key.
 *
 * @param key      The translation key (e.g. 'settings.default-zoom-level')
 * @param params   Optional parameters for template interpolation.
 *                 If the translation contains `${var}`, pass { var: "value" }.
 *                 If the translation contains a bare `$` followed by a property name,
 *                 the params object should contain that property.
 *                 For simple substitutions without a template engine,
 *                 we support `${KEY}` patterns.
 *
 * Examples:
 *   t('settings.general')                              → "通用"
 *   t('settings.hover-with-mod', { modKey: 'Ctrl' })   → "按住 Ctrl 悬停..."
 *   t('settings.page-count', { count: 5 })            → "共 5 页"
 */
export function t(key: string, params?: Record<string, string | number>): string {
    const locale = locales[currentLocale] ?? locales['en'] ?? {};
    const fallback = locales['en'] ?? {};

    let text = (locale[key] ?? fallback[key] ?? key) as string;

    // Template variable substitution: ${VAR} → params[VAR]
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\\$\\\{${k}\\\}`, 'g'), String(v));
        }
    }

    return text;
}

/**
 * Shorthand for text that may be a translation key or already translated.
 * If the value is a known key, translate it; otherwise return as-is.
 */
export function tt(value: string, params?: Record<string, string | number>): string {
    if (!value) return value;
    // If the value looks like a key (snake-case with no spaces), try translate
    if (value.includes('-') || value.includes('_')) {
        const translated = t(value, params);
        // If translation equals key, value wasn't a key — return original
        if (translated !== value) return translated;
    }
    // Fall back to returning the value with params substitution if needed
    if (params) {
        let text = value;
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\\$\\\{${k}\\\}`, 'g'), String(v));
        }
        return text;
    }
    return value;
}

/** Shortcut for `t()` — used throughout the codebase */
export const _ = t;
