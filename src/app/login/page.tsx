'use client';

import Logo from '@/components/Logo/Logo';
import constants from '@/constants/constants';
import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { SocialIcon } from 'react-social-icons';
import * as yup from 'yup';
import cx from 'classnames';

export default function Login() {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: false });

    useEffect(() => {
        if (session && !isLoading) {
            redirect('/');
        }
    }, [isLoading]);

    if (session) {
        return null;
    }

    function signInWithEmail(formValues: FormikValues) {
        signIn('email', { email: formValues.email, callbackUrl: constants.APP_URL });
    }

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .typeError('Email must be a string')
            .email('Email must be a valid email')
            .min(5, 'Email must be at least 5 characters')
            .max(50, 'Email must be 50 characters or less')
            .required('Email is required'),
    });

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="w-1/3 shadow-xl rounded-2xl p-10 flex flex-col justify-center items-center">
                <m.span
                    variants={{
                        hidden: { y: -25, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="mb-10">
                    <span className="flex gap-2 items-center">
                        <Logo width={40} height={40} className="fill-neutral" />
                        <h1 className="text-5xl font-roboto text-primary font-bold">Lockr</h1>
                    </span>
                </m.span>

                <Formik initialValues={{ email: '' }} onSubmit={signInWithEmail} validationSchema={validationSchema}>
                    {({ errors }) => {
                        return (
                            <Form className="flex flex-col w-72">
                                <div className="form-control gap-2">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className={cx('input shadow-xl', { 'input-error': errors.email })}
                                    />
                                    <span className="text-error">
                                        <ErrorMessage name="email" />
                                    </span>
                                    <button type="submit" className="btn btn-primary">
                                        Login <ArrowRightOnRectangleIcon width={20} height={20} className="ml-2" />
                                    </button>
                                </div>
                                <span className="divider">or</span>
                                <span className="flex justify-center">
                                    <SocialIcon
                                        network="google"
                                        onClick={() => signIn('google', { callbackUrl: constants.APP_URL })}
                                        className="cursor-pointer"
                                    />
                                </span>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </main>
    );
}
