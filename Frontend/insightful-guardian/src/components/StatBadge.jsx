import React from 'react';

const StatBadge = ({ status }) => {
    const config = {
        High: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
        Medium: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
        Low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    };

    const style = config[status] || config.Low;

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}>
            {status}
        </span>
    );
};

export default StatBadge;
