'use client';

import useApi from '@/lib/common/hooks/useApi/useApi';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseAuthorizationCodeProps {
    isAuthed: boolean;
}

const useAuthorizationCode = ({ isAuthed = false }: UseAuthorizationCodeProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { post } = useApi();

    const [isLoading, setLoading] = useState(false);

    // if a redirect_uri and application_id params have been provided
    // set the cookies for consumption after sign in
    function setAuthorizationCookies() {
        setLoading(true);
        const redirectUri = searchParams.get('redirect_uri');
        const applicationId = searchParams.get('application_id');

        if (redirectUri && applicationId) {
            setCookie('lockr.redirect-uri', redirectUri, {
                path: '/',
            });
            setCookie('lockr.application-id', applicationId, {
                path: '/',
            });
        }
        setLoading(false);
    }
    useEffect(() => {
        setAuthorizationCookies();
    }, [searchParams]);

    // check if a redirect and application id cookies are present
    // create an authorization code
    // redirect to the uri with the code param
    async function consumeAuthorizationCookies() {
        const redirectUri = getCookie('lockr.redirect-uri');
        const applicationId = getCookie('lockr.application-id');
        deleteCookie('lockr.redirect-uri');
        deleteCookie('lockr.application-id');

        if (redirectUri && typeof redirectUri === 'string' && applicationId && typeof applicationId === 'string') {
            setLoading(true);

            const { authorization_code: code } = await post<{ authorization_code: string }>('/api/auth/code', {
                application_id: applicationId,
            });

            if (code) {
                router.push(`${redirectUri}?code=${code}`);
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        if (isAuthed) {
            consumeAuthorizationCookies();
        }
    }, []);

    return {
        isLoading,
    };
};

export default useAuthorizationCode;
