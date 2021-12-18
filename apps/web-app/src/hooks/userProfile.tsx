import * as React from 'react';

import assignDefaultValues from '../helpers/assignDefaultValues';

//
// LocalStorage helpers
//
interface UserProfile {
  name: string | null;
}

const LOCAL_STORAGE_KEY = 'shifumi@user-profile';

const DEFAULT_USER_PROFILE: UserProfile = {
  name: null,
};

function getUserProfileFromStorage(): UserProfile {
  const userProfileJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!userProfileJson) {
    return DEFAULT_USER_PROFILE;
  }

  const userProfile = JSON.parse(userProfileJson) as UserProfile;
  return assignDefaultValues(userProfile, DEFAULT_USER_PROFILE);
}

function saveUserProfileInStorage(userProfile: UserProfile) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
}

//
// Context
//
interface UserProfileContext {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
}

const USER_PROFILE_CONTEXT = React.createContext<
  UserProfileContext | undefined
>(undefined);

//
// Provider
//
interface ProviderProps {}

export function UserProfileProvider(
  props: React.PropsWithChildren<ProviderProps>,
) {
  const { children } = props;

  const [userProfile, setUserProfile] = React.useState(() =>
    getUserProfileFromStorage(),
  );

  return (
    <USER_PROFILE_CONTEXT.Provider
      value={{
        userProfile,
        setUserProfile: (newUserProfile: UserProfile) => {
          saveUserProfileInStorage(newUserProfile);
          setUserProfile(newUserProfile);
        },
      }}
    >
      {children}
    </USER_PROFILE_CONTEXT.Provider>
  );
}

//
// Hook
//
export function useUserProfile() {
  const context = React.useContext(USER_PROFILE_CONTEXT);
  if (!context) {
    throw new Error(
      '"useUserProfile" can only be used under "UserProfileProvider"',
    );
  }

  return context;
}
