import React from 'react';
import {useAuth} from "./AuthProvider";
import {BenutzerRolle} from "./types";

interface RestrictedAreaProps {
  role?: BenutzerRolle;
  children: React.ReactNode;
}

export const RestrictedArea: React.FC<RestrictedAreaProps> = ({role, children}) => {
  const {isAuthorized} = useAuth();
  if (!isAuthorized(role)) {
    return <div>Zugriff verweigert</div>;
  }
  return <>{children}</>;
};
