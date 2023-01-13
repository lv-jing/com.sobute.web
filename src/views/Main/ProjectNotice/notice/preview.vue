<template>
    <div>
        {{noticleTyple}}
        <h3>{{details.title}}</h3>
        <el-divider content-position="left"></el-divider>
        <div class="flex flex-center" style="background:#f3f3f3">
            <span>创建人:{{details.createdByName}}</span>
            <span class="ml20">创建时间:{{details.createDate}}</span>
        </div>
         <div>
           【摘要】: {{details.summary}}
        </div>
        <div class="mt20">
            {{details.content}}
        </div>
    </div>
</template>

<script>
/* eslint-disable */

    export default {
        props:{
            noticleTyple:{
                type:String,
                default:()=>''
            },
           noticeDetails:{
                type:Object,
                default:()=>{}
            },
        },
        data() {
            return {
                details: {}
            }
        },
        watch:{
            noticleTyple(val){
                console.log(val)
                if(val==='preview'){
                    this.details=this.noticeDetails
                }else{
                    this.queryNoticeDetails()
                }
            }
        },
        methods: {
            queryNoticeDetails() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>