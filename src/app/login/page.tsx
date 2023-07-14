'use client';

import constants from '@/constants/constants';
import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRightOnRectangleIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { SocialIcon } from 'react-social-icons';
import * as yup from 'yup';
import cx from 'classnames';

export default function Login() {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: false });
    const searchParams = useSearchParams();
    const verifySearchParam = searchParams.get('verify');

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
            <div className="w-1/3 rounded-md bg-white p-10 flex flex-col justify-center items-center">
                <m.span
                    variants={{
                        hidden: { y: -25, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="mb-10">
                    <span className="flex gap-2 items-center">
                        <Image
                            src="https://res.cloudinary.com/dliog6kq6/image/upload/v1689286597/locker-dynamic-gradient_lle2ji.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                        <h1 className="text-5xl font-roboto font-bold">LOCKR</h1>
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
                                        className={cx('input', { 'input-error': errors.email })}
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

            <input type="checkbox" id="my-modal" className="modal-toggle" checked={!!verifySearchParam} />
            <div className="modal">
                <div className="modal-box flex flex-col text-center">
                    <h3 className="font-bold text-4xl">Check your emails!</h3>

                    <span className="py-5 text-xl flex flex-col items-center gap-2">
                        <EnvelopeOpenIcon height={50} width={50} className="text-primary" />
                        <p>A link that you can use to login has been sent to your email address.</p>
                    </span>
                </div>
            </div>
        </main>
    );
}
