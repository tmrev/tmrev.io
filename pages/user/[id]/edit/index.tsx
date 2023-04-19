import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import HeaderText from '@/components/common/typography/headerText';
import { firebaseAdmin } from '@/config/firebaseAdmin';
import { User } from '@/models/tmrev';
import { useAuth } from '@/provider/authUserContext';
import { tmrevAPI } from '@/redux/api';

interface DefaultValues {
  bio: string;
  firstName: string;
  lastName: string;
  link: {
    title: string;
    url: string;
  } | null;
  location: string;
  public: boolean;
}

interface Props extends User {
  id: string;
}

const schema = yup.object().shape({
  bio: yup.string().max(250, 'The max number of characters is 250.'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  link: yup
    .object()
    .shape({
      title: yup.string().required('A link title is required'),
      url: yup
        .string()
        .url('A link must have a valid url')
        .required('Url is required'),
    })
    .nullable(true),
  location: yup.string(),
  public: yup.boolean(),
});

const UserEdit: NextPage<Props> = ({
  bio,
  firstName,
  lastName,
  link,
  location,
  public: publicAccount,
  id,
}: Props) => {
  const [hasLink, setHasLink] = useState(!!link);
  const router = useRouter();
  const { user } = useAuth();
  const defaultValues: DefaultValues = useMemo(
    () => ({
      bio,
      firstName,
      lastName,
      link,
      location,
      public: publicAccount,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: DefaultValues) => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      await axios.put(`${tmrevAPI}/user`, data, {
        headers: {
          authorization: token,
        },
      });
      router.push(`/user/${id}/preview`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-tmrev-gray-dark p-4 w-1/2 space-y-4 text-white rounded">
        <HeaderText>Edit Profile</HeaderText>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-2 ">
            <Input
              className="px-3 py-1 border rounded"
              label="First Name"
              {...register('firstName')}
              defaultValue={defaultValues.firstName}
              error={errors.firstName}
              placeholder="First Name"
              type="name"
            />
            <Input
              className="px-3 py-1 border rounded"
              label="Last Name"
              {...register('lastName')}
              error={errors.firstName}
              placeholder="Last Name"
              type="name"
            />
          </div>
          <Input
            className="px-3 py-1 border rounded"
            label="Location"
            {...register('location')}
            error={errors.location}
            placeholder="Location"
            type="text"
          />
          <Input
            className="px-3 py-1 border rounded"
            label="Bio"
            {...register('bio')}
            error={errors.bio}
            placeholder="Bio"
            type="text"
            variant="textarea"
          />
          {hasLink && (
            <div className="divide-y space-y-2">
              <div className="flex items-center">
                <p className=" font-semibold text-md flex-grow">Link</p>
                <Button
                  title="remove link"
                  variant="icon"
                  onClick={() => {
                    setValue('link', null);
                    setHasLink(false);
                  }}
                >
                  <span className="material-icons-outlined">cancel</span>
                </Button>
              </div>
              <div className=" pl-2 pt-2 space-y-2">
                <Input
                  className="px-3 py-1 border rounded"
                  label="Title"
                  {...register('link.title')}
                  error={(errors as any).link?.title}
                  placeholder="Title"
                  type="text"
                />
                <Input
                  className="px-3 py-1 border rounded"
                  label="Url"
                  {...register('link.url')}
                  error={(errors as any).link?.url}
                  placeholder="https://..."
                  type="text"
                />
              </div>
            </div>
          )}
          {!hasLink && (
            <Button
              className="w-full"
              type="submit"
              variant="secondary"
              onClick={() => {
                setValue('link', null);
                setHasLink(true);
              }}
            >
              Add Link
            </Button>
          )}
          <Button className="w-full !mt-12" type="submit" variant="primary">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const cookies = nookies.get(context);

    if (!id || typeof id !== 'string') throw new Error('no id');
    if (!cookies.token) throw new Error('no token');

    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (user.uid !== id) throw new Error('user can not access this page');

    const userRes = await fetch(`${tmrevAPI}/user/full/${id}`);

    const userData = (await userRes.json()) as User;

    return {
      props: {
        ...userData,
        id,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
