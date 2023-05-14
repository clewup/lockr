'use client';

import { db, DexieTables } from '@/lib/dexie/db';
import { useEffect, useState } from 'react';

const CookieBanner = () => {
    const [isRendered, setRendered] = useState(false);

    async function checkCookieConsent() {
        const isExisting = await db.services.check(DexieTables.COOKIE_CONSENT);
        setRendered(!isExisting);
    }
    useEffect(() => {
        checkCookieConsent();
    }, []);

    async function updateCookieConsent(isConsenting: boolean) {
        await db.services.add(DexieTables.COOKIE_CONSENT, { isConsenting: isConsenting });
        setRendered(false);
    }

    if (!isRendered) {
        return null;
    }

    return (
        <div className="fixed bottom-0 h-[10vh] flex flex-col items-center justify-center w-screen bg-black text-white gap-3">
            <p>
                We value your privacy. We use cookies to enhance your browsing experience and to improve our service. By
                clicking &apos;Accept All&apos;, you consent to our use of cookies.
            </p>
            <span className="flex gap-20">
                <button onClick={() => updateCookieConsent(false)}>Reject All</button>
                <button onClick={() => updateCookieConsent(true)}>Accept All</button>
            </span>
        </div>
    );
};

export default CookieBanner;
