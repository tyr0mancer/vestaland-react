import React from "react";
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";


/**
 * DataSync Component
 * @component Einkaufsliste
 */
export function EinkaufslisteView(): React.ReactElement {
  return (<ConditionalDisplay restricted>



  </ConditionalDisplay>)
}

/*

type ZutatChildProps = {
  name?: string,
  handleDelete?: () => void,
  handleInsert?: () => void,
  handleMoveUp?: () => void,
  handleMoveDown?: () => void,

}

function ZutatChild({
                      name,
                      handleDelete,
                      handleInsert,
                      handleMoveDown,
                      handleMoveUp
                    }: ZutatChildProps): React.ReactElement {
  const [{value}] = useField<Zutat>(name || '')


  return (<Box>
    <CustomTextField name={`${name}[menge]`} label={'Menge'}/>
    <CustomSelect<Einheit>
      name={`${name}[einheit]`}
      label={'Einheit'}
      options={Object.values(Einheit)}
      getLabel={einheit => EinheitProperties[einheit].fullName}
    />

    <CustomFileDropper
      name={'bild'}
      label={'Rezept-Bild'}
      uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
    />


    <CustomAutocomplete<Lebensmittel>
      autoFocus
      size={'medium'}
      autoSelect={true}

      name={`${name}[lebensmittel]`}
      idProp={'_id'}
      getLabel={(e) => e.name}
      queryFn={(input?: string) => APIService.search<Lebensmittel>('lebensmittel', {name: input})}
      onChange={v => (!!handleDelete && !v) ? handleDelete() : {}}

      label="Lebensmittel"
      newEntryFormComponent={<LebensmittelForm/>}
      newValueDefault={new Lebensmittel()}
      insertFn={(value: Lebensmittel) => APIService.post<Lebensmittel>('lebensmittel', value)}
      validationSchema={LebensmittelSchema}
    />

    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={handleInsert}>insert</Button>
    <Button onClick={handleMoveDown}>down</Button>
    <Button onClick={handleMoveUp}>up</Button>
    <pre>{JSON.stringify(value)}</pre>
  </Box>)
}
*/

