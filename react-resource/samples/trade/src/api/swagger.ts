export default {
    /* -------- default-index-controller Default Index Controller -------- */
    indexUsingGet: { // index
        method: 'get',
        url: `/` 
    }, 

    /* -------- echo-controller Echo Controller -------- */
    echoUsingGet: { // echo
        method: 'get',
        url: `/api/v1/echo` 
    }, 

    /* -------- 业务场景原型图 Scene Prc Controller -------- */
    deletedPrcUsingPost: { // 原型单个删除
        method: 'post',
        url: `/api/v1/scene-prc/deleted-prc` 
    }, 
    getImageListUsingGet: { // 获取原型图列表
        method: 'get',
        url: `/api/v1/scene-prc/getImage-list` 
    }, 
    importImageUsingPost: { // 原型图导入and编辑操作
        method: 'post',
        url: `/api/v1/scene-prc/import-image` 
    }, 
    sortUsingPost_1: { // 原型图排序
        method: 'post',
        url: `/api/v1/scene-prc/sort-prc` 
    }, 
    showImageUsingGet: { // 原型图展示
        method: 'get',
        url: `/api/v1/scene-prc/show-image` 
    }, 

    /* -------- 业务框架 Ent Frame Work Controller -------- */
    showUsingGet: { // 业务框架展示
        method: 'get',
        url: `/api/v1/ent-framework/detail` 
    }, 
    updateUsingPost: { // 业务框架修改
        method: 'post',
        url: `/api/v1/ent-framework/persist` 
    }, 

    /* -------- 业务系统 Ent System Controller -------- */
    deleteUsingPost_2: { // 删除系统
        method: 'post',
        url: `/api/v1/ent-system/delete` 
    }, 
    deleteDeptUsingPost: { // 删除使用部门
        method: 'post',
        url: `/api/v1/ent-system/delete-dept` 
    }, 
    dropListUsingGet: { // 获取系统下拉列表
        method: 'get',
        url: `/api/v1/ent-system/drop-list` 
    }, 
    listUsingGet: { // 显示系统列表
        method: 'get',
        url: `/api/v1/ent-system/list` 
    }, 
    persistUsingPost: { // 持久化系统信息
        method: 'post',
        url: `/api/v1/ent-system/persist` 
    }, 

    /* -------- 企业场景 Ent Sense Controller -------- */
    addDeptUsingPost: { // 使用部门---添加部门
        method: 'post',
        url: `/api/v1/ent-sense/add-dept` 
    }, 
    addSenseInfoUsingPost: { // 添加企业场景
        method: 'post',
        url: `/api/v1/ent-sense/add-sense` 
    }, 
    addSystemUsingPost: { // 系统支撑---添加系统
        method: 'post',
        url: `/api/v1/ent-sense/add-system` 
    }, 
    delDeptUsingPost: { // 删除业务场景的使用部门
        method: 'post',
        url: `/api/v1/ent-sense/del-dept` 
    }, 
    delSystemUsingPost: { // 删除业务场景的支撑系统
        method: 'post',
        url: `/api/v1/ent-sense/del-system` 
    }, 
    deleteUsingPost_1: { // 删除企业场景
        method: 'post',
        url: `/api/v1/ent-sense/delete-sense` 
    }, 
    getSenseInfoUsingGet: { // 查看企业场景详情
        method: 'get',
        url: `/api/v1/ent-sense/detail` 
    }, 
    editUsingPost_1: { // 编辑模块价值
        method: 'post',
        url: `/api/v1/ent-sense/edit-target` 
    }, 
    getChildrenSenseUsingGet: { // 获取子场景列表
        method: 'get',
        url: `/api/v1/ent-sense/get-children-sense` 
    }, 
    getParentSenseUsingGet: { // 获取一级级场景列表
        method: 'get',
        url: `/api/v1/ent-sense/get-parent-sense` 
    }, 
    senseTreeUsingGet: { // 企业场景列表
        method: 'get',
        url: `/api/v1/ent-sense/tree` 
    }, 
    updateSenseUsingPost: { // 更新企业场景信息
        method: 'post',
        url: `/api/v1/ent-sense/update-sense` 
    }, 

    /* -------- 企业指标 Ent Index Controller -------- */
    dropTypesUsingGet: { // 指标类型下拉列表
        method: 'get',
        url: `/api/v1/ent-index/drop-type` 
    }, 
    impSucceedUsingGet: { // 查看导入成功的指标列表
        method: 'get',
        url: `/api/v1/ent-index/import-succeed` 
    }, 
    indexDeletedUsingPost: { // 指标删除
        method: 'post',
        url: `/api/v1/ent-index/index-deleted` 
    }, 
    indexExportUsingGet: { // 指标模板导出
        method: 'get',
        url: `/api/v1/ent-index/index-export` 
    }, 
    indexImportUsingPost: { // 指标模板导入
        method: 'post',
        url: `/api/v1/ent-index/index-import` 
    }, 
    indexListUsingPost: { // 业务指标列表
        method: 'post',
        url: `/api/v1/ent-index/index-list` 
    }, 
    entPersistUsingPost_1: { // 企业下指标新增or编辑
        method: 'post',
        url: `/api/v1/ent-index/op-ent-index` 
    }, 
    impSucceedUsingPost: { // 查看导入成功的指标列表
        method: 'post',
        url: `/api/v1/ent-index/import-succeed` 
    }, 
    indexImportUsingGet: { // 指标模板导入
        method: 'get',
        url: `/api/v1/ent-index/index-import` 
    }, 

    /* -------- 企业相关 Ent Controller -------- */
    deleteUsingPost: { // 删除企业
        method: 'post',
        url: `/api/v1/ent/delete` 
    }, 
    editUsingPost: { // 编辑企业名称和简介
        method: 'post',
        url: `/api/v1/ent/edit` 
    }, 
    getEntInfoUsingGet: { // 查看企业详情
        method: 'get',
        url: `/api/v1/ent/ent-info` 
    }, 
    listEntsUsingPost: { // 企业列表
        method: 'post',
        url: `/api/v1/ent/ent-list` 
    }, 
    existUsingGet: { // 同名企业检查,true表示无同名企业
        method: 'get',
        url: `/api/v1/ent/exist` 
    }, 
    getIndustryListUsingGet: { // 行业名称列表
        method: 'get',
        url: `/api/v1/ent/industry-list` 
    }, 
    entPersistUsingPost: { // 持久化企业信息
        method: 'post',
        url: `/api/v1/ent/persist` 
    }, 
    isStickUsingGet: { // 是否置顶
        method: 'get',
        url: `/api/v1/ent/stick` 
    }, 

    /* -------- 成员管理 User Controller -------- */
    isUseUsingGet: { // 是否启用
        method: 'get',
        url: `/api/v1/user/change-status` 
    }, 
    deleteUsingGet_1: { // 删除成员
        method: 'get',
        url: `/api/v1/user/delete` 
    }, 
    existPwdUsingPost: { // 旧密码检测
        method: 'post',
        url: `/api/v1/user/exist-pwd` 
    }, 
    getUserInfoUsingGet: { // 获取个人信息
        method: 'get',
        url: `/api/v1/user/info` 
    }, 
    listUsersUsingPost: { // 获取用户列表
        method: 'post',
        url: `/api/v1/user/list` 
    }, 
    persistUsingPost_2: { // 添加成员
        method: 'post',
        url: `/api/v1/user/persist` 
    }, 
    resetPasswordUsingGet: { // 密码重置
        method: 'get',
        url: `/api/v1/user/reset-password` 
    }, 
    updateUserUsingPost: { // 修改用户个人信息
        method: 'post',
        url: `/api/v1/user/update` 
    }, 
    updatePwdUsingPost: { // 修改密码
        method: 'post',
        url: `/api/v1/user/update-pwd` 
    }, 

    /* -------- 文件相关 File Controller -------- */
    uploadUsingPost: { // upload
        method: 'post',
        url: `/api/v1/file/upload` 
    }, 

    /* -------- 登出 Logout Controller -------- */
    logoutUsingPost: { // 登出
        method: 'post',
        url: `/api/v1/logout` 
    }, 

    /* -------- 登录 Login Controller -------- */
    loginUsingPost: { // 登录
        method: 'post',
        url: `/api/v1/login` 
    }, 

    /* -------- 行业相关 Industry Controller -------- */
    deleteUsingGet: { // 删除行业
        method: 'get',
        url: `/api/v1/industry/delete` 
    }, 
    listUsingGet_1: { // 列表显示行业
        method: 'get',
        url: `/api/v1/industry/list` 
    }, 
    persistUsingPost_1: { // 持久化行业信息
        method: 'post',
        url: `/api/v1/industry/persist` 
    }, 
    sortUsingPost: { // 排序行业
        method: 'post',
        url: `/api/v1/industry/sort` 
    }, 

    /* -------- 部门相关 Ent Dept Controller -------- */
    deptListUsingGet: { // 部门名称列表
        method: 'get',
        url: `/api/v1/ent-dept/list` 
    }, 

}