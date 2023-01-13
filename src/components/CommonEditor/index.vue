<template>
  <div>
    <vue-editor
      id="editor"
      useCustomImageHandler
     
      @image-added="handleImageAdded"
      v-model="htmlForEditor"
    ></vue-editor>
     <!-- :customModules="customModulesForEditor"
      :editorOptions="editorSettings" -->
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor";
// import { ImageDrop } from "quill-image-drop-module";
// import ImageResize from "quill-image-resize-module";
import { uploadImageService, downloadUrl } from "@/service/common";

// Quill.register("modules/imageDrop", ImageDrop);
// Quill.register("modules/imageResize", ImageResize);
export default {
  components: {
    VueEditor
  },
  props: {
    placeholder: { type: String, default: () => "请输入内容" },
    disabled: { type: Boolean, default: () => false },
    value: { type: [Array, String], default: () => "" }
  },
  data() {
    return {
      //  customModulesForEditor: [{ alias: "imageDrop", module: ImageDrop }, { alias: "imageResize", module: ImageResize }],
      // editorSettings: {
      //   modules: {
      //     imageDrop: true,
      //     imageResize: {}
      //   }
      // },
      htmlForEditor: ""
    };
  },
  watch: {
    htmlForEditor(val) {
      this.$emit("input", val);
    },
    value(n) {
      this.htmlForEditor = n;
    }
  },

  methods: {
    handleImageAdded: async function(
      file,
      Editor,
      cursorLocation,
      resetUploader
    ) {
      // An example of using FormData
      console.log(file);
      let formData = new FormData();
      formData.append("upfile", file);
      formData.append("bizType", "公告内容");
      formData.append("bizTypeCode", "2013131");

      const { code, data } = await uploadImageService(formData);
      if (code === 1) {
        let url = downloadUrl + data.fileUrl; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>