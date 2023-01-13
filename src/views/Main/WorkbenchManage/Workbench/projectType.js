/**
 * // 项目申报
 PROJECT_BIZ_TYPE_APPLY("project-apply", "项目申报", "rpm_rq_apply"),
 // 项目立项
 PROJECT_BIZ_TYPE_CONFIRM("project-confirm", "项目立项", "rpm_pj_projects"),
 // 项目计划
 PROJECT_BIZ_TYPE_PLAN("project-plan", "项目计划", "rpm_pj_plan"),
 // 项目计划-分解
 PROJECT_BIZ_TYPE_TASK("project-task", "项目计划-分解", "rpm_pj_tasks"),
 // 项目总结
 PROJECT_BIZ_TYPE_SUMMARY("project-summary", "项目总结", "rpm_pg_headers"),
 // 项目总结-外部
 PROJECT_BIZ_TYPE_SUMMARY_OUTSIDE("project-summary-outside", "项目总结-外部", "rpm_pg_headers"),
 // 中试
 PROJECT_BIZ_TYPE_PILOT_RUN("project-pilot-run", "中试/试生产", "rpm_pg_batch"),
 // 项目验收
 PROJECT_BIZ_TYPE_CHECK("project-check", "项目验收", "rpm_ac_headers"),
 // 项目变更
 PROJECT_BIZ_TYPE_CHANGE("project-change", "项目变更", "rpm_pg_changes"),
 // 项目成果
 PROJECT_BIZ_TYPE_ACHIEVEMENT("project-achievement", "项目成果", "rpm_rt_achievement"),
 // 项目专利
 PROJECT_BIZ_TYPE_PATENT("project-patent", "项目专利", "rpm_rt_patent_headers"),
 // 外部用户注册
 PROJECT_BIZ_TYPE_REGISTER("register-out-user", "用户注册", "register"),
 // 个人考核
 PROJECT_BIZ_TYPE_PERSON_EXAMINE("project-person-examine", "个人考核", "rpm_ex_person_headers"),
 // 项目考核
 PROJECT_BIZ_TYPE_EXAMINE("project-examine", "项目考核", "rpm_ex_project_headers"),
 //个人总结
 PROJECT_BIZ_TYPE_PERSON_SUMMARY("project-person-summary", "个人总结", "rpm_ps_headers");
 *
 *
 *
 */

export const funType = [{
  value: 'project-apply',
  label: '项目建议'
}, {
  value: 'project-confirm-apply',
  label: '项目申请'
}, {
  value: 'project-confirm',
  label: '项目立项'
}, {
  value: 'project-plan',
  label: '项目计划'
}, {
  value: 'project-task',
  label: '项目计划-分解'
}, {
  value: 'project-summary',
  label: '项目总结-内部'
}, {
  value: 'project-summary-outside',
  label: '项目总结-外部'
}, {
  value: 'project-pilot-run',
  label: '中试/试生产'
}, {
  value: 'project-pilot-test',
  label: '中试'
}, {
  value: 'project-check',
  label: '项目验收'
}, {
  value: 'project-change',
  label: '项目变更'
}, {
  value: 'project-achievement',
  label: '项目成果'
}, {
  value: 'project-patent',
  label: '知识产权'
}, {
  value: 'register-out-user',
  label: '用户注册'
}, {
  value: 'project-person-examine',
  label: '个人考核'
}, {
  value: 'project-examine',
  label: '项目考核'
}, {
  value: 'project-person-summary',
  label: '个人总结'
}]


export const projectType = {
  'project-apply': 'declaration',
  'project-confirm': 'approval',
  'project-plan': 'plan',
  "project-summary": "summary",
  "project-summary-outside": "SummaryOutside",
  "project-pilot-run": "production",
  "project-pilot-test": "pilotTest",
  "project-check": "acceptManage",
  "project-change": "changes",
  "project-achievement": "results",
  "register-out-user": 'users',
  "project-patent": "patentpage",
  "project-person-summary": "PersonalSummary",
  "project-confirm-apply": "projectdeclare"
}