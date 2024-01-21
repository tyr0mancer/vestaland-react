import React from "react";
import {ZodObject} from "zod";
import {CustomArrayHelper} from "./CustomFieldArray";

/**
 * Props für CustomCheckbox Komponente.
 */
type CustomCheckboxProps = {
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,
  /**
   * Optionale Beschriftung der Checkbox.
   */
  label: string

  color?: string,
}


/**
 * Props für die CustomAutocomplete Komponente.
 *
 * @typeParam T - Der Typ der Elemente in der Autocomplete-Liste.
 */
type CustomAutocompleteProps<T> = {
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,

  /**
   * Optionale Beschriftung des Autocomplete-Feldes.
   */
  label?: string,

  /**
   * Eine Funktion, die den Anzeigetext für jede Option im Autocomplete-Feld generiert.
   *
   * @param s - Das Element vom Typ T, für das der Anzeigetext generiert wird.
   * @returns Der Anzeigetext für das Element.
   */
  getLabel: (s: T) => string,

  /**
   * Der Eigenschaftsname des Identifikators in Typ T, verwendet um Optionen in der Autocomplete-Liste zu vergleichen.
   */
  idProp: keyof T,

  /**
   * Eine optionale Funktion für useQuery zur asynchronen Ermittlung der Autocomplete-Optionen
   *
   * @param id - Optionaler Parameter (aus Suchtextfeld)
   */
  queryFn?: (id?: string) => Promise<T[]>,

  /**
   * queryKey für useQuery
   */
  queryKey?: string


  /**
   * Eine Funktion, die ein neues Element des Typs T erstellt und hinzufügt.
   *
   * @param value - Der Wert des neuen Elements.
   * @returns Ein Promise, das das hinzugefügte Element zurückgibt.
   */
  insertFn: (value: T) => Promise<T>,

  /**
   * Eine optionale Callback-Funktion, die bei Änderung des Wertes aufgerufen wird.
   *
   * @param value - Der neue oder geänderte Wert oder null, wenn kein Wert ausgewählt ist.
   */
  onChange?: (value: T | null) => void,

  /**
   * Optionale Größe des Autocomplete-Feldes.
   */
  size?: 'small' | 'medium',

  /**
   * Ob die Auswahl automatisch erfolgen soll.
   */
  autoSelect?: boolean,

  /**
   * Ob das Feld beim Initialisieren automatisch Fokus erhalten soll.
   */
  autoFocus?: boolean,

  /**
   * Ob das Feld die volle Breite des Elternelements einnehmen soll.
   */
  fullWidth?: boolean,

  /**
   * Ein optionaler Standardwert für einen neuen Eintrag.
   */
  newValueDefault?: T,

  /**
   * Ein optionales Zod-Schema, verwendet zur Überprüfung der Formulardaten.
   */
  validationSchema?: ZodObject<any>


  /**
   * Eine optionale Render Funktion um eine Komponente zu Erzeugen, die zur Erstellung eines neuen Eintrags angezeigt wird.
   */
  newEntryRender?: (inputValue: string) => React.ReactElement,

}


/**
 * Props für die CustomFieldArray Komponente.
 *
 * @typeParam T - Der Typ der Elemente in der FieldArray.
 */
type CustomFieldArrayProp<T> = {
  newValue?: T,
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,

  /**
   * Renderfunktion
   */
  render: ((props: CustomArrayHelper, value: T[]) => React.ReactNode)

  TypeClass?: any
}


/**
 * Props für die CustomTextField Komponente.
 */
type CustomTextFieldProps = {
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,

  /**
   * Optionale Beschriftung des Textfeldes.
   */
  label?: string,

  /**
   * Der Typ des Eingabefeldes. Kann 'text', 'number', 'password' oder 'email' sein.
   */
  type?: 'text' | 'number' | 'email' | 'password',

  /**
   * Soll das Formik Feld als <FastField /> statt <Fast /> implementiert werden?
   */
  fastField?: boolean

  size?: 'small' | 'medium',
}


/**
 * Props für die CustomSelect Komponente.
 *
 * @typeParam T - Der Typ der Elemente in der Options-Liste.
 */
type CustomSelectProps<T> = {
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,

  /**
   * Optionales Label für das Select-Feld.
   */
  label?: string,

  /**
   * Optionales Array von Optionen, die im Select-Feld angezeigt werden sollen.
   */
  options?: T[],

  /**
   * Optionale Funktion, um den Schlüssel aus jedem Optionselement zu extrahieren.
   *
   * @param element - Das aktuelle Element aus der Options-Liste.
   * @returns Ein String, der den Schlüssel des Elements darstellt.
   */
  getKey?: (element: T) => string,

  /**
   * Optionale Funktion, um das Anzeigelabel aus jedem Optionselement zu extrahieren.
   *
   * @param element - Das aktuelle Element aus der Options-Liste.
   * @returns Ein String, der das Anzeigelabel des Elements darstellt.
   */
  getLabel?: (element: T) => string,

  /**
   * Optional, ob Mehrfachauswahl im Select-Feld erlaubt sein soll.
   */
  multiple?: boolean,

  /**
   * Optionale Größe des Feldes.
   */
  size?: 'small' | 'medium'
}


/**
 * Props für die CustomFileDropper Komponente.
 *
 * @typeParam T - Der Typ des Objekts, das nach dem Hochladen eines Files zurückgegeben wird.
 */
type CustomFileDropperProps<T> = {
  /**
   * Der Name des Formularfeldes, verwendet von Formik zur Handhabung der Formulardaten.
   */
  name: string,

  /**
   * Optionales Label für den FileDropper.
   */
  label?: string,

  /**
   * Funktion zum Hochladen des Files. Sollte ein Promise zurückgeben, das das Objekt des Typs T liefert.
   *
   * @param file - Das hochzuladende File.
   * @returns Ein Promise, das das Objekt des Typs T zurückgibt.
   */
  uploadFn: (file: File) => Promise<T>,
}
