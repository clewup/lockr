'use client';

import { User } from 'next-auth';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import * as yup from 'yup';

interface UserFormProps {
    user: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
    const { update } = useSession();

    const [isEditing, setEditing] = useState(false);

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

    async function onSubmit(formValues: FormikValues) {
        await update({ user: formValues });
        setEditing(false);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {() => {
                return (
                    <Form className="flex flex-col gap-5">
                        <div className="flex gap-20">
                            <h1 className="text-3xl">User Details</h1>
                            {isEditing ? (
                                <span className="flex gap-10">
                                    <button onClick={() => setEditing(false)}>Cancel</button>
                                    <button type="submit">Save</button>
                                </span>
                            ) : (
                                <button onClick={() => setEditing(true)}>Edit</button>
                            )}
                        </div>

                        <Image
                            src={user.image || ''}
                            alt="user_image"
                            width={100}
                            height={100}
                            className="rounded-[50%]"
                        />

                        <span className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <Field id="name" name="name" disabled={!isEditing} />
                            <ErrorMessage name="name" />
                        </span>

                        <span className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" disabled={!isEditing} />
                            <ErrorMessage name="email" />
                        </span>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserForm;
