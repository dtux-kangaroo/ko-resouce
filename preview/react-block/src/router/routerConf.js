/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-26 12:00:39
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-28 16:20:25
 */
import React from 'react';
import docLayout  from 'layout/docLayout';
import Doc from '../pages/doc'

import CompLayout  from 'layout/compLayout';
import Com from '../pages/com'

import BlockLayout  from 'layout/blockLayout';
import About from 'block/about/src'

import ScaffoldsLayout  from 'layout/scaffoldsLayout';
import Scaffold from '../pages/scaffold'


const routerConf=[
    {
        path: '/',
        layout: docLayout,
        component:Doc ,
    },
    {
        path: '/com',
        layout: CompLayout,
        component:Com
    },
    {
        path: '/block',
        layout: BlockLayout,
        component: About,
    },
    {
        path: '/scaffold',
        layout: ScaffoldsLayout,
        component: Scaffold,
    }
]
export default routerConf;