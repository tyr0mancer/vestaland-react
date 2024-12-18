import React from "react";
import {Button, Dialog, Typography} from "@mui/material";
import {LogoutOutlined} from "@mui/icons-material";
import {useLocalStorage} from "../../../util/hooks/useLocalStorage";
import {LocalStorageKey} from "../../../util/config/enums";
import {useLocation} from "react-router-dom";

/**
 * KochstatusAnzeige Mobile
 */
export function AcceptCookies(): React.ReactElement {

    const [cookieAccepted, updateCookie] = useLocalStorage<boolean>(LocalStorageKey.COOKIES_ACCEPTED)

    const currentPage = useLocation().pathname

    function handleAccept() {
        updateCookie(true)
    }

    const modalNeeded = !cookieAccepted && currentPage != '/'


    return <Dialog open={modalNeeded}>
        <Typography variant="h3" gutterBottom>
            Das übliche...
        </Typography>
        <Typography variant="body1" gutterBottom>
            Diese Seite verwendet ausschließlich technisch notwendige Cookies, um Funktionen wie
            Rezeptspeicherung, Einkaufslisten, Essenspläne und Login zu ermöglichen.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Es werden keine Metadaten
            oder Tracking-Informationen erfasst
        </Typography>

        <Button onClick={handleAccept} startIcon={<LogoutOutlined/>} color={'primary'}
                variant={'outlined'}>Damit bin ich einverstanden.</Button>
    </Dialog>
}

