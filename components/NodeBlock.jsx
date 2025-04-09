    import React from 'react';
    import { motion } from 'framer-motion';

    const NodeBlock = ({
    value,
    address,
    nextAddress,
    prevAddress,
    isHead,
    isTail,
    isDoubly,
    isCircular,
    }) => {
        const displayNext = isTail && isCircular ? nextAddress : nextAddress || 'NULL';


    return (
        <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        layout
        >
        <div className="flex flex-col items-center">
            {isHead && <div className="text-green-600 text-xs mb-1 font-bold">HEAD</div>}

            <div className="flex rounded overflow-hidden shadow-md border border-gray-300">
            {isDoubly && (
                <div className="bg-blue-100 p-3 w-28 flex flex-col items-center justify-center text-xs text-gray-700 border-r">
                <div>Prev</div>
                <div className="font-mono">{prevAddress || 'NULL'}</div>
                </div>
            )}
            <div className="bg-white text-black p-3 w-16 flex items-center justify-center font-semibold border-r">
                {value}
            </div>
            <div className="bg-green-100 p-3 w-28 flex flex-col items-center justify-center text-xs text-gray-700">
                <div>Next</div>
                <div className="font-mono">{displayNext}</div>
            </div>
            </div>

            {isTail && <div className="text-red-600 text-xs mt-1 font-bold">TAIL</div>}
            <div className="text-[10px] text-gray-500 mt-1 font-mono">[{address}]</div>
        </div>

        <div className="text-blue-500 text-lg">
            {nextAddress && (isCircular && isTail ? '↩️' : isDoubly ? '⇄' : '➡️')}
        </div>
        </motion.div>
    );
    };

    export default NodeBlock;
