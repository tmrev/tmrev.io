import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useAuth } from "@/provider/authUserContext";
import { useGetUserQuery } from "@/redux/api";
import { setUserData } from "@/redux/slice/userProfileSlice";
import { useAppDispatch } from ".";

export default function useProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const payload = useMemo(() => {
    if (typeof router.query.id === "string") {
      return {
        uid: router.query.id,
      };
    }

    return {
      uid: "",
    };
  }, [router]);

  const { data } = useGetUserQuery(payload, { skip: !payload.uid });
  const { data: currentUserData } = useGetUserQuery(
    { uid: user?.uid || "" },
    { skip: !user }
  );

  const isUser = useMemo(() => {
    if (!data || !user) return false;

    if (data.uuid === user.uid) return true;

    return false;
  }, [data, user]);

  useEffect(() => {
    if (!data) return;

    const newData = {
      ...data,
      isUser,
    };

    dispatch(setUserData(newData));
  }, [data, isUser]);

  return {
    currentUser: currentUserData,
    data,
    isUser,
    userId: payload.uid,
  };
}
