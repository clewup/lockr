'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseAuthorizationCodeProps {
    isAuthed: boolean;
}

const useAuthorizationCode = ({ isAuthed = false }: UseAuthorizationCodeProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setLoading] = useState(false);

    // if a redirect_uri param has been provided
    // set the cookie for consumption after sign in
    function setRedirectCookie() {
        setLoading(true);
        const redirectUri = searchParams.get('redirect_uri');

        if (redirectUri) {
            setCookie('lockr.redirect-uri', redirectUri, {
                path: '/',
            });
        }
        setLoading(false);
    }
    useEffect(() => {
        setRedirectCookie();
    }, [searchParams]);

    // check if a redirect cookie is present
    // create an authorization code
    // redirect to the uri with the code param
    async function consumeRedirectCookie() {
        const redirectUri = getCookie('lockr.redirect-uri');
        deleteCookie('lockr.redirect-uri');

        if (redirectUri && typeof redirectUri === 'string') {
            setLoading(true);
            const codeResponse = await fetch('/api/auth/code', { method: 'POST' });
            const codeData = await codeResponse.json();
            const code = codeData.authorization_code;

            if (code) {
                router.push(`${redirectUri}?code=${code}`);
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        if (isAuthed) {
            consumeRedirectCookie();
        }
    }, []);

    return {
        isLoading,
    };
};

export default useAuthorizationCode;
