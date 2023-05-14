'use client';

import { User } from 'next-auth';
import { Field, Form, Formik, FormikValues } from 'formik';
import Image from 'next/image';
import { FC, useState } from 'react';

interface UserFormProps {
    user: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
    const [isEditing, setEditing] = useState(false);
    const initialValues = { ...user };

    function onSubmit(formValues: FormikValues) {}

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                        </span>

                        <span className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" disabled={!isEditing} />
                        </span>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserForm;
