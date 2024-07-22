
import ErrorBoundary from '@/helpers/error_boundary';
import React, { useEffect, useState } from 'react';

const ModuleList = ({ currentItem, moduleId, modules: data, setMouduleId, onSelectItem }: { currentItem: any, moduleId: any, modules: any, setMouduleId: any, onSelectItem: any }) => {
  
    const [modules, setModules] = useState([]);
    useEffect(() => {
     
        setModules(data);
    }, [moduleId]);

    return (
        <div className="bg-dark_blue text-white border-text_grey_one p-4 h-full overflow-auto">
            <div className='flex justify-between items-center'>
                <h2 className='text-white mb-2 font-medium text-sm'>Course Content</h2>
            </div>
            <ErrorBoundary>
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
            </ErrorBoundary>
        </div>
    );
};

export default ModuleList;
