<template>
  <div class="TodosList">
    <div
      class="todo"
      :class="{ done: assignment.done }"
      :key="assignment.id"
      v-for="assignment in assignments"
    >
      <button class="icon" @click="toggle(assignment)">
        <IconCheckCircle class="svg check" />
      </button>
      <div style="width: 50%">
        <input
          class="input"
          :value="assignment.name"
          placeholder="Type in the title of the task!"
          @change="
            (e) => {
              update(assignment, e.target.value);
            }
          "
        />
      </div>

      <div style="width: 50%">
        <AssignmentTags
          :assignmentId="assignment.id"
          :selectedComponentId="assignment.id"
        />
      </div>  

      <button class="icon" @click="destroy(assignment)">
        <IconTrash class="svg" />
      </button>
    </div>
  </div>
</template>

<script>

import IconCheckCircle from "./icons/IconCheckCircle";
import IconTrash from "./icons/IconTrash";
import AssignmentTags from "./AssignmentTags";
import Assignment from "@/models/Assignment";
import browserStorage from "@/browser/BrowserStorage";
export default {
  components: {
    IconCheckCircle,
    IconTrash,
    AssignmentTags,
  },

  computed: {
    assignments() {
      return Assignment.query()
        .with("tags.*", (query) => {
          query.orderBy("name", "desc");
        })
        .get();
    },
  },

  methods: {
    toggle(assignment) {
      assignment.$update({ done: !assignment.done });
      browserStorage.Save();
    },

    update(assignment, title) {
      var assignments11 = Assignment.query()
        .with("tags.*", (query) => {
          query.orderBy("name", "desc");
        })
        .get();
      console.log("evvel", assignments11);
      assignment.$update({ name: title });
      var assignments = Assignment.query()
        .with("tags.*", (query) => {
          query.orderBy("name", "desc");
        })
        .get();
      console.log("sonra", assignments);
      browserStorage.SaveData(assignments);
    },

    destroy(assignment) {
      assignment.$delete();
      browserStorage.Save();
    },
  },
};
</script>

<style scoped>
@import "@/styles/variables";

.todo {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--c-divider);
}

.todo:hover {
  background-color: #fafafa;
}

.todo:hover .svg {
  opacity: 1;
}

.todo.done {
  .input {
    text-decoration: line-through;
    color: var(--c-gray);
  }

  .icon .svg.check {
    fill: #38d2d8;
  }
}

.input {
  flex-grow: 1;
  border: 0;
  padding: 12px 24px 12px 0;
  width: 100%;
  background-color: transparent;
  transition: all 0.3s;
}

.icon {
  display: block;
  padding: 12px 24px;
}

.icon:hover .svg {
  fill: var(--c-black);
}

.icon:hover .svg.check {
  fill: var(--c-black);
}

.svg {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: translateY(2px);
  transition: all 0.3s;
  fill: var(--c-gray);
}

.svg.check {
  opacity: 1;
  fill: var(--c-gray-light);
}
</style>
