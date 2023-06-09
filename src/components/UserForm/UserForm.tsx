'use client';

import Avvvatars from 'avvvatars-react';
import { User } from 'next-auth';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import * as yup from 'yup';
import cx from 'classnames';

interface UserFormProps {
    user: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
    const { update: updateSession } = useSession();

    const [isEditing, setEditing] = useState(false);
    const [hasSubmitted, setSubmitted] = useState(false);

    const initialValues = { ...user };
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .typeError('Name must be a string')
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name must be 20 characters or less')
            .required('Name is required'),
        email: yup
            .string()
            .typeError('Email must be a string')
            .email('Email must be a valid email')
            .min(5, 'Email must be at least 5 characters')
            .max(50, 'Email must be 50 characters or less')
            .required('Email is required'),
    });

    function renderToast() {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    }

    async function onSubmit(formValues: FormikValues) {
        await updateSession({ user: formValues });
        renderToast();
        setEditing(false);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, errors, resetForm }) => {
                return (
                    <Form className="flex flex-col gap-10 p-5">
                        <div className="flex flex-col gap-5 items-center md:flex-row md:gap-20">
                            <h1 className="text-2xl font-semibold md:text-4xl">User Details</h1>
                            {isEditing ? (
                                <span className="flex gap-5">
                                    <button
                                        onClick={() => {
                                            resetForm();
                                            setEditing(false);
                                        }}
                                        className="btn btn-primary btn-outline"
                                        disabled={isSubmitting}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={cx('btn btn-success', { loading: isSubmitting })}>
                                        Save
                                    </button>
                                </span>
                            ) : (
                                <button onClick={() => setEditing(true)} className="btn btn-primary">
                                    Edit
                                </button>
                            )}
                        </div>

                        <div className="flex gap-10">
                            <div className="w-1/5 flex justify-center md:justify-start">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt="user_image"
                                        width={100}
                                        height={100}
                                        className="mask mask-squircle w-full"
                                    />
                                ) : (
                                    <Avvvatars value={user.email} size={100} />
                                )}
                            </div>

                            <div className="w-full">
                                <span className="flex flex-col form-control">
                                    <label htmlFor="name" className="label">
                                        Name
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        disabled={!isEditing}
                                        className={cx('input', { 'input-error': errors.name })}
                                    />
                                    <span className="text-error">
                                        <ErrorMessage name="name" />
                                    </span>
                                </span>

                                <span className="flex flex-col form-control">
                                    <label htmlFor="email" className="label">
                                        Email
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        disabled={!isEditing}
                                        className={cx('input', { 'input-error': errors.email })}
                                    />
                                    <span className="text-error">
                                        <ErrorMessage name="email" />
                                    </span>
                                </span>
                            </div>
                        </div>

                        {hasSubmitted && (
                            <div className="toast">
                                <div className="alert alert-success">
                                    <div>
                                        <span>Account updated.</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserForm;
