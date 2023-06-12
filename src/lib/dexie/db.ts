import DexieServices from '@/lib/dexie/services';
import DexieBase, { Table } from 'dexie';

export type CookieConsent = {
    id?: number;
};

export type Disclaimer = {
    id?: number;
};

export enum DexieTables {
    COOKIE_CONSENT = 'cookieConsent',
    DISCLAIMER = 'disclaimer',
}

export class Dexie extends DexieBase {
    services: DexieServices;

    cookieConsent!: Table<CookieConsent>;
    disclaimer!: Table<Disclaimer>;

    constructor() {
        super('lockr');

        this.version(1).stores({
            cookieConsent: '++id',
            disclaimer: '++id',
        });

        this.services = new DexieServices(this);
    }
}

export const db = new Dexie();
