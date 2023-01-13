<template>
  <div class="bg-white">
    <component :is="choose"></component>
  </div>
</template>

<script>
    /* eslint-disable */
    import projectQueryList from "./list";
    import projectQueryView from "./viewData";

    export default {
        name: "index",
        data() {
            return {
                choose: projectQueryList
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
                        this.choose = projectQueryView;
                        break;
                    default:
                        this.choose = projectQueryList;
                        break;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>