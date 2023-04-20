<template>
  <div class="TodosAssignee" style="height: 50px">
   
    <div v-if="inputFieldVisibility" style="width: 100%">
      <div style="width: 90%; float: left">
        <textarea
          type="text"
          :value="tagsString"
          style="background-color: #fafafa; height: 100%; width: 100%"
          @change="saveTags"
          @onBlur="lostFocus"
        />
      </div>
      <div style="width: 10%; float: left">
        <a
          style="
            text-decoration: underline;
            font-size: 10px;
            color: blue;
            padding-left: 10px;
            float: left;
          "
          @click="saveChanges"
          >Save</a
        >
        <br />
        <a
          style="
            text-decoration: underline;
            font-size: 10px;
            color: red;
            padding-left: 10px;
            float: left;
          "
          @click="close"
          >Close</a
        >
      </div>
    </div>

    <div v-else style="position: absolute">
      <span v-if="loadTags.length == 0"
        ><span style="color: gray; font-size: 10px">No tags found <br /></span>
        <b
          ><a
            style="text-decoration: underline; font-size: 10px; color: blue"
            @click="editTags"
            >Add Tags</a
          ></b
        ></span
      >
      <span v-else v-for="tag in loadTags" :key="tag.id" v-on:click="editTags">
        <span class="badge">{{ tag.name }}</span>
      </span>
    </div>
 
  </div>
</template>

<script>

import Tag from "@/models/Tag";
import browserStorage from "@/browser/BrowserStorage";


export default {

  props: {
    assignmentId: { type: String, required: true },
    selectedComponentId: { type: String, required: true },
  },
  data() {
    return {
      visibleStatus: false,
      //exsistingTags:null,
      tagsStringArray: [],
      tagsString: "",
    };
  },
  created() {
    //this.exsistingTags = this.loadTags;
  },

  computed: {
    currentssignmentId() {
      return this.selectedComponentId;
    },
    inputFieldVisibility() {
      if (this.currentssignmentId == this.assignmentId && this.visibleStatus == true)
        return true;
      else return false;
    },
    loadTags() {
      return Tag.query().where("assignment_id", this.assignmentId).get();
    },

    tags() {
      return Tag.query().orderBy("name").get();
    },

    tag() {
      return Tag.query().with("assignee").find(this.tagId);
    },
  },

  methods: {
    update(e) {
      Tag.update({
        assignment_id: this.assignmentId,
        name: e.target.value,
      });
    },
    lostFocus() {
      alert();
      this.visibleStatus = false;
    },
    saveChanges() {},
    close() {
      this.visibleStatus = false;
    },
    editTags() {
      this.visibleStatus = true;
      this.tagsToString(this.loadTags);
    },
    saveTags(e) {
      let oldTags = this.tagsStringArray;
      let i = 0;
      this.stringTagsToArray(e.target.value).forEach((element) => {
        if (oldTags.length > i) {
          let tag = oldTags[i];
          tag.name = element;
          console.log("if tag", tag);
          Tag.update(tag);
        } else {
          var newRow = {
            data: {
              assignment_id: this.assignmentId,
              name: element,
            },
          };
          Tag.insert(newRow);
        }
        i++;
      });

      browserStorage.Save();
      this.visibleStatus = false;
    },
    tagsToString(tagsArray) {
      var i = 0;
      this.tagsString = "";
      this.tagsStringArray = [];
      tagsArray.forEach((element) => {
        if (i > 0) this.tagsString += ", ";
        this.tagsString += element.name;
        //this.tagsStringArray.push({index:i, id:element.id, name:element.name, assignment_id: element.assignment_id});
        i++;
      });
      this.tagsStringArray = tagsArray;
    },
    stringTagsToArray(tagsString) {
      return tagsString.replace(/\s/g, "").split(",");
    },
  },
};
</script>

<style scoped>
@import "@/styles/variables";

.TodosAssignee {
  position: relative;
  display: flex;
  align-items: center;
}
.badge {
  background-color: purple;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 10px;
}
.user {
  width: 14px;
  height: 14px;
  padding-right: 10px;
  fill: var(--c-gray);
}

.select {
  position: relative;
  z-index: 1;
  border: 0;
  padding-right: 16px;
  padding-left: 12px;
  color: var(--c-gray);
  background-color: transparent;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
}

.select.selected {
  color: var(--c-black);
}

.option {
  color: var(--c-gray-dark);
}

.down {
  position: absolute;
  top: 10px;
  right: 0;
  width: 8px;
  height: 8px;
  fill: var(--c-gray);
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

.button1:hover {
  background-color: #4caf50;
  color: white;
}
</style>
