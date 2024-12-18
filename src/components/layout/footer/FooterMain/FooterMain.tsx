import React from "react";
import {FooterMainDesktop} from "./FooterMainDesktop";
import {FooterMainMobile} from "./FooterMainMobile";
import {AcceptCookies} from "../../../common/ui/AcceptCookies";


export function FooterMain() {
    return (<>
        <AcceptCookies/>
        <FooterMainMobile/>
        <FooterMainDesktop/>
    </>);

}
