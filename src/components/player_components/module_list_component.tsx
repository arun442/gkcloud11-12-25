
import React, { useEffect, useState } from 'react';

const ModuleList = ({ currentItem, moduleId, modules: data, setMouduleId, onSelectItem }: { currentItem: any, moduleId: any, modules: any, setMouduleId: any, onSelectItem: any }) => {
    console.log("modules", moduleId, currentItem);
    const [modules, setModules] = useState([]);
    useEffect(() => {
        console.log("its rerendering or not");
        setModules(data);
    }, [moduleId]);

    return (
        <div className="bg-dark_blue text-white border-text_grey_one p-4 h-full overflow-auto">
            <div className='flex justify-between items-center'>
                <h2 className='text-white mb-2 font-medium text-sm'>Course Content</h2>
            </div>

            {modules.map((module: any, index: any) => (
                <div key={module.moduleId} >
                    <h3 className='text-white font-medium text-sm'>Module {index + 1}.{module.name}</h3>
                    <p className='text-white text-sm'>{module.moduleDescription}</p>
                    <ul>
                        {module.moduleItems ? module.moduleItems.map((item: any, itemIndex: any) => (
                            <li className='flex gap-2 my-2' key={item.moduleItemId
                            }>

                                <input
                                    type="checkbox"
                                    checked={parseInt(`${module.moduleId}${item.moduleItemId}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`) ? true : false}

                                />
                                <button className='flex-1 text-white font-normal text-xs text-start' onClick={() => {
                                    console.log(parseInt(`${module.moduleId}${item.moduleItemId}`), parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`))
                                    if (parseInt(`${module.moduleId}${item.moduleItemId}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`)) {
                                        setMouduleId(module.moduleId);
                                        onSelectItem(item)
                                    }

                                }}>{itemIndex + 1}.{item.moduleItemName}</button>


                            </li>
                        )) : module.details.map((item: any, itemIndex: any) => (
                            <li className='flex gap-2 my-2' key={item.id
                            }>

                                <input
                                    type="checkbox"
                                    checked={parseInt(`${module.moduleId}${item.id}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`) ? true : false}
                                />
                                <button className='flex-1 text-white font-normal text-xs text-start' onClick={() => {
                                    console.log(parseInt(`${module.moduleId}${item.id}`), parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`))
                                    if (parseInt(`${module.moduleId}${item.id}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`)) {
                                        setMouduleId(module.moduleId);
                                        onSelectItem(module.details[0]);
                                    }

                                }}>{itemIndex + 1}.{item.mode == "quiz" ? "Quiz" : item.moduleItemName}</button>


                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ModuleList;
