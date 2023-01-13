<!-- 期刊论文 -->
<template>
  <div class="bg-white">
    <component :is="choose"></component>
  </div>
</template>

<script>
    /* eslint-disable */
    import approvalList from "./list";
    import approvalAdd from "./add";

    export default {
        name: "results",
        data() {
            return {
                choose: approvalList
            };
        },
        watch: {
            $route(to, from) {
                const {type} = to.query;
                this.changeComponent(type);
            }
        },
        created() {
            const {type} = this.$route.query;
            this.changeComponent(type);
        },
        methods: {
            changeComponent(type) {
                switch (type) {
                    case "add":
                    case "edit":
                    case "view":
                    case "auditing":
                        this.choose = approvalAdd;
                        break;
                    default:
                        this.choose = approvalList;
                        break;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>