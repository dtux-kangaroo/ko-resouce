import React from 'react';
import BlockLayout  from 'layout/blockLayout';
import About from 'block/about/src'
 //brand-display
 import BrandDisplay from 'block/brand-display/src'
import ChartPie from 'block/chart-pie/src'

const blockRouter=[
    {
        path: '/block',
        layout: BlockLayout,
        component:BrandDisplay
    },
    {
        path: '/block/about',
        layout: BlockLayout,
        component:About
    },
    {
        path: '/block/chart-pie',
        layout: BlockLayout,
        component:ChartPie
    }
]

export default blockRouter;
