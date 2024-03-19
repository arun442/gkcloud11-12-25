

import React from 'react';

const RenderHtml = (html) =>{
    const theObj = {__html:html};
    return <div dangerouslySetInnerHTML={theObj} />
}

export default RenderHtml