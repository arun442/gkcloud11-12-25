
import React from 'react';

const ModuleList = ({ modules, setMouduleId, onSelectItem }: { modules: any, setMouduleId: any, onSelectItem: any }) => {
    console.log("modules", modules);
    return (
        <div className="bg-dark_blue border-text_grey_one p-4 h-full overflow-auto">
            <div className='flex justify-between items-center'>
                <h2 className='text-white mb-2 font-medium text-sm'>Course Content</h2>
            </div>

            {modules.map((module: any, index: any) => (
                <div key={module.moduleId} >
                    <h3 className='text-white font-medium text-sm'>Module {index + 1}.{module.name}</h3>
                    <p>{module.moduleDescription}</p>
                    <ul>
                        {module.moduleItems ? module.moduleItems.map((item: any, itemIndex: any) => (
                            <li className='flex gap-2 my-2' key={item.moduleItemId
                            }>

                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => { }}

                                />
                                <button className='flex-1 text-white font-normal text-xs text-start' onClick={() => {
                                    setMouduleId(module.moduleId);
                                    onSelectItem(item)
                                }}>{itemIndex + 1}.{item.moduleItemName}</button>


                            </li>
                        )) : module.details.map((item: any, itemIndex: any) => (
                            <li className='flex gap-2 my-2' key={item.moduleItemId
                            }>

                                <input
                                    type="checkbox"
                                    checked={false}
                                // onChange={() => handleAnswerChange(currentQuestion.id, answer)}
                                />
                                <button className='flex-1 text-white font-normal text-xs text-start' onClick={() => {
                                    setMouduleId(module.moduleId);
                                    onSelectItem(module.details[0]);
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
