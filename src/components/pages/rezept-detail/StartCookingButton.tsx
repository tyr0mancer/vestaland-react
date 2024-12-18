import React, {useContext} from "react";
import {Rezept} from "../../../shared-types/models/Rezept";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../util/state/StateProvider";
import {KochschrittMeta, StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import {Blender} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {customConfirm} from "../../common/ui/ConfirmDialog";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {useLocalStorage} from "../../../util/hooks/useLocalStorage";
import {LocalStorageKey} from "../../../util/config/enums";

interface StartCookingButtonProps {
    rezept: Rezept,
    portionen: number
}

/**
 * TS Doc Info
 * @component StartCookingButton
 */
export function StartCookingButton({rezept, portionen}: StartCookingButtonProps): React.ReactElement {
    const [rezeptHistory, updateHistory] = useLocalStorage<Rezept[]>(LocalStorageKey.REZEPT_HISTORY, [])
    const navigate = useNavigate();

    const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType

    // Confirm falls bereits gekocht wird und das Rezept schon gestartet wurde
    async function startCooking() {

        const result = !rezeptCooking || (kochstatus.aktuellerKochschrittIndex === -1) || (kochstatus.aktuellerKochschrittIndex === kochstatus.meta?.length)
            || await customConfirm({
                title: 'Es wird bereits gekocht.',
                confirmLabel: 'Kochen starten',
                cancelLabel: `${rezeptCooking.name} weiter kochen`,
                label: `${rezeptCooking.name} (Schritt ${kochstatus.aktuellerKochschrittIndex + 1} / ${kochstatus.meta.length})`
            })
        if (!result) return


        /* erstellt KochschritteMeta */
        const kochschritteMeta: KochschrittMeta[] = rezept.kochschritte.reduce((previousValue: any[], currentValue: Kochschritt) => {

            const gesamtdauer = currentValue.gesamtdauer || ((currentValue.arbeitszeit || 0) + (currentValue.wartezeit || 0))
            const arbeitszeit = currentValue.arbeitszeit || 0

            let ratio = null
            if (arbeitszeit && gesamtdauer) ratio = arbeitszeit / gesamtdauer

            const newValue = {
                length: gesamtdauer,
                ratio: ratio,
                aktionen: currentValue.aktionen
            }
            return [...previousValue, newValue]
        }, [])

        dispatch({type: ActionTypes.PUSH_HISTORY, payload: rezept})
        dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: rezept})
        dispatch({
            type: ActionTypes.SET_KOCHSTATUS,
            payload: {aktuellerKochschrittIndex: -1, kochschrittFokusIndex: false, meta: kochschritteMeta}
        })

        // rezeptHistory erweitern oder ersten Eintrag machen, sonst an Anfang stellen
        updateHistory([rezept, ...(rezeptHistory || []).filter(r => r._id !== rezept._id)]);

        navigate('/rezept-cooking')
    }

    return (<IconButton aria-label="startCooking" onClick={startCooking} color={'primary'} size={'small'}>
            <Blender/> Jetzt {portionen} x kochen!
        </IconButton>
    )
}
