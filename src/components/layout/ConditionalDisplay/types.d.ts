import React from "react";
import {BenutzerRolle} from "../../../shared-types/enum";

type ConditionalDisplayProps = {
  children?: React.ReactNode,
  restricted?: true | BenutzerRolle[]
  status?: {error?: any, isLoading?: boolean, saving?: boolean}
  loginComponent?: React.ReactNode,
}
