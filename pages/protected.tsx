import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import React from "react";
export default function Index({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return <div>{JSON.stringify(user)}</div>;
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const session = await getSession({ req });

  return {
    props: {
      user: session?.user,
    },
  };
};
