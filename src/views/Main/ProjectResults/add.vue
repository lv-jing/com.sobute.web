<!-- 期刊论文 -->
<template>
  <div class="bg-white">
    <component :is="choose" :user-info="userInfo"></component>
  </div>
</template>

<script>
  /* eslint-disable */
  import JournalArticles from "./JournalArticles"; // 期刊论文
  import ConferenceArticle from "./ConferenceArticle"; // 会议论文
  import AchievementAppraisal from "./AchievementAppraisal"; // 成果鉴定
  import StandardSpecification from "./StandardSpecification"; // 标准规范
  import AcademicMonograph from "./AcademicMonograph"; // 学术专著
  import ApplicationProve from "./ApplicationProve"; // 应用证明
  import SoftwareCopyright from "./SoftwareCopyright"; // 软件著作权
  import TalentQualification from "./TalentQualification"; // 人才/资质/奖励/专利奖
  import ProjectPatentPage from "./ProjectPatentPage"; // 专利
import {mapState} from 'vuex'
  export default {
    name: "results",
    data() {
      return {
        choose: ""
      };
    },
     computed: {
      ...mapState({
        userInfo: state => state.common.userInfo
      })
    },
    watch: {
      $route(to, from) {
        const {typeCode} = to.query;
        this.changeComponent(typeCode);
      }
    },
    created() {
      const {typeCode} = this.$route.query;
      this.changeComponent(typeCode);
    },
    methods: {
      /**
       *  分发页面
       * @param typeCode
       */
      changeComponent(typeCode) {
        switch (typeCode) {
          case "2014107":
            this.choose = JournalArticles;
            break;
          case "2014108":
            this.choose = ConferenceArticle;
            break;
          case "2014109":
            this.choose = AchievementAppraisal;
            break;
          case "2014103":
            this.choose = StandardSpecification;
            break;
          case "2014104":
            this.choose = AcademicMonograph;
            break;
          case "2014110":
            this.choose = ApplicationProve;
            break;
          case "2014105":
            this.choose = SoftwareCopyright;
            break;
          case "2014106":
            this.choose = TalentQualification;
            break;
          case "2014111":
            this.choose = ProjectPatentPage;
            break;
          default:
            this.$message({
              type: "warning",
              message: "此条数据有误"
            });
            this.$router.go(-1);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>