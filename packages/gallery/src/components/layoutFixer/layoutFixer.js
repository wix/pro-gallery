import React from 'react';
import { isPrerenderMode } from 'pro-gallery-lib';

export const LayoutFixer = (props) => {
    // console.log('[LAYOUT FIXER] rendering', isPrerenderMode(), props);
    return (props.layoutFixerBundleUrl) ? (
        <div 
            id={"layout-fixer-" + props.domId}
            key={"layout-fixer-" + props.domId}
            style={{display:'none'}}
        >
            {isPrerenderMode() ? (
                <>
                    <link rel="preload" href={props.layoutFixerBundleUrl} as="script"/>
                    <script dangerouslySetInnerHTML={{__html: `console.log("[LAYOUT FIXER] Start (first script loaded)")`}}></script>
                    <script dangerouslySetInnerHTML={{__html: `console.time("[LAYOUT FIXER] Done")`}}></script>
                    <script async type="module" src={props.layoutFixerBundleUrl}></script>
                    <layout-fixer 
                        domId={props.domId}
                        items={JSON.stringify(props.items)}
                        styles={JSON.stringify(props.styles)}
                    ></layout-fixer>
                </>
            ) : null}
        </div>
    ) : null;
}