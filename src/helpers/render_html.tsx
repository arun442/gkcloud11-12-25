

import React from 'react';

const RenderHtml = (html:any) =>{
    const theObj = {__html:html};
    return <div dangerouslySetInnerHTML={theObj} />
}

export default RenderHtml