/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
    {
        type: 'common-title',
        name: 'title',
        props: {
            title: '立项的必要性（限1000字）'
        },
    },
    {
        "type": "input", "field": "necNote", "title": "", "value": "",
        props: {
            placeholder: "简述立项的必要性、紧迫性以及国内外研究现状，限1000字",
            type:"textarea",
            rows: 10,
            showWordLimit:true,
        maxlength:1333
        },
        col: {
            span: 24,
        },
    },
    {
        type: 'common-title',
        name: 'title',
        props: {
            title: '知识产权现状（限1000字）'
        },
    },
    {
        "type": "input", "field": "intNote", "title": "", "value": "",
        props: {
            placeholder: "简述项目相关的知识产权现状，限1000字",
            type:"textarea",
            rows: 10,
            showWordLimit:true,
        maxlength:1333
        },
        col: {
            span: 24,
        }
    },
]

