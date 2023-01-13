/**
 * 查询数据表单
 */

/* eslint-disable */

/**
 * 新增和编辑数据表单
 */
export const addFormRule= [
            {
                "type": "input", "field": "name", "title": "菜单名称", "value": "",
                props: {
                    placeholder: "请输入菜单中文名",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                validate: [{ required: true, message: '请输入菜单名称', whitespace:true,trigger: 'blur' },]
            },
            {
                "type": "input", "field": "nameEn", "title": "菜单别名", "value": "",
                props: {
                    placeholder: "请输入菜单别名",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                validate: [{ required: true, pattern:/^[a-zA-Z]/, whitespace:true,message: '菜单别名必须是英文', trigger: 'blur' },]
            },
            {
                "type": "input", "field": "link", "title": "菜单路径", "value": "",
                props: {
                    placeholder: "请输入菜单路径(全路径，比如：/xx/xxx/)",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                validate: [{ required: true, message: '请输入菜单路径', trigger: 'blur' },]
            },
            {
                "type": "input", "field": "icon", "title": "菜单图标", "value": "",
                props: {
                    placeholder: "请输入菜单图标",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
            },
            {
                "type": "ColorPicker", "field": "color", "title": "图标颜色", "value": "#0065b3",
                props: {
                    placeholder: "请菜单图标颜色",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
            },
            
            {
                "type": "commonSelect", "field": "sysName", "title": "所属系统", "value": "",
                props: {
                    placeholder: "请选择所属系统名称",
                    typeName: "SYS_TYPE",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                class:"w-100",
                validate: [{ required: true, message: '请选择所属系统名称', trigger: 'blur' },]
            },
            {
                "type": "commonSelect", "field": "functionType", "title": "功能类型", "value": "",
                props: {
                    placeholder: "请选择功能类型",
                    typeName: "FUNCTION_TYPE",
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
                class:"w-100",
                validate: [{ required: true, message: '请选择功能类型', trigger: 'blur' },]
            },
          //
            // {
            //     "type": "input", "field": "sysCode", "title": "系统编码", "value": "",
            //     props: {
            //         placeholder: "请输入系统编码",
            //     },
            //     col: {
            //         // span: 8,
            //         labelWidth: '100px'
            //     },
            // },
            {
                "type": "inputNumber", "field": "sort", "title": "菜单排序", "value": 1,
                props: {
                    placeholder: "请输入",
                    min:1,
                    size:'small'
                },
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },
            },
            {
                "type": "switch", "field": "status", "title": "状态", "value": 1,
                props: {
                    placeholder: "请选择",
                    activeValue:1,
                    inactiveValue:0,
                },
                options: [
                    { "value": 0, "label": "停用" },
                    { "value": 1, "label": "启用", },
                ],
                col: {
                    // span: 8,
                    labelWidth: '100px'
                },

            },
            

        ]
