import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url) => {
  const { data } = await axios.get(url);
  return {
    user: data?.user || null,
  };
};

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR("/api/profile", fetcher);
  // console.log("DATA: ", data);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && (!hasUser || error)) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  if (error) {
    return { error: error };
  } else if (finished && hasUser) {
    return { hasUser: true, user: user, done: true };
  } else if (finished && !hasUser) {
    return { hasUser: false, done: true };
  } else if (!finished) {
    return { hasUser: false, done: false };
  } else {
    return { hasUser: false };
  }
}
