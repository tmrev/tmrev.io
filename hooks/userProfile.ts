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

  const { data: tmrevUserData } = useGetUserQuery(payload, { skip: !payload.uid });
  const { data: currentUserData } = useGetUserQuery(
    { uid: user?.uid || "" },
    { skip: !user }
  );

  const isUser = useMemo(() => {
    if (!tmrevUserData || !user) return false;

    if (tmrevUserData.uuid === user.uid) return true;

    return false;
  }, [tmrevUserData, user]);

  useEffect(() => {
    if (!tmrevUserData) return;

    const newData = {
      ...tmrevUserData,
      isUser,
    };

    dispatch(setUserData(newData));
  }, [tmrevUserData, isUser]);

  return {
    currentUser: currentUserData,
    data: tmrevUserData,
    isUser,
    userId: payload.uid,
  };
}
