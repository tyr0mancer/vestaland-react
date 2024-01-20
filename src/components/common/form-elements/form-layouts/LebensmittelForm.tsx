import React from "react";

type LebensmittelFormProps = {
  input?: string
}

/**
 * TS Doc Info
 * @component LebensmittelForm
 */
export function LebensmittelForm({input}: LebensmittelFormProps): React.ReactElement {
  return (<>LebensmittelForm - {input}</>)
}
